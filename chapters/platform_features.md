<a name='features' />
# Features of the Nodejitsu Platform

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
For example, in Mongoose:

    var mongoose = require('mongoose');

    mongoose.connect("mongodb://nodejitsu:pass@staff.mongohq.com:10057/");

Now you're connected to your database!

## Addons

Addons add functionality to your apps by extending and adding features to
Nodejitsu's platform and integrating third party services. For instance,
one of our addons provides powerful [Mailchimp](http://mailchimp.com)-based
[mailing list management](#apx:mailchimp).

## Marketplace

The Marketplace is an online store where you can browse ready to deploy
Node.js Applications. The Marketplace is a great place to start if you are new
to Node.js development or want to share your existing Node.js Application with
the world.
