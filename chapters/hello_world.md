# Hello World: A Tutorial

<!--Expand this. Point to resources!-->
This assumes that you have installed node and npm.

## Write A Server:

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

## Deploy with `jitsu`:

We've got three basic ways to deploy your application. 

- [Jitsu](#Using_The_Jitsu_Client), The Nodejitsu Command Line Tool 
- [The web admin](http://develop.nodejitsu.com/), An easy to use Web Admin
- The JSON [API](#Using_The_API)

If it is your first time deploying an application and you are eager to get started, we recommend that you try out [Jitsu](#Using_The_Jitsu_Client), our CLI tool. Jitsu has a one line installer, it's self-documenting, and you'll be able to deploy your app in seconds.

[Jitsu](http://github.com/nodejitsu/jitsu) is a [Command Line Interface (CLI)](http://en.wikipedia.org/wiki/Command-line_interface) for interacting with the Nodejitsu platform. It's open-source and easy to use. We've designed Jitsu to be suitable for command line beginners, but still be powerful and extensible enough for production usage. If you aren't a fan of the command line or don't have terminal access you can still do everything Jitsu can do through our web admin, [Samurai](http://nodejitsu.com). 

Jitsu requires the Node Package Manager (npm). If you need help installing npm go to: [Installing npm](#Installing_npm)

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

This will create a new application, package.json (if you need one), and deploy the current path to [Nodejitsu](http://nodejitsu.com). If it's your first deployment, you'll be prompted for some information such as *subdomain* and *start script* but it's really easy and we promise it will only take a few seconds.

Now just open up your favorite browser, and go to yoursubdomain.nodejitsu.com.  If everything has been set up correctly, then you, too, are on the path of nodejitsu!

If you have any issues deploying your node.js application please feel free to open up an issue on the [Github Issues](https://github.com/nodejitsu/jitsu/issues) section of the jitsu homepage. We'll have someone get back to you in a flash!

