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
and [MongoHQ](https://www.mongohq.com).

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
will supply a connection string for your new mongo database on mongohq:

    info:   Welcome to Nodejitsu user
    info:   It worked if it ends with Nodejitsu ok
    info:   Executing command databases create mongo myMongo
    info:   Database myMongo was created.
    info:   Database name: myMongo
    info:   Database type: mongo
    info:   Connection url: mongodb://nodejitsu:pass@subdomain.mongohq.com:10057/somedatabase
    info:   Nodejitsu ok

You can connect to this using the `mongo` CLI client tool like so:

    $ mongo subdomain.mongohq.com:100027/somedatabase -u nodejitsu -p pass

or with the `mongodb-native` module:

    var mongodb = require('mongodb');
    var db = new mongodb.Db('somedatabase',
      new mongodb.Server('subdomain.mongohq.com', 10027, {})
    );
    db.open(function (err, db_p) {
      if (err) { throw err; }
      db.authenticate('nodejitsu', 'pass', function (err, replies) {
        // You are now connected and authenticated.
      });
    });

or with mongoose:

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://nodejitsu:pass@subdomain.mongohq.com:10057/somedatabase');

You can copy-paste this url directly into your mongo library's connect method.
For example, in [Mongoose](https://github.com/learnboost/mongoose/):

    var mongoose = require('mongoose');
    mongoose.connect("mongodb://nodejitsu:pass@staff.mongohq.com:10057/");

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

**Note:** You have to explicitly tell `node_redis` to use its javascript parser instead of the one written in C, because the latter
is causing problems on nodejitsu. Check out the other possible options in the [node redis docs](https://github.com/mranney/node_redis#rediscreateclientport-host-options).

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

