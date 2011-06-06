<a name="Using_The_API"></a>
# Using The API

Nodejitsu provides a web API for developers who want to interact with the Nodejitsu platform programatically. This API is built to be [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) and communicates via [JSON](http://en.wikipedia.org/wiki/JSON). The API is the most low-level way of interacting with the Nodejitsu platform. For most deployment scenarios you should use our command line tool, [jitsu](#Using_The_Jitsu_Client), or login directly at [http://nodejitsu.com](http://nodejitsu.com)

- [Applications](#Applications)
- [Snapshots](#Snapshots)
- [Users](#User)
- [Databases](#API_Databases)
- [Logging](#Logging)
- [Marketplace](#Marketplace)

The documentation here should be an accurate representation of our current API, but you can always look directly at our [API wrappers](https://github.com/nodejitsu/jitsu/tree/master/lib/jitsu/api) in `jitsu` to see a working example of an application built against Nodejitsu's REST API.

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the User API, the Jitsu CLI, or just by visiting [http://nodejitsu.com](http://nodejitsu.com). Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). If you haven't used Basic Auth before don't fret, it's easy! 

**Here is an example using the command line utility, [Curl](http://curl.haxx.se/).**

     // get all applications for User "Marak"
     curl --user Marak:password http://nodejitsu.com/apps/marak

If you are trying to use our API directly and are having issues with Basic Auth, please feel free to email [support@nodejitsu.com](mailto:support@nodejitsu.com)

<a name="Applications"></a>
## Applications

Applications are the core of the Nodejitsu API. Each application represents a set of Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings, authors, etc. For more information about the package.json format see: [package.json](#package_json)

#### Get all Applications for a User
    
     GET /apps/:user-id

#### Create a new Application

     POST /apps/:user-id
     { package.json }

#### Start an Application

     POST /apps/:user-id/:app-id/start

#### Stop an Application
     
     POST /apps/:user-id/:app-id/stop

#### Restart an Application
     
     POST /apps/:user-id/:app-id/restart

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

All User accounts must be confirmed. When a new User is created, a confirmation email will be sent to the email address associated with that user. In this email there will be an invite code. This code must be sent to the API to confirm the account. 

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

Databases are an integral part of most applications. The Nodejitsu API allows you to dynamically create new hosted database instances for your applications. Cloud database hosting is provided by: CouchOne, Redis2Go and MongoHQ.

#### Create a new Database

     POST /databases/:user-id/:database-id
       
     {
       type: "Couch || Redis || Mongo"
     }

#### Get information about a Database

    GET /databases/:user-id/:database-id

#### Delete a Database

    DELETE /databases/:user-id/:database-id

<a name="Logging"></a>

## Logging

Logging is a very important feature in any professional grade Node.js application. Nodejitsu provides integrated logging solutions for your applications. Your logs are always saved and ready to be retrieved. TODO: add better description on logging

#### Get all logs for a user

     GET /logs/:user-id/

#### Get logs for a specific application

     GET /logs/:user-id/:app-id

<a name="Marketplace"></a>

## Marketplace

The Marketplace is an online store where you can browse ready to deploy Node.js Applications. The Marketplace is a great place to start if you are new to Node.js development or want to share your existing Node.js Application with the world.


#### Get all Marketplace Applications

    GET /marketplace

#### Get a specific Marketplace Application

    GET /databases/:user-id/:id

