Nodejitsu provides a web API for developers who want to interact with the Nodejitsu platform programatically. This API is built to be [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) and communicates via [JSON]. The API is the most low-level way of interacting with the Nodejitsu platform. For most deployment scenarios you should use our command line tool, [jitsu], the [online administrative interface][webops], or use our [WebHook API][webhooks] when integrating with third party services.

<hr>
## API Clients

Nodejitsu has a JSON API client for node.js, which may be found at [github.com/nodejitsu/nodejitsu-api](https://github.com/nodejitsu/nodejitsu-api) (along with API clients in other languages as they are developed). 

`jitsu` is implemented by using the node.js API client.

<hr>
## Authentication

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the API, [jitsu], or just by visiting [nodejitsu.com][nodejitsu]. 

Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) and Token authentication.

Here is an example using the command line utility with Basic authentication,
[curl]:

     // get all applications for User "Marak"
     curl --user Marak:password https://api.nodejitsu.com/apps/marak

Token authentication works the same way but instead of providing a password you need to provide an API token. Even though you can authenticate with an API token it does restrict access to your user profile, password, etc for security reasons.

<hr>
## Applications

Applications are the core of the Nodejitsu API. Each application represents a set of Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings and authors. For more information about the `package.json` format see: [package.json](http://package.json.jit.su)

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

<hr>
## Snapshots

Application snapshots are kept so you can keep track of each of your deployments. You can use [jitsu], or our [online administrative interface][webops] to revert to a specific snapshot, or download the code you have running in the server.

### Make an existing snapshot the active app
    POST /apps/:user-id/:app-id/snapshots/:id/activate

### Activate / Deploy a snapshot
    POST /apps/:user-id/:snapshots/:id

### Show a catalog of all Snapshot for an Application
    GET /apps/:user-id/:app-id/snapshots

### Show the contents of a Snapshot
    GET /apps/:user-id/:app-id/snapshots/:id

<hr>
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

### Get User API Tokens

    GET /users/:user-id/tokens

### Delete an API Token

    DELETE /users/:user-id/tokens/:token-id

<a name="create-an-api-token"></a>
### Create an API Token

    PUT /users/:user-id/tokens

### Get User Third Party Tokens

Users sometimes need Nodejitsu to store an authorization token for a service they want us to use for them. e.g. For us to deploy a private repository you have in Github we need you to give Nodejitsu access to your github account.

Third Party tokens serve this purpose. The current supported providers are:

* [Github](http://github.com)

```
GET /users/:user-id/thirdparty
```

### Delete an Third Party Token

    DELETE /users/:user-id/thirdparty/:token-id

### Create an Third Party Token

Token and provider are mandatory

    POST /users/:user-id/thirdparty
    {
      token: "SEVMTE8gWUVTIEkgQU0gRE9HCg", // mandatory
      provider: "github", // mandatory
      id: "a string id 123" // optional, helps humans identify the key
    }

<hr>
## Databases

### Create a new Database

     POST /databases/:user-id/:database-id
     {
       type: "couch" || "redis" || "mongo" || "mongohq" || "redistogo"
     }

### Get information about a Database

    GET /databases/:user-id/:database-id

### Delete a Database

    DELETE /databases/:user-id/:database-id

<hr>
## Logging

Nodejitsu provides integrated logging solutions for your applications. Your logs are always saved and ready to be retrieved.

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


[jitsu]: http://github.com/nodejitsu/jitsu
[JSON]: http://en.wikipedia.org/wiki/JSON
[webops]: https://webops.jit.su
[webhooks]: https://webhooks.nodejitsu.com
[nodejitsu]: http://nodejitsu.com
[curl]: http://curl.haxx.se/

[meta:title]: <> (JSON API)