
# The Nodejitsu Handbook

*A gentle introduction to the art of Nodejitsu*

Welcome to the Nodejitsu handbook. This document will help familiarize you with Nodejitsu while also providing detailed information about specific platform features. This is a living document which you can submit patches to @ [http://github.com/nodejitsu/handbook](http://github.com/nodejitsu/handbook).

## What Is Nodejitsu?

[Nodejitsu](http://nodejitsu.com/) is a Platform as A Service for Node.js applications. Nodejitsu allows you to seamlessly deploy your Node.js applications into the cloud with a myriad of additional features. Nodejitsu's platform provides a robust suite of functionality to assist in the development, management, and deployment of Node.js applications.

## How Can I Get Started?

So you wish to learn the ways of Nodejitsu? Excellent! Reading this sentence is the first step! Below, you will find the Table Of Contents which provides an overview of the systems which comprise Nodejitsu. We suggest starting at [Deploying Applications](#Deploying_Applications). You can also always visit our website at [http://nodejitsu.com](http://nodejitsu.com). Good Luck!



# Table of Contents

- [Deploying Applications](#Deploying_Applications)
- [Using the Jitsu Client](#Using_The_Jitsu_Client)
    - Installation
    - Usage
- [Using the API](#Using_The_API)
    - [Applications](#Applications)
    - [Snapshots](#Snapshots)
    - [Users](#User)
    - [Databases](#Databases)
    - [Marketplace](#Marketplace)
    - [Logging](#Logging)
- [Using Databases](#Using_Databases)
    - Creating new Databases
    - Connecting existing Databases
- [Nodejitsu's Open-source Projects](#Open_source_Projects)
    - Why open-source
    - Where to find
    - How to contribute

<a name="Deploying_Applications"></a>
# Deploying Applications

## Deploying from the Samurai web admin

The Samurai web admin is an easy to use web-site where you can manage and deploy your Node.js applications. Simply visit [http://www.nodejitsu.com](http://www.nodejitsu.com) and sign-in. You'll be taken directly to the Samurai web admin interface.

     TODO: Add screen shot of Samurai interface

## Deploying from Jitsu, The Nodejitsu Command Line Tool 

If you prefer a CLI ( Command Line Interface ) instead of a web-site you can download [Jitsu](#Using_The_Jitsu_Client), The Nodejitsu CLI tool. Jitsu is friendly to non-technical users, but it does cover our entire [API](#API) and it's fully open-source for the more advanced Node.js user. 

## Deploying from the API

If you are an advanced user, you might want to automate your deployment using scripts instead of manually deploying your application from Samurai or Jitsu. Nodejitsu provides a [high-level JSON API](#Using_The_API) which will allow you to deploy applications as well as many other features. 

You can see a detailed specification of the [high-level JSON API](#Using_The_API) here.

<a name="Using_The_Jitsu_Client"></a>

# Using The Jitsu Client

[Jitsu](http://github.com/nodejitsu/jitsu) is a [Command Line Tool (CLI)](http://en.wikipedia.org/wiki/Command-line_interface) for interacting with the Nodejitsu platform. It's open-source and easy to use. We've designed Jitsu to be suitable for command line beginners, but still be powerful and extensible enough for production usage. If you aren't a fan of the command line or don't have terminal access, you can still do everything Jitsu can do through our web admin, [Samurai](#Samurai). 

## Installation

     [sudo] npm install jitsu
     
## Usage

     jitsu help
     
Jitsu is mostly self-documenting. For additional resources you can visit it's source code repository located @ [http://github.com/nodejitsu/jitsu](http://github.com/nodejitsu/jitsu).
<a name="Using_The_API"></a>
# Using The API

Nodejitsu provides a web API for users who want to interact with the Nodejitsu platform programatically. This API is built to be [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) and communicates via [JSON](http://en.wikipedia.org/wiki/JSON).

- [Applications](#Applications)
- [Snapshots](#Snapshots)
- [Users](#User)
- [Databases](#API_Databases)
- [Marketplace](#Marketplace)
- [Logging](#Logging)

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the User API, the Jitsu CLI, or just by visiting [http://nodejitsu.com](http://nodejitsu.com). Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). If you haven't used Basic Auth before don't fret, it's easy! 

**Here is an example using the command line utility, [Curl](http://curl.haxx.se/).**

     // get all applications for User "Marak"
     curl --user Marak:password http://nodejitsu.com/apps/marak

TODO: add example of what raw outgoing http request should look like

<a name="Applications"></a>
## Applications

Applications are the core of the Nodejitsu API. Each application represents a set of Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings, authors, etc. For more information about the package.json format see: LINKTO: package.json docs

#### Get all applications for a User
    
     GET /apps/:user-id

#### Create a new Application

     POST /apps/:user-id
     { package.json }

#### Start an Application

     POST /apps/:user-id/:app-id/restart

#### Stop an Application
     
     POST /apps/:user-id/:app-id/start

#### Restart an Application
     
     POST /apps/:user-id/:app-id/stop

#### Update an Application

     PUT /apps/:user-id
     { package.json }

#### Delete an Application

     DELETE /apps/:user-id/:app-id/remove

<a name="Snapshots"></a>

## Snapshots

Snapshots are an easy way to capture the current state of your application. Once a Snapshot of your application is created you can roll back and activate that Snapshot at any time. 

#### Make an existing snapshot the active app
    PUT /apps/:user-id/:app-id/snapshots/:id/active

#### Activate / Deploy a snapshot
    POST /apps/:user-id/:snapshots/:id

#### Show a catalog of all Snapshot for an Application
    GET /apps/:user-id/:app-id/snapshots

#### Show the contents of a Snapshot
    GET /apps/:user-id/:app-id/snapshots/:id

<a name="Users"></a>

## Users

#### Create a new User / Sign-up for a free Nodejitsu account

Email address is the only required field.

     POST /users/:user-id
     {
       email: "youremail@theinternet.com"
     }

#### Confirm a User account

All User accounts must be confirmed. When a new User is created, a confirmation email will be sent to the email address associated with that user. In this email address, you will receive an invite code. This code must be sent to the API to confirm the account. 

    POST /users/:user-id
    {
      inviteCode: "SecretCode"
    }

#### Update User

    PUT /users/:user-id
    {
      password: "new_password"
    }
     
<a name="Databases"></a>

## Databases

In integral part to most applications. The Nodejitsu API allows you to dynamically create new hosted database instances for your applications. Cloud database hosting is provided by: CouchOne, Redis2Go, MongoHQ.

#### Create a new Database

     POST /databases/:user-id/:database-id
       
     {
       type: "Couch || Redis || Mongo"
     }

#### Get information about a Database

    GET /databases/:user-id/:database-id

#### Delete a Database

    DELETE /databases/:user-id/:database-id

<a name="Marketplace"></a>

## Marketplace

The Marketplace is an online store where you can browse ready to go Node.js Applications and clone and deploy your own copy in seconds. The Marketplace is a great place to start if you are new to Node.js development or want to share your existing Node.js Application with the world.


#### Get all Marketplace Applications

    GET /marketplace

#### Get a specific Marketplace Application

    GET /databases/:user-id/:id

<a name="Logging"></a>

## Logging

#### Get all logs for a user

     GET /logs/:user-id/

#### Get logs for a specific application

     GET /logs/:user-id/:app-id

<a name="Using_Databases"></a>

# Using Databases

Nodejitsu Node.js applications are ready to be connected to any database. If you have already have a database running, Nodejitsu can connect to your pre-existing database. If you require a new database, Nodejitsu can provide you FREE instances of several different types of databases. These free instances are great for development purposes or hobby sites. If you require a high traffic or production database, we provide an easy upgrade path with our database hosting.

## Creating new Databases

If you require database hosting, you can create a new database instance of any of our supported databases using Samaruai, Jitsu, or our API.


## Existing Databases

If you already have an externally hosted Database, Nodejitsu is capable of connecting to it. We've got Database hosting if you need it, but we fully support externally hosted Databases. 

## Connecting Applications to Databases

If you want to connect a Database to your Node.js application, Nodejitsu provides you with sample code for each Database type as well as the ability to specify database connection strings in your application's package.json


<a name="#Open_source_Projects"></a>
# Open-source Projects

## Why open-source

A lot of Nodejitsu's technology stack is released as open-source software. We choose to do this for many reasons. Aside from being able to give back to the very awesome Node.js community, releasing pieces of our stack as open-source allows other developers to review and improve our software. We've already received invaluable contributions to our platform from developers who would have never seen our code if we had not open-sourced it.

## Where to find

Nodejitsu hosts it's open-source projects on [Github.com](http://github.com). Github is website for sharing and collobrating on source code. You can get source code without creating an account and if you want to create an account it's free. You'll need a [Git](http://gitscm.org/) client if you wish to check out any of our code repositories. 

You can visit our open-source project directory at: [http://github.com/nodejitsu](http://github.com/nodejitsu)

## How to contribute

Anyone can contribute to any Nodejitsu open-source projects at anytime. [Github](http://github.com/nodejitsu) has the facilities for managing patches, issues, code comments, version control, etc. If you aren't ready to submit code or have questions you can create a Github issue or even just send an email to the Node.js mailing list. We'll make sure one our Ninja's gets back to you soon.