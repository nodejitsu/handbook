# Using The API

Nodejitsu provides a web API for users who want to interact with the Nodejitsu platform programatically. This API is built to be RESTful and communicates via JSON.

- [Application](#Applications)
- [Deployment](#Deployment)
- [User](#User)
- Database
- Logging

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. Currently, we are using Basic Authentication. 

     Here is an example of using basic auth with curl

If you do not have an account it is possible to create one using the User API, Jitsu, or just by visiting http://nodejitsu.com

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


### Snapshots
---

Snapshots are an easy way to capture the current state of your application. Once a Snapshot of your application is created you can roll back and activate that Snapshot at any time. 

#### Make an existing snapshot the active app
    PUT /apps/:user-name/:app-name/snapshots/:id/active

#### Deploy a snapshot
    POST /apps/:user-name/:snapshots/:id

#### Show a catalog of all snapshots
    GET /apps/:user-name/:app-name/snapshots

#### Show the contents of a snapshot
    GET /apps/:user-name/:app-name/snapshots/:id


## Users

<a name="Users"/>


#### Signup as a new User

#### Confirm a User account

#### Update User


## Users

### Signing up a new user

### Confirming a User

### Updating a User

## Deployment

## Logging

## Get all logs for a user or for an app
GET /logs/:user-name/

## Get logs for a specific application
GET /logs/:user-name/:app-name



- Application
- Deployment
- User
- Database
- Logging

