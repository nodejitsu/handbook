'use strict';

var path = require('path'),
    fs = require('fs'),
    natural = require('natural'),
    tokenizer = new natural.WordTokenizer(),
    scraper = {
      title: /\[meta:title\]:\s<>\s\(([^\)]+)\)/,
      description: /\[meta:description\]:\s<>\s\(([^\)]+)\)/
    };

//
// ### function scrape()
// #### @file {String} Filename
// Scrapes the [key] from the content by Regular Epression
//
function scrape(content, key) {
  var match = content.replace(/\n/g, ' ').match(scraper[key]);

  // Only return scraped content if there is a meta:[key].
  return match ? match[1].trim() : '';
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
    if (+word || word.length < 3 || !!~processed.indexOf(word)) return;

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
// ### function walkSync()
// #### @dir {String} Directory path to crawl
// #### @result {Object} Append content to current results
// #### @sub {Boolean} Is directory subdirectory of dir
// Recusive walk of directory by using synchronous functions, returns
// a collection of markdown files in each folder.
//
function walkSync(dir, result, sub) {
  // Get the directory relative to content.
  var current = dir.match(/content[\/\w\-]*/)[0];

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
// Returns file content by normalized path
//
function get(file) {
  if (!!file) {
    file = !!~file.indexOf('.md') ? file : file + '.md';
  } else {
    file = 'index.md';
  }

  var content = fs.readFileSync(path.resolve(__dirname + '/content/', file), 'utf8');

  return {
    content: content,
    description: scrape(content, 'description'),
    title: scrape(content, 'title'),
    tags: tags(content, 10)
  };
}

//
// ### function catalogSync()
// Returns a catalog by parsing the content directory. Titles are stripped from
// meta-title inside the .md file, defaults to filename.
function catalogSync() {
  return walkSync(path.resolve(__dirname, 'content'));
}

// Expose public functions.
module.exports = {
  get: get,
  catalogSync: catalogSync
};
