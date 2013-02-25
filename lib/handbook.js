'use strict';

var nconf = require('nconf'),
    path = require('path'),
    fs = require('fs');

function getTitle(file) {
  return get(file).match(/\[meta:title\]:\s<>\s\((.+)\)/)[1];
}

// Get the title and push the article in the section
function article(file, current) {
  var name = path.basename(file, '.md')
    , title = getTitle(file);

  // Index.md is the main section file and not an article
  if (name === 'index') return current.title = title;

  current.articles.push({
    href: name,
    title: title
  });
}

function walk(dir, result) {
  var current = {
    section: path.basename(dir),
    articles: []
  };

  (result = result || []).push(current);

  fs.readdirSync(dir).forEach(function loopDir(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      walk(file, result);
    } else {
      article(file, current);
    }
  });

  return result;
}

//
// ### function get()
// #### @file {String} Path and filename
// Returns file content by normalized path
//
function get(file) {
  file = !!~file.indexOf('.md') ? file : file + '.md';

  return fs.readFileSync(file, 'utf8');
}

//
// ### function catalogSync()
// Returns a catalog by parsing the content directory. Titles are stripped from
// meta-title inside the .md file, defaults to filename.
function catalogSync() {
  return walk(path.resolve(__dirname, '../content/articles'));
}

module.exports = {
  get: get,
  catalogSync: catalogSync
};
