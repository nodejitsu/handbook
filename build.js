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
  var html = md(output);
  fs.writeFileSync('./generated/index.html', html);
});