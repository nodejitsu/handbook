<a name="Using_The_API"></a>
# Using The API

Nodejitsu provides a web API for users who want to interact with the Nodejitsu platform programatically. This API is built to be RESTful and communicates via JSON.

- [Applications](#Applications)
- [Snapshots](#Snapshots)
- [Users](#User)
- [Databases](#Database)
- [Marketplace](#Marketplace)
- [Logging](#Logging)

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the User API, the Jitsu CLI, or just by visiting [http://nodejitsu.com](http://nodejitsu.com). Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). If you haven't used Basic Auth before don't fret, it's easy! 

**Here is an example using the command line utility, [Curl](http://curl.haxx.se/).**

     // get all applications for User "Marak"
     curl --user Marak:password http://nodejitsu.com/apps/marak

<a name="Applications"></a>
## Applications

Applications are the core of the Nodejitsu API. Each application represents a set Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings, authors, etc. For more information about the package.json format see: LINKTO: package.json docs

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

#### Signup a new User

     TODO:

#### Confirm a User account

     TODO:

#### Update User

     TODO:

<a name="Databases"></a>

## Databases

#### Create a new Database

     POST /databases/:user-id/:id
       
     {
       type: "Couch || Redis || Mongo"
     }

#### Get information about a Database

    GET /databases/:user-id/:id

#### Delete a Database

    DELETE /databases/:user-id/:id

<a name="Marketplace"></a>

## Marketplace

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

