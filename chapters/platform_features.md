<a link='#features' />
# Features of the Nodejitsu Platform

## Introduction

The Nodejitsu platform makes writing and deploying web applications a snap!
In addition to simple yet powerful tools for deployment, the Nodejitsu platform
also has snapshot management, database hosting and connectivity, and a
marketplace!

There are three main tools for deploying applications to Nodejitsu:

<!--Make sure that all these links point to the proper URLs-->
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
[Nodejitsu Web Application](#webapp), or Nodejitsu's [API](#api).


### Existing Databases

If you already have an externally hosted Database, Nodejitsu is capable of
connecting to it. We've got Database hosting if you need it, but we fully
support externally hosted Databases.

<!--TODO: Describe existing database functionality.-->

### Connecting Applications to Databases

If you want to connect a Database to your Node.js application, Nodejitsu
provides you with sample code for each Database type as well as the ability to
specify database connection strings in your application's package.json.

<!--TODO: Describe the database connecting functionality.-->

<!-- ## Marketplace -->

<!-- TODO: Describe the marketplace! -->
