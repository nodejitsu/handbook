# Features of the Nodejitsu Platform

## Deployment
## Snapshots
## Databases
## Marketplace

# The Jitsu Client

<!--
This section is going to repeat stuff from the tutorial. Unfortunate, perhaps,
but I think this is for the best as these sections should be standalone.
-->

<!--
That said, this should be rewritten so it's not *exactly* the same copy. In fact
some of the material from the tutorial could be streamlined as the rest is
here anyway.
-->

[`jitsu`](http://github.com/nodejitsu/jitsu) is a
[Command Line Interface (CLI)](http://en.wikipedia.org/wiki/Command-line_interface)
for interacting with the Nodejitsu platform. It's open-source and easy to use.
We've designed Jitsu to be suitable for command line beginners, but still be
powerful and extensible enough for production usage.

## Installation

`jitsu` is distrubited using the Node Package Manager (npm). Installing `jitsu`
with npm is a snap:

     [sudo] npm install -g jitsu

This command installs `jitsu` on the system globally.

## Usage

Commands for `jitsu` follow this pattern:

    jitsu <resource> <action> <param1> <param2> ...

For example, in `jitsu apps deploy`, "apps" is the resource and "deploy" is the
action.

<!-- alphabetize these? Also, is ### appropriate? -->

### `jitsu deploy` (`jitsu apps deploy`)

`jitsu deploy` will attempt to deploy the application in the current directory
to [Nodejitsu](http://nodejitsu.com). It deploys your application using the
following steps:

1. Creates the application (if necessary)
2. Creates or validates the package.json
3. Packages and creates a new snapshot
4. Stops the application (if neccessary)
5. Starts the application

### `jitsu create` (`jitsu apps create`)

<!--Discuss the package.json behavior in depth.-->
`jitsu create` will create a new application. This entails generating a
package.json for your app, for the purposes of deployment.

### `jitsu list` (`jitsu apps list`)

`jitsu list` lists your applications, as well as their respective states,
subdomains, entry points and latest snapshots.

<!-- Screenshot -->

### `jitsu apps <action>`

In addition to the commands aliased to `jitsu create`, `jitsu deploy` and 
`jitsu list`, the `apps` resource contains a number of other actions.

#### `jitsu apps view <name>`:

Lists the information for the application in the current directory. If `<name>`
is supplied, then that application's information is listed instead.

#### `jitsu apps update <name>`:

<!-- What does this do, exactly? I'm not sure. -->

Updates the application in the current directory with the information in the
`package.json` file. If `<name>` is supplied, the application with `<name>` is
updated instead.

#### `jitsu apps destroy <name>`

<!-- We need to elaborate on what "destroying" an app means. -->

Destroys the application in the current directory. If `<name>` is supplied then that application is destroyed instead.

<!-- We also need to elaborate on what start/stop/restart means. -->

#### `jitsu apps start <name>`

Starts the application in the current directory. If `<name>` is supplied then
that application is started instead.

#### `jitsu apps restart <name>`

Restarts the application in the current directory. If `<name>` is supplied then
that application is restarted instead.

#### `jitsu apps stop <name>`

Stops the application in the current directory. If `<name>` is supplied then
that application is stopped instead.

### `jitsu config <action>`

`jitsu config` commands allow you to edit your local jitsu confuration file.

#### `jitsu config list`

Lists all configuration values currently set for the user.

#### `jitsu config set <key> <value>`

Sets the specified `<key>`/`<value>` pair in the jitsu configuration.

#### `jitsu config get <key> <value>`

Gets the specified `<key>`/`<value>` pair in the jitsu configuration.

#### `jitsu config delete <key>`

Deletes the specified `<key>` in the jitsu configuration.

### `jitsu help <resource> <action>`

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

If no
resource and/or action are specified, then `jitsu help` alone will describe
what resources are available.

## `jitsu snapshots`

<!--Elaborate on what, exactly, snapshots are.-->

`jitsu snapshots *` commands allow you to work with snapshots
for your Applications on Nodejitsu. Snapshots are images of your
Application's code that are deployed to the Nodejitsu Platform.

For commands that take a `<name>` parameter, if no parameter
is supplied, `jitsu` will attempt to read the package.json
from the current directory.

<!--stub out!-->
#### `jitsu snapshots create`
#### `jitsu snapshots list`
#### `jitsu snapshots list <app-name>`
#### `jitsu snapshots activate`
#### `jitsu snapshots activate <app-name>`
#### `jitsu snapshots destroy`
#### `jitsu snapshots destroy <app-name>`

### `jitsu users`


`jitsu users *` commands allow you to work with new or existing Nodejitsu user
accounts. You will be prompted for additional user information as required.

<!--stub out!-->
#### `jitsu users create <username>`
#### `jitsu users available <username>`
#### `jitsu users confirm <username>`
#### `jitsu users logout` (`jitsu logout`)

## .jitsuconf file

All configuration data for your local `jitsu` install is located in the *.jitsuconf* file located in your home directory. Directly modifying this file is not advised. You should be able to make all configuration changes using `jitsu config`.

# Web Admin

<!--STUB OUT!-->

# JSON API

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

## Marketplace

The Marketplace is an online store where you can browse ready to deploy Node.js Applications. The Marketplace is a great place to start if you are new to Node.js development or want to share your existing Node.js Application with the world.


#### Get all Marketplace Applications

    GET /marketplace

#### Get a specific Marketplace Application

    GET /databases/:user-id/:id

# Haibu

<!--basically a copy-paste job from the haibu docs-->
`haibu` is the open-source node.js project for spawning and managing several
node.js applications on a single server. It's an integral part of Nodejitsu's
production stack and is fully supported by a dedicated team of core node.js
developers.

<!--
This is what's *interesting* about haibu, and why it's documented here. I want
to really drive this home.
-->
By installing `haibu`, a user creates a development environment for themselves
that mirrors the functionality of Nodejitsu's cloud platform.

<!--
This is a stub, mostly because haibu's documentation is still "in the works"
from what I can tell.
-->
