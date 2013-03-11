'use strict';

var path = require('path'),
    fs = require('fs'),
    natural = require('natural'),
    tokenizer = new natural.WordTokenizer(),
    loc = path.resolve(__dirname, 'content'),
    scraper = {
      title: /\[meta:title\]:\s<>\s\((.+?)\)(?!\))/,
      description: /\[meta:description\]:\s<>\s\((.+?)\)(?!\))/
    };

//
// ### function scrape()
// #### @content {String} document content
// #### @key {String} scraper key
// Scrapes the [key] from the content by Regular Epression
//
function scrape(content, key) {
  var match = content.replace(/\n/g, ' ').match(scraper[key]);

  // Only return scraped content if there is a meta:[key].
  return match ? match[1].trim() : '';
}

//
// ### function normalize()
// #### @file {String} file name
// Normalize the file name to resolve to a Markdown or index file.
//
function normalize(file) {
  if (!file) file = 'index.md';

  return ~file.indexOf('.md') ? file : file + '.md';
}

//
// ### function fileContent()
// #### @content {String} Document content
// Sugar content with additional properties from scraped content.
//
function fileContent(content) {
  return {
    content: content,
    description: scrape(content, 'description'),
    title: scrape(content, 'title'),
    tags: tags(content, 10)
  };
}

//
// ### function frequency()
// #### @content {String} Document content
// Return list of words scored by Term Frequency-Inverse Document Frequency.
//
function frequency(content) {
  var tfidf = new natural.TfIdf(),
      processed = [],
      words = [];

  // Add the current content.
  content = content.toLowerCase();
  tfidf.addDocument(content);

  tokenizer.tokenize(content).forEach(function wordFrequency(word) {
    // Return early if word is processed, to short or only a number.
    if (+word || word.length < 3 || ~processed.indexOf(word)) return;

    words.push({
      word: word,
      score: tfidf.tfidf(word, 0)
    });

    // Add word to processed so tfidf is not called more than required.
    processed.push(word);
  });

  return words;
}

//
// ### function tags()
// #### @content {String} Document content
// #### @n {Number} number of tags
// Return n highest scoring tags as determined by term frequency.
//
function tags(content, n) {
  return frequency(content).sort(function sortByScore(a, b) {
    return b.score - a.score;
  }).slice(0, n).map(function extractWords(tag) {
    return tag.word;
  });
}

//
// ### function walk()
// #### @dir {String} Directory path to crawl
// #### @result {Object} Append content to current results
// #### @callback {Function} Callback for sub directory
// #### @sub {Boolean} Is directory subdirectory of dir
// Recusive walk of directory by using asynchronous functions, returns
// a collection of markdown files in each folder.
//
function walk(dir, callback, result, sub) {
  var current = sub ? path.basename(dir) : 'index';

  // Prepare containers.
  result = result || {};
  result[current] = {};

  // Read the current directory
  fs.readdir(dir, function readDir(error, list) {
    if (error) return callback(error);

    var pending = list.length;
    if (!pending) return callback(null, result);

    list.forEach(function loopFiles(file) {
      file = dir + '/' + file;

      fs.stat(file, function statFile(error, stat) {
        var name, ref;

        if (stat && stat.isDirectory()) {
          walk(file, function dirDone() {
            if (!--pending) callback(null, result);
          }, result, true);
        } else {
          // Only get markdown files from the directory content.
          if (path.extname(file) !== '.md') return;

          ref = path.basename(file, '.md');
          name = ['/' + path.basename(dir), ref];

          // Only append the name of the file if not index
          if (ref === 'index') name.pop();

          // Get the tile of the file.
          get(file, function getFile(err, file) {
            result[current][ref] = {
              href: sub ? name.join('/') : '',
              title: file.title,
              path: dir
            };

            if (!--pending) callback(null, result);
          });
        }
      });
    });
  });
}

//
// ### function walkSync()
// #### @dir {String} Directory path to crawl
// #### @result {Object} Append content to current results
// #### @sub {Boolean} Is directory subdirectory of dir
// Recusive walk of directory by using synchronous functions, returns
// a collection of markdown files in each folder.
//
function walkSync(dir, result, sub) {
  var current = sub ? path.basename(dir) : 'index';

  // Prepare containers.
  result = result || {};
  result[current] = {};

  // Read the current directory
  fs.readdirSync(dir).forEach(function loopDir(file) {
    var stat, name, ref;

    file = dir + '/' + file;
    stat = fs.statSync(file);

    // If directory initiate another walk.
    if (stat && stat.isDirectory()) {
      walkSync(file, result, true);
    } else {
      // Only get markdown files from the directory content.
      if (path.extname(file) !== '.md') return;

      ref = path.basename(file, '.md');
      name = ['/' + path.basename(dir), ref];

      // Only append the name of the file if not index
      if (ref === 'index') name.pop();

      // Append file information to current container.
      result[current][ref] = {
        href: sub ? name.join('/') : '',
        title: get(file).title,
        path: dir
      };
    }
  });

  return result;
}

//
// ### function get()
// #### @file {String} Filename
// #### @callback {Function} Callback for file contents
// Returns file content by normalized path, if a callback is provided, content
// is returned asynchronously.
//
function get(file, callback) {
  if (!callback) {
    return fileContent(fs.readFileSync(path.resolve(loc, normalize(file)), 'utf8'));
  }

  file = path.resolve(loc, normalize(file));

  fs.readFile(file, 'utf8', function read(error, content) {
    callback.apply(this, [error, fileContent(content)]);
  });
}

//
// ### function catalog()
// #### @callback {Function} Callback for catalog/TOC
// Returns a catalog by parsing the content directory, if a callback is provided
// content is returned asynchronously.
function catalog(callback) {
  if (!callback) return walkSync(loc);

  walk(loc, callback);
}

// Expose public functions.
module.exports = {
  get: get,
  catalog: catalog
};
