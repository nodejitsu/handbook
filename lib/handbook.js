'use strict';

var nconf = require('nconf'),
    path = require('path'),
    fs = require('fs');

//
// ### function get ()
// #### @file {String} Path and filename
// Returns file content by normalized path
//
module.exports.get = function get (file) {
  file = !!~file.indexOf('.md') ? file : file + '.md';
  file = path.resolve(__dirname, '../content/' + file);

  return fs.readFileSync(file, 'utf8');
};
