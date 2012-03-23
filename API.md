# JSON API
<a name='api'></a>

Nodejitsu provides a web API for developers who want to interact with the
Nodejitsu platform programatically. This API is built to be
[RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) and
communicates via [JSON](http://en.wikipedia.org/wiki/JSON). The API is the most
low-level way of interacting with the Nodejitsu platform. For most deployment
scenarios you should use our command line tool, [jitsu](#jitsu), or the
[online administrative interface](#webapp).

## API Clients

Nodejitsu has a JSON API client for node.js, which may be found [here](https://github.com/nodejitsu/nodejitsu-api) (along with API clients in other languages as they are developed). Jitsu is implemented by using the node.js API client.

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the API, the [jitsu CLI](#jitsu), or just by visiting [http://nodejitsu.com](http://nodejitsu.com). Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). If you haven't used Basic Auth before, don't fret; it's easy! 

Here is an example using the command line utility,
[Curl](http://curl.haxx.se/):

     // get all applications for User "Marak"
     curl --user Marak:password http://api.nodejitsu.com/apps/marak

## Applications

Applications are the core of the Nodejitsu API. Each application represents a set of Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings and authors. For more information about the package.json format see: [package.json](#package_json)

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

