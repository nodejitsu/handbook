/* 5 minute hack for previewing docs as html */

var finder = require('findit').find('./contents'),
    fs     = require('fs'),
    md     = require('node-markdown').Markdown,
    toc    = '',
    output = '';

finder.on('directory', function (dir) {
  var folderName = dir.split('/')[2];
  output += ('# ' + folderName + '\n');
});

finder.on('file', function (file) {
  output += '\n' + fs.readFileSync(file) + '\n';
});

finder.on('end', function() {
  build();
});

function build () {
  
  buildHTMLPage();
  
};


function buildPDF () {};

function buildGitHubReadMe () {};

function buildHTMLPage () {
  
  var html = md(output);
  fs.writeFileSync('./index.html', html);
  
};

function buildEBook () {};
