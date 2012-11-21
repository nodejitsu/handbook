# The Nodejitsu Handbook

*A gentle introduction to the art of Nodejitsu*

## Quick Links:

* [The Nodejitsu Handbook (.pdf)](http://handbook.jit.su/book.pdf)
* [Frequently Asked Questions](https://github.com/nodejitsu/handbook/#faq)
* [The Nodejitsu Cheatsheet](http://cheatsheet.jit.su/)
* [The NPM Cheatsheet](http://blog.nodejitsu.com/npm-cheatsheet)
* [The package.json Reference](http://package.json.jit.su/)
* [How To Set Up Custom DNS](http://dns.jit.su)
* [API Documentation](https://github.com/nodejitsu/handbook/blob/master/API.md)
* [How To Build The Handbook](https://github.com/nodejitsu/handbook/blob/master/appendices/building_the_handbook.md#appendix-building-the-nodejitsu-handbook)


# Table of Contents

* [Introduction](#introduction)
* [Hello World: A Tutorial](#hiworld)
* [Platform Features](#features)
* [Jitsu](#jitsu)
* [Nodejitsu Web Application](#webapp)
* [Nodejitsu Web Hook API](#nodejitsu-web-hook-api)
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
Note that this ReadMe.md file is generated from the individual content files in the
`/chapters` folder, so any edits should be made to those source files, not `book.md`.

## Who Is Nodejitsu?

We are a collection of seasoned developers who have been devoted to the Node.js
community since 2009. We are community leaders who have created and contributed to
hundreds of open-source Node.js projects. If you have used Node.js, you've
probably used some of the projects we've helped create. 

You can find our open source projects at <https://github.com/nodejitsu>, <https://github.com/flatiron>, 
<https://github.com/hookio>, and <https://github.com/nodeapps>.

## What Is Nodejitsu?

[Nodejitsu](http://nodejitsu.com/) is a Platform as a Service for Node.js applications. Nodejitsu allows you to seamlessly deploy your Node.js
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
applications](#deployment) and where to [find support](#support).

# Hello World: A Tutorial
<a name="hiworld"></a>

In this tutorial, you will write a simple "hello world" web application in
Node.js, and then deploy it using jitsu, Nodejitsu's command line interface.

Before you get started, you should have 
[node.js](https://github.com/joyent/node/wiki) installed. If you are using 
a node.js version older than v0.6.0 (not recommended) you will also need to 
separately install 
[Node Package Manager](https://github.com/isaacs/npm/#readme) (npm).

## Write A Server

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
      res.write('<h1>hello, i know nodejitsu.</h1>');
      
      // close the response
      res.end();
    }).listen(8080); // the server will listen on port 8080



That's all the code you'll need for starters. Save your server and get ready to
deploy!

## Deploy with Jitsu

In this tutorial, we will use [jitsu](http://github.com/nodejitsu/jitsu) to deploy
our "hello world" application. Jitsu is a
[Command Line Interface](http://en.wikipedia.org/wiki/Command-line_interface)
for using Nodejitsu's platform. We've designed jitsu to be
suitable for command line beginners, but still be powerful and extensible
enough for production usage. If you aren't a fan of the command line or don't
have terminal access you can still do app deployments through the
[Nodejitsu Web Application](https://webops.nodejitsu.com/).

If this is your first time deploying an application and you are eager to get
started, we recommend using jitsu: it has a one line installer, it's
self-documenting, and with it you'll be able to deploy your app in seconds.
Plus, it's what's in the tutorial.

## Installation

In order to install jitsu, open a terminal and type:

     [sudo] npm install jitsu -g

This command will install jitsu on your system; the `-g` makes npm install it
globally, rather than as a local module.

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


    prompt: subdomain (myapp): myapp
    prompt: scripts.start (server.js): 
    prompt: version (0.0.0): 


Now just open up your favorite browser, and go to
`myapp.nodejitsu.com`. If everything has been set up correctly, then
you, too, are on the path of nodejitsu!

# Features of the Nodejitsu Platform
<a name='features'></a>

The Nodejitsu platform makes writing and deploying web applications a snap!
In addition to simple yet powerful tools for deployment, the Nodejitsu platform
also has snapshot management, database hosting and connectivity, and more!

There are three main tools for deploying and managing applications to Nodejitsu:

* [Jitsu](#jitsu), The Nodejitsu command line tool 
* The Nodejitsu [Web Application](#web_admin), An easy to use web interface for
managing your applications
* Nodejitsu's JSON [API](#json_api)

Each of these tools allow developers to access the same functionality.

## Application Scalability with Drones

Each deployed application runs as a [drone](https://github.com/nodejitsu/haibu-carapace) on a [haibu](https://github.com/nodejitsu/haibu) application server. Because of this architecture, one app can be served by *any amount of drones on arbitrary machines*, giving you many options for scaling your application.

## Zero Downtime Deploys

When deploying a new application, nodejitsu keeps hosting your old app version until the new deploy is confirmed to be running. This means your applications never go down, even if you have a bad deploy.

## Multi-Version Node Support

Nodejitsu allows users to choose which version of node they want their
application to run on. In order to set your node version, specify it in your 
`package.json`'s "engines" field. For example:


    {
      "author": "Nodejitsu <josh@nodejitsu.com>",
      "version": "0.1.0",
      "scripts": {
        "start": "node bin/server"
      },
      "analyze": false,
      "name": "helloworld",
      "engines": {
        "node": "v0.6.x"
      }
    }


If no node engine is specified, jitsu will prompt for it automatically. Currently Nodejitsu runs node `0.6.x` and `0.8.x`.

## Snapshots
<a name='features/snapshots'></a>

Every time you deploy to Nodejitsu, we automatically take a
[snapshot](http://en.wikipedia.org/wiki/Snapshot_\(computer_storage\)) of your
application. Using any of our tools, you can view and manage snapshots, or even
roll back to an old snapshot when disaster strikes in your production 
environment. *During a deploy, nodejitsu will create a new snapshot automatically.*

Jitsu commands for snapshot management include:

* `jitsu snapshots list <app-name>` will list all snapshots for an application.
* `jitsu snapshots activate <app-name>` allows you to choose which snapshot your drones are running.
* `jitsu snapshots fetch <app-name>` will download a specified snapshot of your application to your computer.

## Databases
<a name='features/databases'></a>

Applications on Nodejitsu are ready to be connected to any database. If you
already have a database running, Nodejitsu can connect to your pre-existing
database. If you require a new database, Nodejitsu can provide you *free*
instances of several different types of databases. These free instances are
great for development purposes or hobby sites. If you require a high traffic
or production database we provide an easy upgrade path to industrial strength
database hosting.

### Creating new Databases

If you require database hosting you can create a new database instance of any
of our supported databases using [jitsu](#jitsu) or Nodejitsu's [API](#api).
Cloud database hosting is currently provided by 
[IrisCouch](http://www.iriscouch.com), [RedisToGo](http://redistogo.com) 
and [MongoLab](https://www.mongolab.com).

### Existing Databases

If you already have an externally hosted Database, Nodejitsu is capable of
connecting to it. We've got Database hosting if you need it, but we fully
support externally hosted Databases.

### Connecting Applications to Databases

Whenever you create a database using Nodejitsu, you will be provided with all
the information you need to connect to your database.

#### CouchDB

If you run `jitsu databases create couchdb myCouch`, jitsu will tell you the
url for your new couchdb from iriscouch:

    info:    Welcome to Nodejitsu user
    info:    It worked if it ends with Nodejitsu ok
    info:    Executing command databases create couchdb myCouch
    info:    Database myCouch was created.
    data:    Database Type: couch
    data:    Database Name: myCouch
    data:    Connection url: http://subdomain.iriscouch.com:5984
    data:    SSL connection url: https://subdomain.iriscouch.com:6984
    info:    Nodejitsu ok

You can connect to this database using any http client, or a couchdb specific
library. For example, you can connect with curl:


    $ curl http://subdomain.iriscouch.com:5984

Or, you can connect with [nano](https://github.com/dscape/nano):

    var nano = require('nano')('http://nodejitsudb944957670256.iriscouch.com:5984');

You can also access your database in your browser by going to http://subdomain.iriscouch.com:5984/_utils .


#### MongoDB

If you run `jitsu databases create mongo myMongo`, jitsu 
will supply a connection string for your new mongo database on mongolab:

    info:   Welcome to Nodejitsu user
    info:   It worked if it ends with Nodejitsu ok
    info:   Executing command databases create mongo myMongo
    info:   Database myMongo was created.
    info:   Database name: myMongo
    info:   Database type: mongo
    info:   Connection url: mongodb://nodejitsu:pass@subdomain.mongohq.com:10057/somedatabase
    info:   Nodejitsu ok

You can connect to this using the `mongo` CLI client tool like so:

    $ mongo subdomain.mongolab.com:100027/somedatabase -u nodejitsu -p pass

or with the `mongodb-native` module:

    var mongodb = require('mongodb');
    var db = new mongodb.Db('somedatabase',
      new mongodb.Server('subdomain.mongolab.com', 10027, {})
    );
    db.open(function (err, db_p) {
      if (err) { throw err; }
      db.authenticate('nodejitsu', 'pass', function (err, replies) {
        // You are now connected and authenticated.
      });
    });

or with mongoose:

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://nodejitsu:pass@subdomain.mongolab.com:10057/somedatabase');

You can copy-paste this url directly into your mongo library's connect method.
For example, in [Mongoose](https://github.com/learnboost/mongoose/):

    var mongoose = require('mongoose');
    mongoose.connect("mongodb://nodejitsu:pass@staff.mongolab.com:10057/");

#### Redis

Running `jitsu databases create redis myRedis` will create a redis instance supplied by redistogo:

    info:    Welcome to Nodejitsu user
    info:    It worked if it ends with Nodejitsu ok
    info:    Executing command databases create r testRedis
    info:    A new redis has been created
    data:    Database Type: redis
    data:    Database Name: testRedis
    data:    Connection host: subdomain.redistogo.com
    data:    Connection port: 5309
    data:    Connection auth: pass
    info:    Nodejitsu ok

**Note:** Some versions of jitsu may show a connection string, eg. `redis://nodejitsu:pass@subdomain.redistogo.com:5309`.

You can connect to your redis with the `redis-cli` cli client:

    $ redis-cli -h subdomain.redistogo.com -p 5309 -a pass

or with the `redis` module:

    var redis = require('redis');
    var options = { parser: 'javascript' };
    var client = redis.createClient(5309, 'subdomain.redistogo.com', options);
    client.auth('pass', function (err) {
      if (err) { throw err; }
      // You are now authed with your redis.
    });

**Note:** If you are using an older version of `node_redis`(<0.8.0), You may have to 
explicitly use its javascript parser instead of the optional native module `hiredis` 
that may be packaged with it, as there are issues compiling on the nodejitsu 
platform. Passing `{ parser: 'javascript' }` to `redis.createClient` will ensure 
usage of the javascript parser. Check out the other possible options in the 
[node redis docs](https://github.com/mranney/node_redis#rediscreateclientport-host-options).

## Environment Variable Management

Nodejitsu allows users to modify the environment variables exposed to their 
apps using jitsu and our other tools. When an environment variable is changed 
it is necessary restart your app for it to take effect.

Available commands are `list`, `get`, `set`, `delete`, and 
`clear`. 

`jitsu env list` will list any and all environment variables in an apps 
current working directory (Note: the app needs to have been deployed before the 
environment variables can be accessed).  
`jitsu env list <myapp>` will list any and all environment variables related 
to `<myapp>` in an account.  
`jitsu env get <key>` will display the apps key environment variable 
`<value>`.  
`jitsu env set <key> <value>` will set the apps `<key>` environment variable 
to `<value>`.  
`jitsu env delete <key>` will delete the apps `<key>` environment variable.  
`jitsu env clear` will delete all of the apps environment variables after a 
prompt.

An Example:

    $ jitsu env set NODE_ENV production


This will set the environment variable $NODE_ENV to have the string value 
"production". Remember, this will not take effect until the app is started 
again (`jitsu apps start` -- there is no need to take your app down with a 
`restart` with the zero downtime deploys).

## SSL on nodejitsu.com subdomains

Our balancers can proxy https to http, so you get SSL on nodejitsu.com subdomains automatically! For example, the app behind [http://nodejitsu.com](http://nodejitsu.com) is serving http, but visiting [https://nodejitsu.com](https://nodejitsu.com) works without any special action on our part.

Please note that this only works with `nodejitsu.com` (not `jitsu.com` or `jit.su`) at this time.

If you need to identify if you are receiving http or https traffic use the 
`x-forwarded-proto` response header value, see 
[headers.jit.su](http://headers.jit.su/) for more information on headers 
passed through the balancers.

## Custom Domains

We allow users to host their applications on custom domains by specifying their
app's domains in their `package.json` and then properly configuring their DNS.
If you'd like to know how, just read the instructions at [http://dns.jit.su](http://dns.jit.su)!

### SSL Certificates for Custom Domains

Our balancers use [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication) which allow them to receive SSL traffic from multiple domains---including yours! If, for example, you owned `mydomain.com` and wanted secure connections, all you need are your .pem and .key files!

*Note: This feature is not exposed through our API or other tools at this time. If you need this feature, please contact support at `support@nodejitsu.com`.*

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

Jitsu is distributed using the Node Package Manager (npm). Installing jitsu
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
4. Starts the application

If you had a previous deployment running, and the most recent deploy failed, your old 
application will contnue to run without interruption

### jitsu list (jitsu apps list)

`jitsu list` lists your applications, as well as their respective states,
subdomains, entry points and latest snapshots.

### jitsu help <resource> <action>

*Jitsu is self-documenting.*
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

If your app is in a stopped state, you will not be charged for it, ever. To put your
app in a stopped state run `jitsu apps stop <appname>`.

### jitsu env <action>

Jitsu allows you to set environment variables on your production environment.
For example, [Express](http://expressjs.com), a popular node.js web framework,
uses the `NODE_ENV` environment variable to change behavior based on whether the
environment is for development or production. In the case of Express, nodejitsu
has `NODE_ENV` set to "production" by default, but if one wanted to change this
variable or add more for their application, `jitsu env` supplies the tools to
do so.

### jitsu config <action>

`jitsu config` commands allow you to edit your local jitsu configuration file.

### jitsu snapshots <action>

`jitsu snapshots *` commands allow you to work with snapshots for your 
Applications on Nodejitsu. Snapshots are images of your Application's code that
are deployed to the Nodejitsu Platform.

For commands that take a `<name>` parameter, if no parameter is supplied,
jitsu will attempt to read the package.json from the current directory.

### jitsu users <action>

`jitsu users *` commands allow you to work with new or existing Nodejitsu user
accounts. You will be prompted for additional user information as required.


### jitsu install

`jitsu install` is a built-in tool for downloading "starter apps" to speed up development. For example, here's how to use `jitsu install` to download a "hello world" application:

    josh@onix:/tmp$ jitsu install helloworld
    info:   Welcome to Nodejitsu jesusabdullah
    info:   It worked if it ends with Nodejitsu ok
    info:   Executing command install helloworld
    info:   Installing helloworld locally.
    warn:   Downloading packages from npm, this may take a moment...
    info:   helloworld installed.
    help:   You can now jitsu deploy this application
    prompt: Would you like to start this application locally? (yes): no
    info:   Nodejitsu ok
    josh@onix:/tmp$ cd helloworld
    josh@onix:/tmp/helloworld$ ls
    bin  node_modules  package.json  ReadMe.md


## Configuring jitsu

All user-level configuration data for your local jitsu install is located in the *.jitsuconf* file located in your home directory. Directly modifying this file is not advised. You should be able to make all configuration changes using `jitsu config`.

### Selected Properties of .jitsuconf

* *loglength*: Change this to modify the default length of returned logs from `jitsu logs`.
* *loglevel*: Change this to modify the logging levels displayed by jitsu. Defaults to "info".
* *colors*: Change this to false to turn off jitsu's colors. Defaults to `true`.
* *analyze*: Change this to false to disable require-analyzer for all apps. Defaults to `true`.
# Nodejitsu Web Application
<a name='webapp'></a>

The Nodejitsu Web Application allows developers to administrate their
applications through a web interface. This interface allows access to the same deployment functionality that can be found in [jitsu](#jitsu) or the [JSON API](#api).

The web admin interface may be found at <https://webops.nodejitsu.com>.
# Nodejitsu Web-hook API

Access the `Admin` section on your open source node.js Github repository. Click `Service Hooks` and then `Nodejitsu`. You will be presented with a form with four fields:

* Username, which defaults to your Github username
* Password, your password or a valid [Nodejitsu API authentication token](https://github.com/nodejitsu/handbook#create-an-api-token)
* Branch, where you can define the branch you wish to deploy and defaults to master
* Endpoint, which defaults to https://webhooks.nodejitsu.com

![The Github Interface for Nodejitsu](https://lh4.googleusercontent.com/-kiN3YkEG_ys/UJqQ-4aGJbI/AAAAAAAADFc/esjmrqD_2IY/s945/Screenshot%252B2012-11-07%252Bat%252B16.42.57.png)

Select `Active` and hit `Update Settings`. From now on every-time you commit to Github (in the designated deployment branch) we will deploy that application for you. That simple.

## Monitoring deployments

There's several ways to access the deployment status in the Nodejitsu Webhook API, and you can find the complete documentation at [webhooks.nodejitsu.com](http://webhooks.nodejitsu.com).

The most fun way to monitor your deployment is with the realtime status changes feed.

``` sh
# if your username is foo and password is bar this would be 
# https://foo:bar@webhooks.nodejitsu.com/1/status/foo/changes
curl https://username:password@webhooks.nodejitsu.com/1/status/username/changes?include_docs=auto
```

This will create an HTTP keep alive connection that pushes the status to you in realtime every time someone invokes our API:

``` js
{
  "id": "https://webhooks.nodejitsu.com/1/status/dscape/changes/2b3de47c2ce04a9dda4d31aac5000bab",
  "app_name": "hello-world-api-flatiron",
  "uuid": "aa6e9b1332436698771",
  "status": "ok",
  "provider": "travis",
  "commit": "dscape/hello-world-flatiron-api/96410ed970f6224a4cd3c450150c5d65bbc77fcd"
}
```

Each request to our API is logged with a unique `uuid`, so you can use it to refer possible issues to our support staff.

We are now ready to deploy, go back to Github and click `Test Hook`. You should be up and running shortly.

## Travis

What about continuous integration?  We added [Travis-CI](http://travis-ci.org/) so you can feel safe about your deployments. Simply add something like this in your `.travis.yml` file.

```
notifications:
  webhooks: 
    urls:
      - http://webhooks.nodejitsu.com/1/deploy
    on_success: always
    on_failure: never
```

Internally our API will try to see if you have Travis configured like this, and if you do it will put the deployment request from Github on a hold until Travis informs us all tests have passed.

If tests failed we won't deploy. Simple.

## Deploying Private Repos & Commit Status API

If you authorize access so we can use your github account we can do more fun stuff like allowing you to deploy your private repositories, or even update your [commit status](https://github.com/blog/1227-commit-status-api) and check if a deployment worked directly in github.

![Commit Status API](https://lh5.googleusercontent.com/-UK1ktEYEDqo/UKb8QKsaaNI/AAAAAAAADF0/5Pvdkh1_SDM/s829/Screenshot%252B2012-11-17%252Bat%252B02.29.29.png)

To authorize simply do:

``` sh
curl -X POST \
  -H "Content-type: application/json" \
  --data "{ \"credentials\": githubUser:githubPassword }" \
  https://nodejitsuUser:nodejitsuPass@webhooks.nodejitsu.com/1/auth/github 
```

## But wait, I have API keys I can't commit to Github as open source?!

Don't worry, you can use `jitsu set env` to set environment variables that you can access with `process.env`. Check our [handbook](https://github.com/nodejitsu/handbook#environment-variable-management) for more information. Environment variables set this way persist across deployments and are also available in our [webops](https://webops.nodejitsu.com) application.

<a name="api"></a>
## API Documentation

<a name="deploy"></a>
### Deploy

```
POST /
POST /1/deploy
```

Deploy a new application with a given payload. 

Check [Sample Payloads](#payloads) for examples. This method is normally called by a [github](http://help.github.com/post-receive-hooks) or [travis](http://about.travis-ci.org/docs/user/build-configuration) web-hook.

You must configure the github webhook to use the travis webhook. Works under the assumption that if your repository has a `.travis.yml` file and that contains at least one webhook notification we shouldn't deploy from the github request, but instead wait until travis triggers the notify event and calls our API. This effectively means that if travis tests don't pass your application does not get deployed.

```
curl -X POST -d @file https://user:pass@webhooks.nodejitsu.com/1/deploy
```

Authentication can use a pair of `user:pass` or `user:apiToken`.

<a name="deploy-accept"></a>
#### Accept

<table>
  <tr>
    <th>Content-type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>application/json</td>
    <td>A valid JSON payload</td>
  </tr>
</table>

<a name="deploy-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="deploy-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>deploy:db:failed_to_store_payload</td>
    <td>503</td>
    <td>Our database isn't responding or timed out</td>
  </tr>
  <tr>
    <td>deploy:provider:not_supported</td>
    <td>400</td>
    <td>You tried to deploy an invalid payload</td>
  </tr>
  <tr>
    <td>deploy:github:no_pkg_json</td>
    <td>502</td>
    <td>We couldn't get package.json from github. This may happen because you are trying to deploy a private repo</td>
  </tr>
  <tr>
    <td>deploy:auth:bad_creds</td>
    <td>401</td>
    <td>You didn't provide valid Basic Auth in your HTTP request</td>
  </tr>
  <tr>
    <td>deploy:github:download_tarball</td>
    <td>502</td>
    <td>Failed to get the tarball from github</td>
  </tr>
  <tr>
    <td>deploy:nodejitsu:upload_tarball</td>
    <td>502</td>
    <td>Failed to upload the tarball to nodejitsu</td>
  </tr>
  <tr>
    <td>deploy:tar:*</td>
    <td>500</td>
    <td>There was a system failure when extracting the tar</td>
  </tr>
  <tr>
    <td>deploy:nodejitsu:start_app</td>
    <td>500</td>
    <td>Failed to start nodejitsu application</td>
  </tr>
  <tr>
    <td>deploy:no_payload</td>
    <td>400</td>
    <td>You didn't provide a payload</td>
  </tr>
</table>

<a name="status"></a>
### Status

```
GET /1/status/:user/webhooks
GET /1/status/:user/webhooks/:application
```

Gets the install status for a specific user. Useful to determine if the deploy worked, or why it failed. `:user` is your nodejitsu username and `:application` is your application name.

```
curl https://dscape:password@webhooks.nodejitsu.com/1/status/dscape/webhooks/hello-world-api-flatiron?limit=10\&skip=20
```

<a name="status-qs"></a>
#### Query String Parameters

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>limit</td>
    <td>Integer</td>
    <td>Number of log entries to display per page</td>
  </tr>
  <tr>
    <td>skip</td>
    <td>Integer</td>
    <td>Number of log entries to skip. e.g. if you saw 10 already, you might do a skip=10</td>
  </tr>
</table>

<a name="status-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="status-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>mw:auth:not_you</td>
    <td>401</td>
    <td>You are trying to get status that don't belong to you</td>
  </tr>
  <tr>
    <td>mw:auth:auth_server_down</td>
    <td>500</td>
    <td>We couldn't verify your credentials</td>
  </tr>
  <tr>
    <td>mw:auth:unauthorized</td>
    <td>401</td>
    <td>Your username/password combination doesn't match our records</td>
  </tr>
  <tr>
    <td>mw:auth:no_username</td>
    <td>401</td>
    <td>Your user document is in a bad state, contact support</td>
  </tr>
  <tr>
    <td>status:db:not_found</td>
    <td>404</td>
    <td>Didn't find that log entry</td>
  </tr>
  <tr>
    <td>status:db:get_by_id</td>
    <td>500</td>
    <td>The database couldn't complete your query</td>
  </tr>
  <tr>
    <td>status:db:query_fail</td>
    <td>500</td>
    <td>The database couldn't complete your query</td>
  </tr>
</table>

<a name="changes"></a>
### Changes

```
GET /1/status/:user/changes/
GET /1/status/:user/changes/:id
```

Streams log files as you deploy application with a changes stream. When you provide an id it will just return that entry and close the http connection.

```
curl https://dscape:password@webhooks.nodejitsu.com/1/status/dscape/changes?include_docs=true
```

<a name="changes-qs"></a>
#### Query String Parameters

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>include_docs</td>
    <td>Boolean</td>
    <td>Will add an extra property `doc` (containing the full log document) to each log entry that is displayed. Use "auto" for automatically expanding errors and summarizing ok statuses</td>
  </tr>
</table>

<a name="changes-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="changes-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>mw:auth:not_you</td>
    <td>401</td>
    <td>You are trying to get status that don't belong to you</td>
  </tr>
  <tr>
    <td>mw:auth:auth_server_down</td>
    <td>500</td>
    <td>We couldn't verify your credentials</td>
  </tr>
  <tr>
    <td>mw:auth:unauthorized</td>
    <td>401</td>
    <td>Your username/password combination doesn't match our records</td>
  </tr>
  <tr>
    <td>mw:auth:no_username</td>
    <td>401</td>
    <td>Your user document is in a bad state, contact support</td>
  </tr>
  <tr>
    <td>status:db:query_fail</td>
    <td>500</td>
    <td>The database couldn't complete your query</td>
  </tr>
  <tr>
    <td>status:changes:timeout</td>
    <td>408</td>
    <td>The socket connection timeout. Please re-connect</td>
  </tr>
  <tr>
    <td>status:changes:fatal</td>
    <td>500</td>
    <td>There was an error in the underlying connection</td>
  </tr>
</table>

<a name="auth"></a>
### auth

```
GET /1/auth/github
```

Tries to get authorization from github, so elevated privileges can be used on that service. This will give us access to get working code from your repositories and change the status of a specific pull request

```
curl -X POST nodejitsuUser:nodejitsuPwd@webhooks.nodejitsu.com/1/auth/github --data '{"credentials":"githubUser:githubPass"}' --header "Content-type: application/json" 
```

<a name="auth-qs"></a>
#### Query String Parameters

The `app` parameter exists so you can restrict usage of a token to a individual application. This is useful can then commit status can only be applied to that specific application, and other third party tokens will not be returned.

However be careful, when specifying an application we will not be able to use these credentials to access the repository (because when we do that for the first time we still don't know the app name, we learn that from the package.json file).

Bottom line if you want to do deployments for private repositories do not specify `app` or you will fail.

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>app</td>
    <td>String</td>
    <td>Will restrict the usage of this token to a application. If not provided a wildcard will be used.</td>
  </tr>
</table>

<a name="auth-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="auth-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>mw:auth:not_you</td>
    <td>401</td>
    <td>You are trying to get status that don't belong to you</td>
  </tr>
  <tr>
    <td>mw:auth:auth_server_down</td>
    <td>500</td>
    <td>We couldn't verify your credentials</td>
  </tr>
  <tr>
    <td>mw:auth:unauthorized</td>
    <td>401</td>
    <td>Your username/password combination doesn't match our records</td>
  </tr>
  <tr>
    <td>mw:auth:no_username</td>
    <td>401</td>
    <td>Your user document is in a bad state, contact support</td>
  </tr>
  <tr>
    <td>auth:github:get_user_failed</td>
    <td>500</td>
    <td>When retrieving the user from the nodejitsu api we got a non 200 response. The api might be down, or perhaps authorization credentials where changed</td>
  </tr>
  <tr>
    <td>auth:github:update_user_failed</td>
    <td>500</td>
    <td>We tried to update the user but it failed. Just like above, reasons are varied so contact support if you see this</td>
  </tr>
  <tr>
    <td>auth:github:no_credentials</td>
    <td>400</td>
    <td>Credentials were not provided. Check query string parameters for details</td>
  </tr>
  <tr>
    <td>auth:github:bad_credentials</td>
    <td>400</td>
    <td>Credentials were provided but not in the username:password format. Check query string parameters for details</td>
  </tr>
  <tr>
    <td>auth:github:github_pairing_failed</td>
    <td>401</td>
    <td>We tried to authenticate with github but it failed</td>
  </tr>
</table># JSON API
<a name='api'></a>

Nodejitsu provides a web API for developers who want to interact with the Nodejitsu platform programatically. This API is built to be [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) and communicates via [JSON]. The API is the most low-level way of interacting with the Nodejitsu platform. For most deployment scenarios you should use our command line tool, [jitsu], the [online administrative interface][webops], or use our [WebHook API][webhooks] when integrating with third party services.

## API Clients

Nodejitsu has a JSON API client for node.js, which may be found at [github.com/nodejitsu/nodejitsu-api](https://github.com/nodejitsu/nodejitsu-api) (along with API clients in other languages as they are developed). 

`jitsu` is implemented by using the node.js API client.

## Authentication

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the API, [jitsu], or just by visiting [nodejitsu.com][nodejitsu]. 

Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) and Token authentication.

Here is an example using the command line utility with Basic authentication,
[curl]:

     // get all applications for User "Marak"
     curl --user Marak:password https://api.nodejitsu.com/apps/marak

Token authentication works the same way but instead of providing a password you need to provide an API token. Even though you can authenticate with an API token it does restrict access to your user profile, password, etc for security reasons.

## Applications

Applications are the core of the Nodejitsu API. Each application represents a set of Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings and authors. For more information about the `package.json` format see: [package.json](http://package.json.jit.su)

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

     DELETE /apps/:user-id/:app-id

## Snapshots

Application snapshots are kept so you can keep track of each of your deployments. You can use [jitsu], or our [online administrative interface][webops] to revert to a specific snapshot, or download the code you have running in the server.

### Make an existing snapshot the active app
    POST /apps/:user-id/:app-id/snapshots/:id/activate

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

### Get User API Tokens

    GET /users/:user-id/tokens

### Delete an API Token

    DELETE /users/:user-id/tokens/:token-id

### Create an API Token

Token and provider are mandatory

    POST /users/:user-id/tokens

### Get User Third Party Tokens

Users sometimes need Nodejitsu to store an authorization token for a service they want us to use for them. e.g. For us to deploy a private repository you have in Github we need you to give Nodejitsu access to your github account.

Third Party tokens serve this purpose. The current supported providers are:

* [Github](http://github.com)

```
GET /users/:user-id/thirdparty
```

### Delete an Third Party Token

    DELETE /users/:user-id/thirdparty/:token-id

### Create an Third Party Token

    POST /users/:user-id/thirdparty
    {
      token: "SEVMTE8gWUVTIEkgQU0gRE9HCg", // mandatory
      provider: "github", // mandatory
      id: "a string id 123" // optional, helps humans identify the key
    }

## Databases

### Create a new Database

     POST /databases/:user-id/:database-id
     {
       type: "couch" || "redis" || "mongo" || "mongohq" || "redistogo"
     }

### Get information about a Database

    GET /databases/:user-id/:database-id

### Delete a Database

    DELETE /databases/:user-id/:database-id

## Logging

Nodejitsu provides integrated logging solutions for your applications. Your logs are always saved and ready to be retrieved.

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


[jitsu]: http://github.com/nodejitsu/jitsu
[JSON]: http://en.wikipedia.org/wiki/JSON
[webops]: https://webops.jit.su
[webhooks]: https://webhooks.nodejitsu.com
[nodejitsu]: http://nodejitsu.com
[curl]: http://curl.haxx.se/# Create Your Own Cloud With Haibu
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

    [sudo] npm install haibu -g

This will install haibu globally. You can also grab the source [directly from git](https://github.com/nodejitsu/haibu).

## Usage

To start haibu, all you have to do is run `haibu`:

    $ haibu 
          __                  __               
         / /_    ______  __  / /_     __  __   
        / __ \  / __  / / / /  __ \  / / / /   
       / / / / / /_/ / / / /  /_/ / / /_/ /    
      /_/ /_/  \__,_/ /_/ /_/\___/  \__,_/     
      
      This is Open Source Software available under
      the MIT License.
      
      © 2010 Nodejitsu Inc.
      All Rights Reserved - www.nodejitsu.com
      haibu started @ 10.0.1.4 on port 9002 as api-server
        using plugins: config, exceptions, directories, log, http

Haibu is an http server that exposes a REST api on port 9002. You can either
access this API client with a regular HTTP client, or use our [haibu-api](https://github.com/nodejitsu/haibu-api/tree/master/node.js) module. Unfortunately, jitsu does not work with haibu's HTTP API, only the nodejitsu API.

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

Nodejitsu hosts its open-source projects on [Github](https://github.com):

* *<https://github.com/nodejitsu>*: Open source components of Nodejitsu's PaaS
* *<https://github.com/flatiron>*: Nodejitsu's "anti-framework" for building web and cli applications
* *<https://github.com/nodeapps>*: A collection of node.js applications ready to use

Github is a web site for sharing and
collaborating on source code using [git](http://gitscm.org/), a popular version
control system. You can get our source code without creating an account at
github, and if you want to create an account it's free. You will need a 
[git client](http://git-scm.com/download) if you wish to clone any of our
code repositories.

## How To Contribute

Anyone can contribute to any of our open-source projects at any time.
Our [github site](https://github.com/nodejitsu) has the facilities for managing
patches, issues, code comments, version control, and just about anything else an
open source developer could need.

# Frequently Asked Questions
<a name='faq'></a>

**For more information about pricing, see [the pricing FAQ](http://nodejitsu.com/paas/faq.html).**

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

The ability to host TCP applications on nodejitsu and listen on non-80 ports is on our roadmap but has no associated timeline.

## "How do I make Koding work with jitsu?"

By default, Koding will not install packages globally, due to a permission error. You can fix this by setting the
npm prefix to a location that you have permissions to access, like your home directory. To do this, simply run:

`npm config set prefix ~`

And then you can install jitsu normally:

`npm i jitsu -g`

## "Can I use jitsu with Cloud9 IDE (<http://c9.io>)?"

Yes! Follow these steps to install jitsu.

1. Install the latest npm globally: `npm install -g npm`

2. Install the latest jitsu locally: `npm install jitsu`

Now you can use jitsu as usual. If you get error, try `npm rm -g jitsu && npm cache clean`.

## "How can I turn off the require-analyzer in jitsu? I want to manage my own dependencies!"

There are three ways to disable the require-analyzer:

* Use the `--noanalyze` flag when running jitsu commands to disable it on a one-time basis.
* Add `"analyze": false` to your package.json to disable it on a per-app basis.
* Set "analyze" to `false` in your `~/.jitsuconf` to disable it on a global level.

## "How Do I add my GitHub repository as a dependency?"

Use the following format: `https://github.com/:user/:repo/tarball/:branch`

## "Why won't this C++ addon compile?"

Many [C++ addons](http://nodejs.org/docs/latest/api/addons.html) require libraries that are not included in Nodejitsu's infrastructure by default. For example, [node-canvas](https://github.com/learnboost/node-canvas) requires [cairo](http://cairographics.org/). Nodejitsu has cairo and many other such libraries, but may not have some more obscure ones.

## "How do I specify which files not to bundle? How do I know what files are getting bundled?"

Jitsu uses npm to bundle files, meaning that jitsu bundles files in exactly the same manner than npm bundles published modules. You can read about this in [npm's documentation](http://npmjs.org/doc/developers.html).

In more detail: npm uses a file called `.npmignore`, which should contain a list of files and folders to ignore for the purpose of bundling. If this file does not exist, npm will use git's ignore file, called `.gitignore`, instead. This means that, if you want to bundle files that are ignored by git, you should create an `.npmignore` even if it's blank.

Finally, jitsu has the ability to bundle your app without deploying with the `jitsu package create` command. You can use this to make sure that the resulting .tgz file is as you expect.

## "How do I fix `Error: package.json error: can't find starting script`?"

Nodejitsu requires a starting script in the package.json to know which script to run to start your application. You need to make sure that the scripts.start field in your package.json points to the correct starting script.

A common issue is using "node app" as the value of scripts.start in your package.json. This won't work on Nodejitsu because the file extension is not specified. You'll need to do something along the lines of "node app.js".
# Support
<a name='support'></a>

Nodejitsu has a team of developers standing by to assist users with any issues
they may come across while deploying and administrating their web applications
on the Nodejitsu platform. Nodejitsu strives to have a lightning-fast
turnaround on all issues you may have!

The following can be extremely helpful for the support team if you have them ahead of time:

1. username/appname.
1. A [gist](https://gist.github.com/) of your package.json file.
1. A [gist](https://gist.github.com/) of your command/action and error output.
1. Versions of tools and apps; `jitsu -v`, `node -v`, `npm -v`.
1. The platform you are working on--Linux, Mac, Windows, etc.

## E-mail

You can also contact us via email, at
**[support@nodejitsu.com](email:support@nodejitsu.com)**.

## IRC and Kohai

Nodejitsu has a channel on freenode at
<a href="irc://irc.freenode.net/#nodejitsu">irc://irc.freenode.net/#nodejitsu</a>
([http://webchat.jit.su](http://webchat.jit.su)), where Nodejitsu
staff are standing by to support users around the clock. Drop by to ask
questions, get assistance, or even just to hang out!

[Kohai](https://github.com/nodejitsu/kohai) is an IRC bot that has some basic abilities
to help you among other features. To bring up his help dialogue just type `!help` into
the #nodejitsu channel and Kohai will message you.

## Github Issues

Each of Nodejitsu's open source projects uses Github Issues to manage bugs and
related software problems. Github Issues is most useful for developers. For
example, if a developer finds a bug in our open-source
[http proxy](https://github.com/nodejitsu/node-http-proxy), they can submit an
issue at <https://github.com/nodejitsu/node-http-proxy/issues> and tell us about
their bug.
