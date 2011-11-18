# The Nodejitsu Handbook

*A gentle introduction to the art of Nodejitsu*
# Table of Contents

* [Introduction](#introduction)
* [Hello World: A Tutorial](#hiworld)
* [Platform Features](#features)
* [Jitsu](#jitsu)
* [Nodejitsu Web Application](#webapp)
* [JSON API](#api)
* [Create Your Own Cloud With Haibu](#haibu)
* [Open Source Projects](#opensource)
* [Frequently Asked Questions](#faq)
* [Support](#support)
* [Appendices](https://github.com/nodejitsu/handbook/blob/master/book.md#apx)

# Introduction
<a name="introduction"></a>

Welcome to the Nodejitsu handbook. This document will help familiarize you with
deploying your Node.js applications to the cloud while also providing
detailed information about Nodejitsu's platform-specific features and about
where to get help when you need it.

This is a living document which you can submit patches to at
[http://github.com/nodejitsu/handbook](http://github.com/nodejitsu/handbook).

## Who Is Nodejitsu?

We are a collection of seasoned developers who have been devoted to the Node.js
community since 2009. We are community leaders who have created and contributed to
hundreds of open-source Node.js projects. If you have used Node.js, you've
probably used some of the projects we've helped create. 

You can find a list of our open source projects at <http://github.com/nodejitsu>.

## What Is Nodejitsu?

[Nodejitsu](http://nodejitsu.com/) is a Platform as a Service and a Marketplace
for Node.js applications. Nodejitsu allows you to seamlessly deploy your Node.js
applications into the cloud with a myriad of additional features. Our platform
provides a robust suite of functionality to assist in the development,
management, and deployment of Node.js applications. Our deployment tools are the
most user-friendly in the industry and our customer support is unparalleled. 

## Getting Started

So you wish to learn the ways of Nodejitsu? Excellent! You only need to know
three things to get started:

* We're [Nodejitsu](http://nodejitsu.com), and we can give you scalable,
fault-tolerant cloud hosting for your Node.js apps - and we're the best you'll
find.

* Getting started with [your first app](#hiworld) is simple with our
[jitsu](#jitsu) command-line interface - we'll [show you how](#hiworld).

* Most of our stack is [open source](http://github.com/nodejitsu) and you can
[use our tools](#opensource) anywhere else you'd like to.

The Nodejitsu Handbook also contains information on [other ways to deploy your
applications](#deployment), how to [run your own cloud](#haibu) with our
software, and where to [find support](#support).

# Hello World: A Tutorial
<a name="hiworld"></a>

In this tutorial, you will write a simple "hello world" web application in
Node.js, and then deploy it using jitsu, Nodejitsu's command line interface.

Before you get started, you should have both
[node.js](https://github.com/joyent/node/wiki) and the
[Node Package Manager](https://github.com/isaacs/npm/#readme) (npm) installed.

## Write A Server:

Let's start with a very basic Node.js http server. Create a folder called
`myapp/` and then create a file inside the folder called `server.js`. Inside
this file, write the following code:

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


That's all the code you'll need for starters. Save your server and get ready to
deploy!

## Deploy with Jitsu:

In this tutorial, we will use [jitsu](http://github.com/nodejitsu/jitsu) to deploy
our "hello world" application. Jitsu is a
[Command Line Interface](http://en.wikipedia.org/wiki/Command-line_interface)
for using Nodejitsu's platform. We've designed jitsu to be
suitable for command line beginners, but still be powerful and extensible
enough for production usage. If you aren't a fan of the command line or don't
have terminal access you can still do everything jitsu can do through the
[Nodejitsu Web Application](http://nodejitsu.com).

If this is your first time deploying an application and you are eager to get
started, we recommend using jitsu: it has a one line installer, it's
self-documenting, and with it you'll be able to deploy your app in seconds.
Plus, it's what's in the tutorial.

## Installation

In order to install jitsu, open a terminal and type:

     [sudo] npm install -g jitsu

This command will install jitsu on your system; the `-g` makes npm install it
globally.

![](https://github.com/nodejitsu/jitsu/raw/master/assets/jitsu.png)

After installation, run the `jitsu` command from your command line. Since it's
your first time using jitsu, you will be prompted to log in with an existing
account or to create a new account.

![](https://github.com/nodejitsu/jitsu/raw/master/assets/login.png)

**Once you've logged in, you can deploy your app immediately.**

## One Line Deployment

Open a terminal:

    cd /home/me/myapp
    jitsu deploy

This will create a new application snapshot, generate and/or update project
metadata, and deploy the project in the current path to
[Nodejitsu](http://nodejitsu.com). If it's your first deployment, you'll be
prompted for some information such as *<u>your app's name</u>*, its 
*<u>nodejitsu subdomain</u>*, and its *<u>start script</u>*. It's really easy and we promise it will 
only take a few seconds.


    prompt: subdomain (virtual-window): virtualwindow
    prompt: scripts.start (server.js): 
    prompt: version (0.0.0): 


Now just open up your favorite browser, and go to
`yoursubdomain.nodejitsu.com`. If everything has been set up correctly, then
you, too, are on the path of nodejitsu!

# Features of the Nodejitsu Platform
<a name='features'></a>

The Nodejitsu platform makes writing and deploying web applications a snap!
In addition to simple yet powerful tools for deployment, the Nodejitsu platform
also has snapshot management, database hosting and connectivity, and a
marketplace!

There are three main tools for deploying applications to Nodejitsu:

* [Jitsu](#jitsu), The Nodejitsu command line tool 
* The Nodejitsu [Web Application](#web_admin), An easy to use web interface for
managing your applications
* Nodejitsu's JSON [API](#json_api)

Each of these tools allow developers to access the exact same functionality.

## Snapshots

Every time you deploy to Nodejitsu, we automatically take a
[snapshot](http://en.wikipedia.org/wiki/Snapshot_\(computer_storage\)) of your
application. Using any of our tools, you can view and manage snapshots, or even
roll back to an old snapshot when disaster strikes in your production 
environment.

## Databases

Applications on Nodejitsu are ready to be connected to any database. If you have already have a database running, Nodejitsu can connect to your pre-existing database. If you require a new database, Nodejitsu can provide you *free* instances of several different types of databases. These free instances are great for development purposes or hobby sites. If you require a high traffic or production database we provide an easy upgrade path to industrial strength database hosting.

### Creating new Databases

If you require database hosting you can create a new database instance of any
of our supported databases using [jitsu](#jitsu), the
[Nodejitsu Web Application](#webapp), or Nodejitsu's [API](#api). Cloud
database hosting is currently provided by CouchOne, Redis2Go and MongoHQ.

### Existing Databases

If you already have an externally hosted Database, Nodejitsu is capable of
connecting to it. We've got Database hosting if you need it, but we fully
support externally hosted Databases.


### Connecting Applications to Databases

Whenever you create a database using Nodejitsu, you will be provided with all
the information you need to connect to your database. For instance, if you
`jitsu databases create mongo myMongo`, jitsu will tell you the url for your new
mongo database on mongohq:

    info:   Welcome to Nodejitsu
    info:   It worked if it ends with Nodejitsu ok
    info:   Executing command databases create mongo myMongo
    info:   Database myMongo was created.
    info:   Database name: myMongo
    info:   Database type: mongo
    info:   Connection url: mongodb://nodejitsu:pass@staff.mongohq.com:10057/
    info:   Nodejitsu ok

You can copy-paste this url directly into your mongo library's connect method.
For example, in [Mongoose](https://github.com/learnboost/mongoose/):

    var mongoose = require('mongoose');

    mongoose.connect("mongodb://nodejitsu:pass@staff.mongohq.com:10057/");

Now you're connected to your database!

## Addons

*Note: Coming soon!*

Addons add functionality to your apps by extending and adding features to
Nodejitsu's platform and integrating third party services. For instance,
one of our addons provides powerful [Mailchimp](http://mailchimp.com)-based
mailing list management.

## Marketplace

*Note: Coming soon!*

The Marketplace is an online store where you can browse ready to deploy
Node.js Applications. The Marketplace is a great place to start if you are new
to Node.js development or want to share your existing Node.js Application with
the world.

# The Jitsu Client
<a name='jitsu'></a>

[Jitsu](http://github.com/nodejitsu/jitsu) is a
[Command Line Interface](http://en.wikipedia.org/wiki/Command-line_interface)
(CLI) for interacting with the Nodejitsu platform. It's open-source and easy
to use.

## Installation

Jitsu is distrubited using the Node Package Manager (npm). Installing jitsu
with npm is as simple as a single command:

     [sudo] npm install -g jitsu

This command installs jitsu to your Node path, so that it may be run like any other global shell command.

## Usage

Commands for jitsu follow this pattern:

    jitsu <resource> <action> <param1> <param2> ...

For example, in `jitsu apps deploy`, "apps" is the resource and "deploy" is the
action.

### jitsu deploy (jitsu apps deploy)

`jitsu deploy` will attempt to deploy the application in the current directory
to [Nodejitsu](http://nodejitsu.com). It deploys your application using the
following steps:

1. Creates the application (if necessary)
2. Creates or validates the package.json
3. Packages and creates a new snapshot
4. Stops the application (if neccessary)
5. Starts the application

### jitsu create (jitsu apps create)

`jitsu create` will create a new application. This entails generating a
package.json for your app, for the purposes of deployment.

### jitsu list (jitsu apps list)

`jitsu list` lists your applications, as well as their respective states,
subdomains, entry points and latest snapshots.

### jitsu help <resource> <action>

Jitsu is self-documenting.
All commands will yield friendly messages to you if you specify incorrect
parameters. Additionally, `jitsu help` will return useful help messages about
any given resource or resource/action pair. for instance:

    josh@pidgey:~$ jitsu help apps deploy
    info:   Welcome to Nodejitsu
    info:   It worked if it ends with Nodejitsu ok
    info:   Executing command help apps deploy
    help:   
    help:   
    help:   Deploys an application using the following steps:
    help:   
    help:     1. Creates the application (if necessary)
    help:     2. Creates or validates the package.json
    help:     3. Packages and creates a new snapshot
    help:     4. Stops the application (if neccessary)
    help:     5. Starts the application
    help:   
    help:   jitsu deploy
    help:   jitsu apps deploy
    help:   
    info:   Nodejitsu ok
    josh@pidgey:~$ 

If no resource and/or action are specified, then `jitsu help` alone will
describe what resources are available.

### jitsu apps <action>

In addition to the commands aliased to `jitsu create`, `jitsu deploy` and 
`jitsu list`, the `apps` resource allows you to create, destroy, stop, start and
otherwise interact with your applications.

### jitsu env <action>

Jitsu allows you to set environment variables on your production environment.
For example, [Express](http://expressjs.com), a popular node.js web framework,
uses the `NODE_ENV` environment variable to change behavior based on whether the
environment is for development or production. In the case of Express, nodejitsu
has `NODE_ENV` set to "production" by default, but if one wanted to change this
variable or add more for their application, `jitsu env` supplies the tools to
do so.

### jitsu config <action>

`jitsu config` commands allow you to edit your local jitsu confuration file.

### jitsu snapshots <action>

`jitsu snapshots *` commands allow you to work with snapshots for your 
Applications on Nodejitsu. Snapshots are images of your Application's code that
are deployed to the Nodejitsu Platform.

For commands that take a `<name>` parameter, if no parameter is supplied,
jitsu will attempt to read the package.json from the current directory.

### jitsu users <action>

`jitsu users *` commands allow you to work with new or existing Nodejitsu user
accounts. You will be prompted for additional user information as required.

## .jitsuconf file

All configuration data for your local jitsu install is located in the *.jitsuconf* file located in your home directory. Directly modifying this file is not advised. You should be able to make all configuration changes using `jitsu config`.

# Nodejitsu Web Application
<a name='webapp'></a>

The Nodejitsu Web Application allows developers to administrate their
applications through a web interface. This interface allows access to all the
same functionality that can be found in [jitsu](#jitsu) or the [JSON API](#api),
including deployment, snapshots and database connectivity.

![](https://github.com/jesusabdullah/handbook/raw/master/fig/webapp.png)

The web admin interface may be found at <http://develop.nodejitsu.com>.
# JSON API
<a name='api'></a>

Nodejitsu provides a web API for developers who want to interact with the
Nodejitsu platform programatically. This API is built to be
[RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) and
communicates via [JSON](http://en.wikipedia.org/wiki/JSON). The API is the most
low-level way of interacting with the Nodejitsu platform. For most deployment
scenarios you should use our command line tool, [jitsu](#jitsu), or the
[online administrative interface](#webapp).

Jitsu is implemented by
[wrapping the JSON API](https://github.com/nodejitsu/jitsu/tree/master/lib/jitsu/api).

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the user API, the [jitsu CLI](#jitsu), or just by visiting [http://nodejitsu.com](http://nodejitsu.com). Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). If you haven't used Basic Auth before, don't fret; it's easy! 

Here is an example using the command line utility,
[Curl](http://curl.haxx.se/):

     // get all applications for User "Marak"
     curl --user Marak:password http://api.nodejitsu.com/apps/marak

## Applications

Applications are the core of the Nodejitsu API. Each application represents a set of Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings, authors, etc. For more information about the package.json format see: [package.json](#package_json)

### Get all Applications for a User
    
     GET /apps/:user-id

### Create a new Application

     POST /apps/:user-id
     { package.json }

### Start an Application

     POST /apps/:user-id/:app-id/start

### Stop an Application
     
     POST /apps/:user-id/:app-id/stop

### Restart an Application
     
     POST /apps/:user-id/:app-id/restart

### Update an Application

     PUT /apps/:user-id
     { package.json }

### Delete an Application

     DELETE /apps/:user-id/:app-id/remove

## Snapshots

### Make an existing snapshot the active app
    PUT /apps/:user-id/:app-id/snapshots/:id/active

### Activate / Deploy a snapshot
    POST /apps/:user-id/:snapshots/:id

### Show a catalog of all Snapshot for an Application
    GET /apps/:user-id/:app-id/snapshots

### Show the contents of a Snapshot
    GET /apps/:user-id/:app-id/snapshots/:id


## Users

### Create a new User / Sign-up for a free Nodejitsu account

Email address is the only required field.

     POST /users/:user-id
     {
       email: "youremail@theinternet.com"
     }

### Confirm a User account

All User accounts must be confirmed. When a new User is created, a confirmation email will be sent to the email address associated with that user. In this email there will be an invite code. This code must be sent to the API to confirm the account. 

    POST /users/:user-id
    {
      inviteCode: "SecretCode"
    }

### Update User

    PUT /users/:user-id
    {
      password: "new_password"
    }
     
## Databases

### Create a new Database

     POST /databases/:user-id/:database-id
     {
       type: "couch" || "redis" || "mongo"
     }

### Get information about a Database

    GET /databases/:user-id/:database-id

### Delete a Database

    DELETE /databases/:user-id/:database-id

## Logging

Logging is a very important feature in any professional grade Node.js
application. Nodejitsu provides integrated logging solutions for your
applications. Your logs are always saved and ready to be retrieved. 

### Get all logs for a user

    POST /logs/:user-id/
    {
      "from": "NOW-3YEARS",
      "until": "NOW",
      "rows": 15
    } 

### Get logs for a specific application

    POST /logs/:user-id/:app-id
    {
      "from": "NOW-3YEARS",
      "until": "NOW",
      "rows": 15
    } 

## Marketplace

#### Get all Marketplace Applications

    GET /marketplace

#### Get a specific Marketplace Application

    GET /databases/:user-id/:id

# Create Your Own Cloud With Haibu
<a name='haibu'></a>

Haibu is an open-source tool for spawning and managing several node.js
applications on a single server. It's an integral part of Nodejitsu's
production stack and is fully supported by a dedicated team of core node.js
developers.

By installing haibu, a user creates a development environment for themselves
that mirrors the functionality of Nodejitsu's cloud platform! Any project that
can be deployed on Nodejitsu can be ran by haibu.

Haibu, which is Japanese for "hive", wraps node.js applications in a "carapace"
and converts them into managed "drones". This approach allows haibu to directly
interact with node.js applications and add all sorts of additional
functionality. Haibu also contains a plugin system, so you can easily add even
more functionality.

Haibu builds on this concept of "drones" and exposes a robust and granular API
for interacting with your node.js applications. At a low level, haibu's API is
exposed as a RESTFul HTTP webservice. Any system that supports basic HTTP
requests can communicate with a haibu server. If you are working in Node.js,
haibu comes with a high-level Node.js API client.

## Installation

    [sudo] npm install -g haibu

This will install haibu globally.

## Usage

Haibu comes with three applications, one of which is optional:

* `haibu-server` is the program that manages your node.js web applications.
Haibu-server allows you to manage and track your drones.

* `haibu` is the user interface for interacting with (and administrating) a
running haibu-server.

* `haibu-balancer` \[*optional*\] is a load balancer tool, used to split
requests across  multiple drones of the same application. It is entirely
optional, and many deployments won't have a need for it.

It may be nice to flesh this out with an example deployment, but I think this
should be relatively low priority.


## Additional Documentation

For more documentation, visit haibu's [github page](https://github.com/nodejitsu/haibu).
# Open Source Projects
<a name='opensource'></a>

## Why Open Source

Most of Nodejitsu's technology stack is released as open source software. We
choose to do this for many reasons. Aside from being able to give back to the
Node.js community, releasing pieces of our stack as open-source allows other
developers to review and improve our software. We've already received invaluable
contributions to our platform from developers who would have never seen our code
if we had not open-sourced it.

## Where To Find Our Projects

Nodejitsu hosts its open-source projects on [Github](https://github.com)
at <http://github.com/nodejitsu>. Github is a web site for sharing and
collobrating on source code using [git](http://gitscm.org/), a popular version
control system. You can get our source code without creating an account at
github, and if you want to create an account it's free. You will need a 
[git client](http://git-scm.com/download) if you wish to clone any of our
code repositories.

## How To Contribute

Anyone can contribute to any of our Nodejitsu open-source projects at any time.
Our [github site](http://github.com/nodejitsu) has the facilities for managing
patches, issues, code comments, version control, and just about anything else an
open source developer could need.

# Frequently Asked Questions
<a name='faq'></a>

## "How do I reset my password?"

One way is to use jitsu. Simply type:

    jitsu users forgot :username

where `:username` is your username. Alternately, go to <http://develop.nodejitsu.com/> and click the "forgot password" link, where you will be prompted for your username. Either process will send you an email with further instructions.

## "Is there a cheatsheet somewhere?"

There sure is! Check out <http://cheatsheet.nodejitsu.com>.

## "How are programs kept alive? Do I need to use Forever?"

Nodejitsu's cloud services watch your programs for you! You shouldn't have to do anything special to keep your apps running, much less use Forever.

## "How can I make my app use a port other than port 80?"

Connecting to other servers using arbitrary ports requires no special considerations. However, *listening* for outside connections is currently limited to port 80 on the Nodejitsu platform because we require http host headers for domain name resolution of subdomains. Consequentially, each subdomain may only host one listening service.

The ability to host tcp applications on nodejitsu and listen on non-80 ports is on our roadmap but has no associated timeline.

## "How can I point my custom domain to my nodejitsu app?"

Yes! For directions on how to set up a custom domain with Nodejitsu, [go here](http://dns.nodejitsu.com).


## "Why won't this C++ addon compile?"

Many [C++ addons](http://nodejs.org/docs/v0.4.10/api/addons.html) require libraries that are not included in Nodejitsu's infrastructure by default. For example, [node-canvas](https://github.com/learnboost/node-canvas) requires [cairo](http://cairographics.org/), which only recently became available on nodejitsu's platform.

## "How do I specify which files not to bundle? How do I know what files are getting bundled?"

Jitsu uses npm to bundle files, meaning that jitsu bundles files in exactly the same manner than npm bundles published modules. You can read about this in [npm's documentation](http://npmjs.org/doc/developers.html).

In more detail: npm uses a file called `.npmignore`, which should contain a list of files and folders to ignore for the purpose of bundling. If this file does not exist, npm will use git's ignore file, called `.gitignore`, instead. This means that, if you want to bundle files that are ignored by git, you should create an `.npmignore` even if it's blank.

*Note*: There is a minor but important difference between how `.npmignore` and `.gitignore` list folders. In the case of `.npmignore`, ignored folders should have a trailing slash:

    folderToIgnore/

In contrast, this is not necessary for `.gitignore`, and listing `folderToIgnore` without a trailing slash will work as expected.

Finally, jitsu has the ability to bundle your app without deploying with the `jitsu package create` command. You can use this to make sure that the resulting .tgz file is as you expect.

# Support
<a name='support'></a>

Nodejitsu has a team of developers standing by to assist users with any issues
they may come across while deploying and administrating their web applications
on the Nodejitsu platform. Nodejitsu strives to have a lightning-fast
turnaround on all issues you may have!

## Assistly

Our [Assistly](http://nodejitsu.assistly.com/) support center is a great
resource! Our support center includes a knowledge base where you can search for
the information you need, but if you can't find what you're looking for our
support center also allows users to post questions to Nodejitsu's support staff
using Assistly's "Q&A" feature. Post a question, and one of our ninjas will
get back to you at ninja speed!

## E-mail

If you have issues, you can always contact us via email, at
**[support@nodejitsu.com](email:support@nodejitsu.com)**.

## IRC

Nodejitsu has a channel on [freenode](http://webchat.freenode.net/) at
<a href="irc://irc.freenode.net/#nodejitsu">irc://irc.freenode.net/#nodejitsu</a>, where Nodejitsu
developers are standing by to support users around the clock. Drop by to ask
questions, get assistance or even just to hang out!

## Github Issues

Each of Nodejitsu's open source projects uses Github Issues to manage bugs and
related software problems. Github Issues is most useful for developers. For
example, if a developer finds a bug in our open-source
[http proxy](https://github.com/nodejitsu/node-http-proxy), they can submit an
issue at <https://github.com/nodejitsu/node-http-proxy/issues> and tell us about
their bug.
