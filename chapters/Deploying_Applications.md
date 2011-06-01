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
Now it's time to learn some Jitsu.

