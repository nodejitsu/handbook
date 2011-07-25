# Appendix: Building and Installing Node.js

<!--
Source: node.js wiki. Likely going to point users towards the wiki page
itself.

Is this kosher? Are the docs MIT?
-->

## Step 1 - Pick Your Platform

Node should install out of the box on Linux, Macintosh, and Solaris.

With some effort you should be able to get it running on other Unix
platforms and Windows (either via Cygwin or MinGW). Native Windows support is a work-in-progress and you can download the latest release: [Windows Build (Node v0.5.2)](http://nodejs.org/dist/v0.5.2/node.exe). It's unstable and things are expected to break. NPM support might be added in future. If you find any bugs, please report them to issue tracker.

Mac OSX users also have the option of installing a precompiled package from [here](https://sites.google.com/site/nodejsmacosx/) that includes npm.

## Step 2 - Prerequisites

Node has several dependencies, but fortunately most of them are
distributed along with it.  If you are building from source you should
only need 2 things.

* **python** - version 2.4 or higher. The build tools distributed with
  Node run on python.

* **libssl-dev** - If you plan to use SSL/TLS encryption in your
  networking, you'll need this.  Libssl is the library used in the
  [openssl](http://www.openssl.org/) tool. On Linux and Unix systems
  it can usually be installed with your favorite package manager. The
  lib comes pre- installed on OS X.

## Step 3a - Installing on Unix (including BSD and Mac)

**Building from source**

Use make to build and install Node (execute the following on the command line)

    git clone --depth 1 git://github.com/joyent/node.git
    cd node
    git checkout origin/v0.4 # optional.  Note that master is unstable.
    export JOBS=2 # optional, sets number of parallel commands.
    mkdir ~/local
    ./configure --prefix=$HOME/local/node
    make
    make install
    echo 'export PATH=$HOME/local/node/bin:$PATH' >> ~/.profile
    echo 'export NODE_PATH=$HOME/local/node:$HOME/local/node/lib/node_modules' >> ~/.profile
    source ~/.profile

If you have any installation problems, look at [Troubleshooting
Installation](https://github.com/ry/node/wiki/Troubleshooting-Installation), try an [alternate installation method](https://gist.github.com/579814), or stop into [#node.js](http://webchat.freenode.net/?channels=node.js&uio=d4) and ask questions.

**Pre-built binaries**

You can also install node from packages: [[Installing Node.js via package manager]]

## Step 3b - Building on Windows

**Pre-built binaries**
Windows Build(Node v0.5.1): http://nodejs.org/dist/v0.5.1/node.exe
Self-contained binaries are available at [node-js.prcn.co.cc](http://node-js.prcn.co.cc/)

**Building from source**

There are two ways of building Node on Windows. One is over the Cygwin
emulation layer the other is using MinGW (GNU toolchain for
windows). See the
[Cygwin](https://github.com/joyent/node/wiki/Building-node.js-on-Cygwin-%28Windows%29)
and [MinGW](https://github.com/joyent/node/wiki/Building-node.js-on-mingw)
pages.

Neither builds are satisfactorily stable but it is possible to get
something running.

## Step 4 - Install NPM

NPM is a package manager that has become the de-facto standard for
installing additional node libraries and programs. Here's the quick
and easy one-liner for installing on Unix.

    # curl http://npmjs.org/install.sh | sh

To install a library e.g. Express:

    # npm install express

And visit
[https://github.com/isaacs/npm](https://github.com/isaacs/npm) for
details.
