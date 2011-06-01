<a name="Deploying_Applications"></a>
# Deploying Applications


We've got three basic ways to deploy your application. 

- [Jitsu](#Using_The_Jitsu_Client), The Nodejitsu Command Line Tool 
- [Samurai](http://nodejitsu.com), An easy to use Web Admin
- The [API](#Using_The_API), A high-level JSON API


If it is your first time deploying an application and you are eager to get started, we recommend that you try out [Jitsu](#Using_The_Jitsu_Client), our CLI tool. Jitsu has a one line installer, it's self-documenting, and you'll be able to deploy your app in seconds.

Let's start with a variation of the basic http server example from nodejs.org:

     var http = require('http');
     http.createServer(function (req, res) {
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end('<h1>Wow, it IS easy to get started with Jitsu!</h1>\n');
     }).listen(1337, "127.0.0.1");
     console.log('Server running at http://127.0.0.1:1337/');

That's all the code you'll need for starters - name the file `server.js` (or anything else you'd like), and put it in a folder named `myapp`.
Now it's time to learn some Jitsu.

