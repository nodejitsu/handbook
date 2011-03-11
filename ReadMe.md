
# The Nodejitsu Handbook

*A gentle introduction to the art of Nodejitsu*

### Table of Contents

- [Introduction](1_Introduction.md)
   - [What Is Nodejitsu?]()
   - [How Can I Get Started?]()
- [Deploying Applications](2_Deploying_Applications.md)
   - [Deploying from the Samurai web admin]()
   - [Deploying from Jitsu, The Nodejitsu Command Line Tool]()
   - [Deploying from the API]()
- [Using the Jitsu Client](4_Using_The_Jitsu_Client.md)
    - [Installation]()
    - [Usage]()
- [Using the API](5_Using_The_API.md)
    - [Applications](#Applications)
    - [Snapshots](#Snapshots)
    - [Users](#User)
    - [Databases](#Database)
    - [Marketplace](#Marketplace)
    - [Logging](#Logging)
- [Databases](3_Setting_Up_Databases.md)
    - Creating new Databases
        - [CouchDB]()
        - [Redis]()
        - [MongoDB]()
    - Connecting existing Databases
- [The MarketPlace](6_The_Marketplace.md)
   - Deploying a Marketplace Application
   - Getting your Application on the Marketplace
- [Add-Ons](7_Add_Ons.md)
    - MailChimp
    - Cloud9
    - Adding your service as an add-on
- [Nodejitsu's Open-source Projects](8_Open_source_Projects.md)
    - Why open-source?
    - Where to find
    - How to contribute



# Introduction

Welcome to the Nodejitsu handbook. This document will help familiarize you with Nodejitsu while also providing detailed information about specific platform features. This is a living document which you are free to submit patches to @ [http://github.com/nodejitsu/handbook]([http://github.com/nodejitsu/handbook).

- What Is Nodejitsu?
- How Can I Get Started?

## What Is Nodejitsu?

[Nodejitsu](http://nodejitsu.com/) is a Platform as A Service for Node.js applications. Nodejitsu allows you to seamlessly deploy your Node.js applications into the cloud. Nodejitsu's platform provides a robust suite of functionality to assist in the development, management, and deployment of Node.js applications.

## How Can I Get Started?

So you wish to learn the ways of Nodejitsu? Excellent! The first step is checking out the [Table of Contents](0_Table_Of_Contents.md). Here you will find a overview of the systems which comprise Nodejitsu. We suggest starting at [Deploying Applications](2_Deploying_Applications.md). You can also always visit our website at [http://nodejitsu.com](http://nodejitsu.com).


# Deploying Applications

TODO: add overview

- [Deploying from the Samurai web admin](#Samurai)
- [Deploying from Jitsu, The Nodejitsu Command Line Tool](#Jitsu) 
- [Deploying from the API](#API)

<a name="Samurai"/>

## Deploying from the Samurai web admin

The Samurai web admin is an easy to use web-site where you can manage and deploy your node.js applications. Simply visit www.nodejitsu.com and sign-in. You'll be taken directly to the Samurai web admin interface.

<a name="Jitsu"/>

## Deploying from Jitsu, The Nodejitsu Command Line Tool 

If you prefer CLI ( Command Line Interface ) tools over web-sites you can download Jitsu, The Nodejitsu CLI tool. Jitsu is friendly to non-technical users, but it does cover our entire [API](API) and it's fully open-source for the more advanced node.js user. 

### Additional Jitsu resources

<a name="API"/>

## Deploying from the API

If you are an advanced user, you might want to automate your deployment using scripts instead of manually deploying your application using Samurai or Jitsu. Nodejitsu provides a high-level JSON API which will allow you to deploy applications, as well as many other features. 

     // curl code for deploying a new app
     
You can see a detailed specification of the API here: LINKTO: api docs



# Setting Up A Database For Your Application

Nodejitsu has several Node.js friendly databases ready to be used by your application. If you have already have a database running, Nodejitsu can connect to your pre-existing database. If you require a new database, Nodejitsu can provide you FREE instances of several different types of databases. These free instances are great for development purposes or hobby sites. If you require a high traffic or production database, we provide an easy upgrade path with our partners such as Redis2Go, CouchOne, and MongoHQ. 

- Creating new Databases
    - [CouchDB]()
    - [Redis]()
    - [MongoDB]()
- Connecting existing Databases
    
## Creating new Databases

If you require database hosting, you can create a new database instance of any of our supported databases using Samaruai, Jitsu, or our API.

### CouchDB

    TODO: add section

### Redis

    TODO: add section

### MongoDB

    TODO: add section

## Existing Databases

If you already have an externally hosted Database, Nodejitsu is capable of connecting to it. We've got Database hosting if you need it, but we fully support externally hosted Databases.

## Connecting Applications to Databases

If you want to connect a Database to your Node.js application, Nodejitsu provides you with sample code for each Database type as well as the ability to specify database connection strings in your application's package.json




# Using The Jitsu Client

Jitsu is a Command Line Tool (CLI) for interacting with the Nodejitsu platform. It's open-source and easy to use. We've designed Jitsu to be suitable for command line beginners, but still be powerful and extensible enough for production usage. If you aren't a fan of the command line, you can still pretty much do everything Jitsu can do through our web interface, Samurai. 

- [Installation]()
- [Usage]()

## Installation

     TODO: add section

## Usage

     TODO: add section


# Using The API

Nodejitsu provides a web API for users who want to interact with the Nodejitsu platform programatically. This API is built to be RESTful and communicates via JSON.

- [Applications](#Applications)
- [Snapshots](#Snapshots)
- [Users](#User)
- [Databases](#Database)
- [Marketplace](#Marketplace)
- [Logging](#Logging)

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. Currently, we support Basic Authentication. 

     TODO: Here is an example of using basic auth with curl

If you do not have an account it is possible to create one using the User API, Jitsu, or just by visiting [http://nodejitsu.com](http://nodejitsu.com)

<a name="Applications"/>
## Applications

#### Get all applications for a User
    
     GET /apps/:user-id

#### Create a new Application

     POST /apps/:user-id
     { package.json }

#### Start an Application

     POST /apps/:user-name/:app-name/restart

#### Stop an Application
     
     POST /apps/:user-name/:app-name/start

#### Restart an Application
     
     POST /apps/:user-name/:app-name/stop

#### Update an Application

     PUT /apps/:user-id
     { package.json }

#### Delete an Application

     DELETE /apps/:user-name/:app-name/remove

<a name="Snapshots"/>

## Snapshots

Snapshots are an easy way to capture the current state of your application. Once a Snapshot of your application is created you can roll back and activate that Snapshot at any time. 

#### Make an existing snapshot the active app
    PUT /apps/:user-name/:app-name/snapshots/:id/active

#### Activate / Deploy a snapshot
    POST /apps/:user-name/:snapshots/:id

#### Show a catalog of all Snapshot for an Application
    GET /apps/:user-name/:app-name/snapshots

#### Show the contents of a Snapshot
    GET /apps/:user-name/:app-name/snapshots/:id

<a name="Users"/>

## Users

#### Signup a new User

     TODO:

#### Confirm a User account

     TODO:

#### Update User

     TODO:

<a name="Databases"/>

## Databases

#### Create a new Database

     POST /databases/:user-name/:id
       
     {
       type: "Couch || Redis || Mongo"
     }

#### Get information about a Database

    GET /databases/:user-name/:id

#### Delete a Database

    DELETE /databases/:user-name/:id

<a name="Marketplace"/>

## Marketplace

#### Get all Marketplace Applications

    GET /marketplace

#### Get a specific Marketplace Application

    GET /databases/:user-name/:id

<a name="Logging"/>

## Logging

#### Get all logs for a user
     GET /logs/:user-name/

#### Get logs for a specific application
     GET /logs/:user-name/:app-name



# The Marketplace

The Marketplace is an online store where you can browse ready to go Node.js Applications and clone and deploy your own copy in seconds. The Marketplace is a great place to start if you are new to Node.js development or want to share your existing Node.js Application with the world.

- Deploying a Marketplace Application
- Getting your Application on the Marketplace

## Deploying a Marketplace Application

You can deploy a ready to go application from the Marketplace is seconds and begin customize it for your needs immediately. Marketplace Applications can be configured through Samurai, Jitsu, or the API.

## Getting your Application on the Marketplace

    TODO: add section


# Add-Ons

TODO: add section

- MailChimp
- Add-Ons

## Deploying a Marketplace Application

    TODO: add section
    
## Getting your Application on the Marketplace

    TODO: add section


# Open-source Projects

TODO: add section

- Why open-source?
- Where to find
- How to contribute

## Why open-source

A lot of Nodejitsu's technology stack is released as open-source software. We choose to do this for many reasons. Aside from being able to give back to the very awesome Node.js community, releasing pieces of our stack as open-source allows other developers and users to review and improve our software. We've already received invaluable contributions to our platform from developers who would have never seen our code if we had not open-sourced it.

Releasing as open-source increases the quality of our software.


## Where to find

Nodejitsu hosts it's open-source projects on [Github.com](http://github.com). Github is website for sharing and collobrating on source code. You can get source code without creating an account, and if you want to create an account it's free. You'll need a [Git](http://gitscm.org/) client if you wish to check out any of our code repositories. 

You can visit our open-source project directory at: [http://github.com/nodejitsu](http://github.com/nodejitsu)

## How to contribute

Anyone can contribute to any Nodejitsu open-source projects at anytime. [Github](http://github.com/nodejitsu) has the facilities for managing patches, issues, code comments, version control, etc. If you aren't ready to submit code or have questions you can create a Github issue or even just send an email to the Node.js mailing list. We'll make sure one our Ninja's gets back to you soon.
