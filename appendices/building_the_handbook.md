<a name='build'></a>
# Appendix: Building the Nodejitsu Handbook

## Dependencies

The build process for the handbook has a few dependencies:

* [make](http://en.wikipedia.org/wiki/Make_\(software\))
* [ronn](https://github.com/rtomayko/ronn)
* [htmldoc](http://www.htmldoc.org/)

Make and htmldoc should be available via your operating system's package manager
(ie. apt-get). ronn is available on [rubygems](http://rubygems.org/), which in
turn should be available via your operating system's package manager as well. On
Debian-based systems, the rubygems package does not add its bin folder
(`/var/lib/gems/1.8/bin`) to your $PATH variable, so add something
like:

    PATH="/var/lib/gems/1.8/bin:$PATH"


to the end of your `~/.profile` file and activate it by running `. ~/.profile`.

## Build Process

Once you've installed the dependencies, all you have to do is:

    $ make

and the files `./book.md`, `book.pdf`, `book.html`, `API.md` and `ReadMe.md`
should all be generated.
