'use strict';

var nconf = require('nconf'),
    path = require('path'),
    fs = require('fs'),
    scraper = /\[meta:title\]:\s<>\s\((.+)\)/;

//
// ### function getTitle()
// #### @file {String} Filename
// Scrapes the title from the content by Regular Epression
//
function getTitle(file) {
  var match = get(file).match(scraper);

  // Only return title if there is a meta:title.
  return match ? match[1] : '';
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
        title: getTitle(file),
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

  return fs.readFileSync(
    path.resolve(__dirname + '/../content/', file),
    'utf8'
  );
}

//
// ### function catalogSync()
// Returns a catalog by parsing the content directory. Titles are stripped from
// meta-title inside the .md file, defaults to filename.
function catalogSync() {
  return walkSync(path.resolve(__dirname, '../content'));
}

// Expose public functions.
module.exports = {
  get: get,
  catalogSync: catalogSync
};
