# The Nodejitsu Handbook

**You can view the Handbook online at http://handbook.jitsu.com**

Welcome to the Nodejitsu handbook. This document will help familiarize you with deploying your Node.js applications to the cloud while also providing detailed information about Nodejitsu's platform-specific features and about where to get help when you need it.

This is a living document which you can submit patches to at [http://github.com/nodejitsu/handbook](http://github.com/nodejitsu/handbook). Note that this entire website is generated fromfrom the individual content files in the `/content` folder, so any edits should be made to those source files, not `/public/*.html`.

### Building the Handbook

The Nodejitsu Handbook is built with [`blacksmith`][blacksmith], so all you need to do is:

1. Install `blacksmith` with `npm`
``` 
  [sudo] npm install blacksmith -g
```
2. Run the `blacksmith` command
```
  cd /path/to/handbook
  blacksmith
```
3. Start `bin/server`
```
  bin/server
```