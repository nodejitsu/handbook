
# The Nodejitsu Handbook

*A gentle introduction to the art of Nodejitsu*

Welcome to the Nodejitsu handbook. This document will help familiarize you with deploying your Node.js applications to the cloud while also providing detailed information about Nodejitsu's platform specific features. This is a living document which you can submit patches to @ [http://github.com/nodejitsu/handbook](http://github.com/nodejitsu/handbook).


## Who is Nodejitsu?

We are a collective of seasoned developers who have been devoted to the Node.js project since 2009. We are community leaders have who created and contributed to hundreds of open-source Node.js projects. If you have used Node.js, you've probably used code we've help create. Check out our [Github](http://github.com/nodejitsu).

## What Is Nodejitsu?

[Nodejitsu](http://nodejitsu.com/) is the Platform as A Service and Marketplace for Node.js applications. Nodejitsu allows you to seamlessly deploy your Node.js applications into the cloud with a myriad of additional features. Our platform provides a robust suite of functionality to assist in the development, management, and deployment of Node.js applications. Our deployment tools are the most user-friendly in the industry and our customer support is unparalleled. 

## How Can I Get Started?

So you wish to learn the ways of Nodejitsu? Excellent! Reading this sentence is the first step! Below, you will find the Table Of Contents which provides an overview of the systems which comprise Nodejitsu. We suggest starting at [Deploying Applications](#Deploying_Applications). You can also always visit our website at [http://nodejitsu.com](http://nodejitsu.com). Good Luck!



# Table of Contents

- [Deploying Applications](#Deploying_Applications)
- [Using the Jitsu Client](#Using_The_Jitsu_Client)
    - [Installation](#Installation)
    - [Usage](#Usage)
- [Using the API](handbook/API.md#Using_The_API)
    - [Applications](handbook/API.md#Applications)
    - [Snapshots](handbook/API.md#Snapshots)
    - [Users](handbook/API.md#Users)
    - [Databases](handbook/API.md#Databases)
    - [Logging](handbook/API.md#Logging)
    - [Marketplace](handbook/API.md#Marketplace)
- [Using Databases](handbook/API.md#Using_Databases)
    - Creating new Databases
    - Connecting existing Databases
- [Nodejitsu's Open-source Projects](#Open_source_Projects)
    - Why open-source
    - Where to find
    - How to contribute
- [Additional Information](#Additional_Information)
    - [Installing Node.js](#Installing_Node)
    - [Installing NPM](#Installing_npm)
    - [New to Node?](#New_to_Node)
    - [Creating a package.json](#Package_Json)

<a name="Deploying_Applications"></a>
# Deploying Applications


We've got three basic ways to deploy your application. 

- [Jitsu](#Using_The_Jitsu_Client), The Nodejitsu Command Line Tool 
- [Samurai](http://develop.nodejitsu.com/), An easy to use Web Admin
- The [API](#Using_The_API), A high-level JSON API


If it is your first time deploying an application and you are eager to get started, we recommend that you try out [Jitsu](#Using_The_Jitsu_Client), our CLI tool. Jitsu has a one line installer, it's self-documenting, and you'll be able to deploy your app in seconds.

Let's start with a very basic node.js http server:

     // requires node's http module
     var http = require('http');
     
     // creates a new httpServer instance
     http.createServer(function (req, res) {
       // this is the callback, or request handler for the httpServer
       
       // respond to the browser, write some headers so the 
       // browser knows what type of content we are sending
       res.writeHead(200, {'Content-Type': 'text/html'});
       
       // write some content to the browser that your user will see
       res.write('<h1>hello, i know nodejitsu.</h1>')
       
       // close the response
       res.end();
     }).listen(80); // the server will listen on port 80

That's all the code you'll need for starters - name the file `server.js` (or anything else you'd like), and put it in a folder named `myapp`.
We'll come back to this code in a minute - now, it's time to learn some Jitsu.

<a name="Using_The_Jitsu_Client"></a>

# Using The Jitsu Client

[Jitsu](http://github.com/nodejitsu/jitsu) is a [Command Line Interface (CLI)](http://en.wikipedia.org/wiki/Command-line_interface) for interacting with the Nodejitsu platform. It's open-source and easy to use. We've designed Jitsu to be suitable for command line beginners, but still be powerful and extensible enough for production usage. If you aren't a fan of the command line or don't have terminal access you can still do everything Jitsu can do through our web admin, [Samurai](http://nodejitsu.com). 

Jitsu requires the Node Package Manager ( npm ). If you need help installing npm go to: [Installing npm](#Installing_npm)

<a name="Installation"></a>
## Installation

     [sudo] npm install jitsu

<img src="https://github.com/nodejitsu/jitsu/raw/master/assets/jitsu.png"/>

<a name="Usage"></a>
## Usage

`jitsu` is mostly self documenting. After installation, run the `jitsu` command from your command line.

If it's your first time using `jitsu`, you will be prompted to login with an existing account or create a new account.

<img src="https://github.com/nodejitsu/jitsu/raw/master/assets/login.png"/>

**After you've logged in, you can start deploying apps immediately!**

## One-line deployment

    cd /path/to/myapp
    jitsu deploy

This will create a new application, package.json ( if you need one ), and deploy the current path to [Nodejitsu](http://nodejitsu.com). If it's your first deployment, you'll be prompted for some information such as *subdomain* and *start script* but it's really easy and we promise it will only take a few seconds.

Now just open up your favorite browser, and go to yoursubdomain.nodejitsu.com.  If everything has been set up correctly, then you, too, are on the path of nodejitsu!

If you have any issues deploying your node.js application please feel free to open up an issue on the [Github Issues](https://github.com/nodejitsu/jitsu/issues) section of the jitsu homepage. We'll have someone get back to you in a flash!


## Command Line Usage

`jitsu` is mostly self-documenting. Try any of these commands to get started.


  **Usage:**

    jitsu <resource> <action> <param1> <param2> ...

  **Common Commands:**

  *Deploys current path to [Nodejitsu](http://nodejitsu.com)*

    jitsu deploy

  *Creates a new application on [Nodejitsu](http://nodejitsu.com)*

    jitsu create

  *Lists all applications for the current user*

    jitsu list

  *Additional Commands*

    jitsu apps
    jitsu snapshots
    jitsu users
    jitsu conf
    jitsu logout



### Help

All commands will yield friendly messages to you if you specify incorrect parameters, but we have also included help commands for all available command and configuration options. If you find anything difficult to use, please open up a Github issue or pull request! 

    jitsu help
    jitsu help apps
    jitsu help snapshots
    jitsu help users
    jitsu help config

## .jitsuconf file

All configuration data for your local `jitsu` install is located in the *.jitsuconf* file located in your home directory. Directly modifying this file is not advised. You should be able to make all configuration changes via:

    jitsu config
<a name="#Open_source_Projects"></a>
# Open-source Projects

## Why open-source

A lot of Nodejitsu's technology stack is released as open-source software. We choose to do this for many reasons. Aside from being able to give back to the very awesome Node.js community, releasing pieces of our stack as open-source allows other developers to review and improve our software. We've already received invaluable contributions to our platform from developers who would have never seen our code if we had not open-sourced it.

## Where to find

Nodejitsu hosts its open-source projects on [Github.com](http://github.com/nodejitsu). Github is website for sharing and collobrating on source code. You can get source code without creating an account and if you want to create an account it's free. You'll need a [Git](http://gitscm.org/) client if you wish to check out any of our code repositories. 

You can visit our open-source project directory at: [http://github.com/nodejitsu](http://github.com/nodejitsu)

## How to contribute

Anyone can contribute to any Nodejitsu open-source projects at any time. [Github](http://github.com/nodejitsu) has the facilities for managing patches, issues, code comments, version control, etc. If you have any questions about a project you sign up and create a Github issue. We'll make sure one our ninjas gets back to you soon.
<a name="Additional_Information"></a>

# Additional Information

If you are new to Node.js and Node.js application deployment, you might find the following section helpful.

<a name="Installing_Node"></a>
## Installing Node.js

### Building and Installing Node.js

### Step 1 - Pick Your Platform

Node should install out of the box on Linux, Macintosh, and Solaris.

With some effort you should be able to get it running on other Unix
platforms and Windows (either via Cygwin or MinGW).

### Step 2 - Prerequisites

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

### Step 3a - Installing on Unix (including BSD and Mac)

**Building from source**

Use make to build and install Node (execute the following on the command line)

    git clone https://github.com/joyent/node.git
    cd node
    export JOBS=2 # optional, sets number of parallel commands.
    mkdir ~/local
    ./configure --prefix=$HOME/local/node
    make
    make install
    export PATH=$HOME/local/node/bin:$PATH

If you have any installation problems, look at [Troubleshooting
Installation](https://github.com/ry/node/wiki/Troubleshooting-Installation), try an [alternate installation method](https://gist.github.com/579814), or stop into [#node.js](http://webchat.freenode.net/?channels=node.js&uio=d4) and ask questions.

**Pre-built binaries**

You can also install node from packages: [[Installing Node.js via package manager]]

### Step 3b - Building on Windows

**Pre-built binaries**

Self-contained binaries are available at [node-js.prcn.co.cc](http://node-js.prcn.co.cc/)

**Building from source**

There are two ways of building Node on Windows. One is over the Cygwin
emulation layer the other is using MinGW (GNU toolchain for
windows). See the
[Cygwin](https://github.com/ry/node/wiki/Building-node.js-on-Cygwin-%28Windows%29)
and [MinGW](https://github.com/ry/node/wiki/Building-node.js-on-mingw)
pages.

Neither builds are satisfactorily stable but it is possible to get
something running.

### Step 4 - Install NPM
<a name="Installing_npm"></a>

NPM is a package manager that has become the de-facto standard for
installing additional node libraries and programs. Here's the quick
and easy one-liner for installing on Unix.

    $ curl http://npmjs.org/install.sh | sh

To install a library e.g. <a href="http://github.com/nodejitsu/jitsu">jitsu</a> ( The Nodejitsu deployment CLI tool )

    $ npm install jitsu

And visit
[https://github.com/isaacs/npm](https://github.com/isaacs/npm) for
details.


<a name="New_to_Node"></a>
## New to Node.js?

**Don't be scared!**  There are plenty of resources out there for beginners.  Here are just a few:

- [The nodejs.org Official Docs:](http://nodejs.org/docs/v0.4.8/api/)
- The #Node.js, #nodejitsu and #nodesupport rooms on [irc.freenode.net](http://webchat.freenode.net/)
- [@NodeKohai on Twitter](http://twitter.com/#!/NodeKohai)

<a name="Package_Json"></a>
## Understanding the package.json format
A package.json file describes your application, its dependencies, and other various application configuration. For a detailed spec on creating a package.json you can check out Isaac's fine documentation [here](https://github.com/isaacs/npm/blob/master/doc/developers.md#readme). 

## Preparing a package.json for your application

Nodejitsu requires that you create a valid [package.json](#package_json) for your application. The package.json will determine certain important pieces of information about your application which are required for deployment. Since sometimes it can get confusing when constructing your package.json file, we provide wizards in our CLI tool and on our website for creating one. 

Here is an example of what your package.json might look like:


    {
      "name": "hellonode",
      "subdomain": "hellonode",
      "scripts": {
        "start": "server.js"
      },
      "version": "0.0.0"
    }

Notice the "scripts" property? This is where you'll store information about specific scripts in your application. The "start" property indicates the script that will get called when your application is started. 

## Specifying dependencies in your package.json

If your application requires additional dependencies or third-party libraries, Nodejitsu fully supports npm module dependency resolution. All you have to do is list your dependencies the exact same way you would if you were packaging a module for npm. Here is an example of the same package.json with a few dependencies.


    {
      "name": "hellonode",
      "subdomain": "hellonode",
      "scripts": {
        "start": "server.js"
      },
      "dependencies": {
        "async": ">= 0.1.8",
        "colors": ">= 0.5.0",
        "request": ">= 1.9.0",
        "vows": ">= 0.5.8",
      },
      "version": "0.0.0"
    }

Your dependencies will be resolved when your application deploys to Nodejitsu.