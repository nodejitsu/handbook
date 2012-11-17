# Nodejitsu Web-hook API

<a name="index"></a>
## Table of Contents
* [API Documentation](#api)
    * [Deploy](#deploy)
        * [Accept](#deploy-accept)
        * [Headers](#deploy-headers)
        * [Errors](#deploy-errors)
    * [Status](#status)
        * [Parameters](#status-qs)
        * [Headers](#status-headers)
        * [Errors](#status-errors)
    * [Changes](#changes)
        * [Parameters](#changes-qs)
        * [Headers](#changes-headers)
        * [Errors](#changes-errors)
    * [Auth](#auth)
        * [Parameters](#auth-qs)
        * [Headers](#auth-headers)
        * [Errors](#auth-errors)
* [Sample Payloads](#payloads)
    * [Travis](#payloads-travis)
    * [Github](#payloads-github)

<a name="api"></a>
## API Documentation

<a name="deploy"></a>
### Deploy

```
POST /
POST /1/deploy
```

Deploy a new application with a given payload. 

Check [Sample Payloads](#payloads) for examples. This method is normally called by a [github](http://help.github.com/post-receive-hooks) or [travis](http://about.travis-ci.org/docs/user/build-configuration) web-hook.

You must configure the github webhook to use the travis webhook. Works under the assumption that if your repository has a `.travis.yml` file and that contains at least one webhook notification we shouldn't deploy from the github request, but instead wait until travis triggers the notify event and calls our API. This effectively means that if travis tests don't pass your application does not get deployed.

```
curl -X POST -d @file https://user:pass@webhooks.nodejitsu.com/1/deploy
```

Authentication can use a pair of `user:pass` or `user:apiToken`.

<a name="deploy-accept"></a>
#### Accept

<table>
  <tr>
    <th>Content-type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>application/json</td>
    <td>A valid JSON payload</td>
  </tr>
</table>

<a name="deploy-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="deploy-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>deploy:db:failed_to_store_payload</td>
    <td>503</td>
    <td>Our database isn't responding or timed out</td>
  </tr>
  <tr>
    <td>deploy:provider:not_supported</td>
    <td>400</td>
    <td>You tried to deploy an invalid payload</td>
  </tr>
  <tr>
    <td>deploy:github:no_pkg_json</td>
    <td>502</td>
    <td>We couldn't get package.json from github. This may happen because you are trying to deploy a private repo</td>
  </tr>
  <tr>
    <td>deploy:auth:bad_creds</td>
    <td>401</td>
    <td>You didn't provide valid Basic Auth in your HTTP request</td>
  </tr>
  <tr>
    <td>deploy:github:download_tarball</td>
    <td>502</td>
    <td>Failed to get the tarball from github</td>
  </tr>
  <tr>
    <td>deploy:nodejitsu:upload_tarball</td>
    <td>502</td>
    <td>Failed to upload the tarball to nodejitsu</td>
  </tr>
  <tr>
    <td>deploy:tar:*</td>
    <td>500</td>
    <td>There was a system failure when extracting the tar</td>
  </tr>
  <tr>
    <td>deploy:nodejitsu:start_app</td>
    <td>500</td>
    <td>Failed to start nodejitsu application</td>
  </tr>
  <tr>
    <td>deploy:no_payload</td>
    <td>400</td>
    <td>You didn't provide a payload</td>
  </tr>
</table>

<a name="status"></a>
### Status

```
GET /1/status/:user/webhooks
GET /1/status/:user/webhooks/:application
```

Gets the install status for a specific user. Useful to determine if the deploy worked, or why it failed. `:user` is your nodejitsu username and `:application` is your application name.

```
curl https://dscape:password@webhooks.nodejitsu.com/1/status/dscape/webhooks/hello-world-api-flatiron?limit=10\&skip=20
```

<a name="status-qs"></a>
#### Query String Parameters

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>limit</td>
    <td>Integer</td>
    <td>Number of log entries to display per page</td>
  </tr>
  <tr>
    <td>skip</td>
    <td>Integer</td>
    <td>Number of log entries to skip. e.g. if you saw 10 already, you might do a skip=10</td>
  </tr>
</table>

<a name="status-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="status-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>mw:auth:not_you</td>
    <td>401</td>
    <td>You are trying to get status that don't belong to you</td>
  </tr>
  <tr>
    <td>mw:auth:auth_server_down</td>
    <td>500</td>
    <td>We couldn't verify your credentials</td>
  </tr>
  <tr>
    <td>mw:auth:unauthorized</td>
    <td>401</td>
    <td>Your username/password combination doesn't match our records</td>
  </tr>
  <tr>
    <td>mw:auth:no_username</td>
    <td>401</td>
    <td>Your user document is in a bad state, contact support</td>
  </tr>
  <tr>
    <td>status:db:not_found</td>
    <td>404</td>
    <td>Didn't find that log entry</td>
  </tr>
  <tr>
    <td>status:db:get_by_id</td>
    <td>500</td>
    <td>The database couldn't complete your query</td>
  </tr>
  <tr>
    <td>status:db:query_fail</td>
    <td>500</td>
    <td>The database couldn't complete your query</td>
  </tr>
</table>

<a name="changes"></a>
### Changes

```
GET /1/status/:user/changes/
GET /1/status/:user/changes/:id
```

Streams log files as you deploy application with a changes stream. When you provide an id it will just return that entry and close the http connection.

```
curl https://dscape:password@webhooks.nodejitsu.com/1/status/dscape/changes?include_docs=true
```

<a name="changes-qs"></a>
#### Query String Parameters

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>include_docs</td>
    <td>Boolean</td>
    <td>Will add an extra property `doc` (containing the full log document) to each log entry that is displayed. Use "auto" for automatically expanding errors and summarizing ok statuses</td>
  </tr>
</table>

<a name="changes-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="changes-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>mw:auth:not_you</td>
    <td>401</td>
    <td>You are trying to get status that don't belong to you</td>
  </tr>
  <tr>
    <td>mw:auth:auth_server_down</td>
    <td>500</td>
    <td>We couldn't verify your credentials</td>
  </tr>
  <tr>
    <td>mw:auth:unauthorized</td>
    <td>401</td>
    <td>Your username/password combination doesn't match our records</td>
  </tr>
  <tr>
    <td>mw:auth:no_username</td>
    <td>401</td>
    <td>Your user document is in a bad state, contact support</td>
  </tr>
  <tr>
    <td>status:db:query_fail</td>
    <td>500</td>
    <td>The database couldn't complete your query</td>
  </tr>
  <tr>
    <td>status:changes:timeout</td>
    <td>408</td>
    <td>The socket connection timeout. Please re-connect</td>
  </tr>
  <tr>
    <td>status:changes:fatal</td>
    <td>500</td>
    <td>There was an error in the underlying connection</td>
  </tr>
</table>

<a name="auth"></a>
### auth

```
GET /1/auth/github
```

Tries to get authorization from github, so elevated privileges can be used on that service. This will give us access to get working code from your repositories and change the status of a specific pull request

```
curl -X POST nodejitsuUser:nodejitsuPwd@webhooks.nodejitsu.com/1/auth/github --data '{"credentials":"githubUser:githubPass"}' --header "Content-type: application/json" 
```

<a name="auth-qs"></a>
#### Query String Parameters

The `app` parameter exists so you can restrict usage of a token to a individual application. This is useful can then commit status can only be applied to that specific application, and other third party tokens will not be returned.

However be careful, when specifying an application we will not be able to use these credentials to access the repository (because when we do that for the first time we still don't know the app name, we learn that from the package.json file).

Bottom line if you want to do deployments for private repositories do not specify `app` or you will fail.

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>app</td>
    <td>String</td>
    <td>Will restrict the usage of this token to a application. If not provided a wildcard will be used.</td>
  </tr>
</table>

<a name="auth-headers"></a>
#### Response Headers

<table>
  <tr>
    <th>Header</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>x-api-uuid</td>
    <td>String - UUID</td>
    <td>A unique id for your request. We keep tracks of these to help you thru support</td>
  </tr>
  <tr>
    <td>x-api-version</td>
    <td>String - Semantic Version</td>
    <td>The current version of our API. Follows semver rules. Major version is in the url as first parameter.</td>
  </tr>
</table>

<a name="auth-errors"></a>
#### Errors

<table>
  <tr>
    <th>Error</th>
    <th>Status Code</th>
    <th>Reason</th>
  </tr>
  <tr>
    <td>mw:auth:not_you</td>
    <td>401</td>
    <td>You are trying to get status that don't belong to you</td>
  </tr>
  <tr>
    <td>mw:auth:auth_server_down</td>
    <td>500</td>
    <td>We couldn't verify your credentials</td>
  </tr>
  <tr>
    <td>mw:auth:unauthorized</td>
    <td>401</td>
    <td>Your username/password combination doesn't match our records</td>
  </tr>
  <tr>
    <td>mw:auth:no_username</td>
    <td>401</td>
    <td>Your user document is in a bad state, contact support</td>
  </tr>
  <tr>
    <td>auth:github:get_user_failed</td>
    <td>500</td>
    <td>When retrieving the user from the nodejitsu api we got a non 200 response. The api might be down, or perhaps authorization credentials where changed</td>
  </tr>
  <tr>
    <td>auth:github:update_user_failed</td>
    <td>500</td>
    <td>We tried to update the user but it failed. Just like above, reasons are varied so contact support if you see this</td>
  </tr>
  <tr>
    <td>auth:github:no_credentials</td>
    <td>400</td>
    <td>Credentials were not provided. Check query string parameters for details</td>
  </tr>
  <tr>
    <td>auth:github:bad_credentials</td>
    <td>400</td>
    <td>Credentials were provided but not in the username:password format. Check query string parameters for details</td>
  </tr>
  <tr>
    <td>auth:github:github_pairing_failed</td>
    <td>401</td>
    <td>We tried to authenticate with github but it failed</td>
  </tr>
</table>

<a name="payloads"></a>
## Sample Payloads

<a name="payloads-travis"></a>
### Travis

``` json
{
  "id": 875154,
  "number": "11",
  "status": 0,
  "started_at": "2012-03-15T20:41:58Z",
  "finished_at": "2012-03-15T20:42:29Z",
  "duration": 61,
  "config": {
    "language": "node_js",
    "node_js": [
    0.6,
    0.7
    ],
    "branches": {
      "only": [
      "master"
      ]
    },
    "notifications": {
      "webhooks": {
        "urls": [
        "http://webhooks.jit.su/deploy"
        ],
        "on_success": "always",
        "on_failure": "never"
      }
    },
    ".configured": true
  },
  "status_message": "Passed",
  "repository": {
    "id": 10134,
    "name": "hello-world-flatiron-api",
    "owner_name": "dscape",
    "url": "https://github.com/dscape/hello-world-flatiron-api"
  },
  "matrix": [
  {
    "id": 875155,
    "repository_id": 10134,
    "number": "11.1",
    "state": "finished",
    "started_at": "2012-03-15T20:41:58Z",
    "finished_at": "2012-03-15T20:42:28Z",
    "config": {
      "language": "node_js",
      "node_js": 0.6,
      "branches": {
        "only": [
        "master"
        ]
      },
      "notifications": {
        "webhooks": {
          "urls": [
          "http://webhooks.jit.su/deploy"
          ],
          "on_success": "always",
          "on_failure": "never"
        }
      },
      ".configured": true
    },
    "status": 0,
    "log": "Using worker: nodejs1.worker.travis-ci.org:travis-nodejs-1\n\n$ cd ~/builds\r\n$ git clone --depth=100 --quiet git://github.com/dscape/hello-world-flatiron-api.git dscape/hello-world-flatiron-api\r\n$ cd dscape/hello-world-flatiron-api\r\n$ git checkout -qf 31f836acffeca4c88ff29d8e86f8c572707fd84a\r\n$ export TRAVIS_NODE_VERSION=0.6\r\n$ nvm use 0.6\r\nNow using node v0.6.12\r\n$ node --version\r\nv0.6.12\r\n$ npm --version\r\n1.1.4\r\n$ npm install\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/flatiron\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/specify\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/union\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/specify\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/flatiron\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/union\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/flatiron/-/flatiron-0.1.14.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/specify/-/specify-0.1.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/union/-/union-0.1.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/flatiron/-/flatiron-0.1.14.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/union/-/union-0.1.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/specify/-/specify-0.1.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/difflet\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/optimist/0.3.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/prompt/0.1.12\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/director/1.0.9-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/pkginfo/0.2.3\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/broadway/0.1.13\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/qs/0.3.2\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/pkginfo\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/difflet\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/difflet/-/difflet-0.2.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/director/1.0.9-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/prompt/0.1.12\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/optimist/0.3.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/director/-/director-1.0.9-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/prompt/-/prompt-0.1.12.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/optimist/-/optimist-0.3.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/difflet/-/difflet-0.2.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/broadway/0.1.13\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/broadway/-/broadway-0.1.13.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/pkginfo/0.2.3\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/pkginfo/-/pkginfo-0.2.3.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/pkginfo\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/director/-/director-1.0.9-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/qs/0.3.2\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/qs/-/qs-0.3.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/prompt/-/prompt-0.1.12.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/broadway/-/broadway-0.1.13.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/optimist/-/optimist-0.3.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/pkginfo/-/pkginfo-0.2.3.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/qs/-/qs-0.3.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/deep-equal\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/traverse\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/charm\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/charm\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/charm/-/charm-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/deep-equal\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/deep-equal/-/deep-equal-0.0.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/traverse\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/traverse/-/traverse-0.6.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/charm/-/charm-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/deep-equal/-/deep-equal-0.0.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/traverse/-/traverse-0.6.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/wordwrap\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/winston\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors/0.6.0-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/cliff/0.1.7\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eventemitter2/0.4.8\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/nconf/0.5.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/winston/0.5.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/utile/0.0.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/wordwrap\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 304 https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/cliff/0.1.7\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eventemitter2/0.4.8\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/cliff/-/cliff-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eventemitter2/-/eventemitter2-0.4.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/winston\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/winston/-/winston-0.5.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/nconf/0.5.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/nconf/-/nconf-0.5.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors/0.6.0-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/utile/0.0.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/utile/-/utile-0.0.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/winston/0.5.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/async/-/async-0.1.18.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eventemitter2/-/eventemitter2-0.4.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/cliff/-/cliff-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/winston/-/winston-0.5.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/nconf/-/nconf-0.5.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/utile/-/utile-0.0.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/async/-/async-0.1.18.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ncp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/rimraf\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/mkdirp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/mkdirp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eyes\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 304 https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ncp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/rimraf\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ncp/-/ncp-0.2.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/rimraf/-/rimraf-1.0.9.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ini\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/loggly\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/stack-trace\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ncp/-/ncp-0.2.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/rimraf/-/rimraf-1.0.9.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eyes\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eyes/-/eyes-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 304 https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eyes/-/eyes-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ini\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/stack-trace\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ini/-/ini-1.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/stack-trace/-/stack-trace-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/loggly\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/loggly/-/loggly-0.3.11.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[30;41mWARN\u001b[0m \u001b[35meyes@0.1.7\u001b[0m dependencies field should be hash of <name>:<version-range> pairs\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/stack-trace/-/stack-trace-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ini/-/ini-1.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/loggly/-/loggly-0.3.11.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/request\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/timespan\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/timespan\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/timespan/-/timespan-2.2.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/request\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/request/-/request-2.9.153.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/timespan/-/timespan-2.2.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/request/-/request-2.9.153.tgz\r\r\nunion@0.1.8 ./node_modules/union \r\r\n├── qs@0.3.2\r\r\n└── pkginfo@0.2.3\r\r\nspecify@0.1.6 ./node_modules/specify \r\r\n├── colors@0.6.0-1\r\r\n└── difflet@0.2.1\r\r\nflatiron@0.1.14 ./node_modules/flatiron \r\r\n├── pkginfo@0.2.3\r\r\n├── director@1.0.9-1\r\r\n├── optimist@0.3.1 (wordwrap@0.0.2)\r\r\n├── prompt@0.1.12 (colors@0.6.0-1 async@0.1.18 winston@0.5.10)\r\r\n└── broadway@0.1.13\r\r\n$ npm test\r\n\r\r\n> hello-world-api-flatiron@0.0.1 test /home/vagrant/builds/dscape/hello-world-flatiron-api\r\r\n> ls -tr test/*.js | xargs -I{} node {}\r\r\n\r\r\n\u001b[32m✔\u001b[39m 2/2 \u001b[36mhello#uuid\u001b[39m \r\n\u001b[32m✔\u001b[39m 2/2 \u001b[36msummary\u001b[39m \r\n\nDone. Build script exited with: 0\n",
    "result": 0,
    "parent_id": 875154,
    "commit": "abcda798007da3eefe5ea96715366e327ae1af91",
    "branch": "master",
    "message": "travis",
    "committed_at": "2012-03-15T19:26:12Z",
    "committer_name": "Nuno Job",
    "committer_email": "nunojobpinto@gmail.com",
    "author_name": "Nuno Job",
    "author_email": "nunojobpinto@gmail.com",
    "compare_url": "https://github.com/dscape/hello-world-flatiron-api/compare/db082ee...31f836a"
  },
  {
    "id": 875156,
    "repository_id": 10134,
    "number": "11.2",
    "state": "finished",
    "started_at": "2012-03-15T20:41:58Z",
    "finished_at": "2012-03-15T20:42:29Z",
    "config": {
      "language": "node_js",
      "node_js": 0.7,
      "branches": {
        "only": [
        "master"
        ]
      },
      "notifications": {
        "webhooks": {
          "urls": [
          "http://webhooks.jit.su/deploy"
          ],
          "on_success": "always",
          "on_failure": "never"
        }
      },
      ".configured": true
    },
    "status": 0,
    "log": "Using worker: nodejs1.worker.travis-ci.org:travis-nodejs-3\n\n$ cd ~/builds\r\n$ git clone --depth=100 --quiet git://github.com/dscape/hello-world-flatiron-api.git dscape/hello-world-flatiron-api\r\n$ cd dscape/hello-world-flatiron-api\r\n$ git checkout -qf 31f836acffeca4c88ff29d8e86f8c572707fd84a\r\n$ export TRAVIS_NODE_VERSION=0.7\r\n$ nvm use 0.7\r\nNow using node v0.7.6\r\n$ node --version\r\nv0.7.6\r\n$ npm --version\r\n1.1.8\r\n$ npm install\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/flatiron\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/union\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/specify\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/flatiron\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/flatiron/-/flatiron-0.1.14.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/union\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/union/-/union-0.1.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/specify\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/specify/-/specify-0.1.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/union/-/union-0.1.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/flatiron/-/flatiron-0.1.14.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/specify/-/specify-0.1.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/difflet\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/pkginfo\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/broadway/0.1.13\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/optimist/0.3.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/qs/0.3.2\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/prompt/0.1.12\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/director/1.0.9-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/pkginfo/0.2.3\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/difflet\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/difflet/-/difflet-0.2.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/optimist/0.3.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/optimist/-/optimist-0.3.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/broadway/0.1.13\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/broadway/-/broadway-0.1.13.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/pkginfo\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/pkginfo/-/pkginfo-0.2.3.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/qs/0.3.2\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/qs/-/qs-0.3.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/difflet/-/difflet-0.2.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/prompt/0.1.12\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/prompt/-/prompt-0.1.12.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/director/1.0.9-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/director/-/director-1.0.9-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/pkginfo/-/pkginfo-0.2.3.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/broadway/-/broadway-0.1.13.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/optimist/-/optimist-0.3.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/pkginfo/0.2.3\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/prompt/-/prompt-0.1.12.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/qs/-/qs-0.3.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/director/-/director-1.0.9-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/traverse\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/charm\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/deep-equal\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/deep-equal\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/deep-equal/-/deep-equal-0.0.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/wordwrap\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors/0.6.0-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/cliff/0.1.7\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/winston\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eventemitter2/0.4.8\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/nconf/0.5.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/winston/0.5.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/utile/0.0.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/traverse\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/charm\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/traverse/-/traverse-0.6.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/charm/-/charm-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/deep-equal/-/deep-equal-0.0.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/cliff/0.1.7\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/cliff/-/cliff-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/wordwrap\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors/0.6.0-1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eventemitter2/0.4.8\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eventemitter2/-/eventemitter2-0.4.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/nconf/0.5.1\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/nconf/-/nconf-0.5.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 304 https://registry.npmjs.org/colors\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/winston\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/winston/-/winston-0.5.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/winston/0.5.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/utile/0.0.10\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/utile/-/utile-0.0.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/traverse/-/traverse-0.6.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/charm/-/charm-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/cliff/-/cliff-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/colors/-/colors-0.6.0-1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/async/-/async-0.1.18.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/nconf/-/nconf-0.5.1.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/winston/-/winston-0.5.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/utile/-/utile-0.0.10.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eventemitter2/-/eventemitter2-0.4.8.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/async/-/async-0.1.18.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eyes\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/loggly\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/stack-trace\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/mkdirp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ini\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ncp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/rimraf\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/mkdirp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eyes\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/eyes/-/eyes-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/stack-trace\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/stack-trace/-/stack-trace-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ini\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ini/-/ini-1.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/loggly\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/loggly/-/loggly-0.3.11.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 304 https://registry.npmjs.org/async\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/eyes/-/eyes-0.1.7.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ini/-/ini-1.0.2.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/rimraf\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ncp\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/stack-trace/-/stack-trace-0.0.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/rimraf/-/rimraf-1.0.9.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/ncp/-/ncp-0.2.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/loggly/-/loggly-0.3.11.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/request\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/timespan\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/rimraf/-/rimraf-1.0.9.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/ncp/-/ncp-0.2.6.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/timespan\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/timespan/-/timespan-2.2.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/request\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m \u001b[35mGET\u001b[0m https://registry.npmjs.org/request/-/request-2.9.153.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/timespan/-/timespan-2.2.0.tgz\r\r\n\u001b[37;40mnpm\u001b[0m \u001b[32;40mhttp\u001b[0m 200 https://registry.npmjs.org/request/-/request-2.9.153.tgz\r\r\nunion@0.1.8 ./node_modules/union \r\r\n├── qs@0.3.2\r\r\n└── pkginfo@0.2.3\r\r\nspecify@0.1.6 ./node_modules/specify \r\r\n├── colors@0.6.0-1\r\r\n└── difflet@0.2.1\r\r\nflatiron@0.1.14 ./node_modules/flatiron \r\r\n├── pkginfo@0.2.3\r\r\n├── director@1.0.9-1\r\r\n├── optimist@0.3.1 (wordwrap@0.0.2)\r\r\n├── prompt@0.1.12 (colors@0.6.0-1 async@0.1.18 winston@0.5.10)\r\r\n└── broadway@0.1.13\r\r\n$ npm test\r\n\r\r\n> hello-world-api-flatiron@0.0.1 test /home/vagrant/builds/dscape/hello-world-flatiron-api\r\r\n> ls -tr test/*.js | xargs -I{} node {}\r\r\n\r\r\n\u001b[32m✔\u001b[39m 2/2 \u001b[36mhello#uuid\u001b[39m \r\n\u001b[32m✔\u001b[39m 2/2 \u001b[36msummary\u001b[39m \r\n\nDone. Build script exited with: 0\n",
    "result": 0,
    "parent_id": 875154,
    "commit": "abcda798007da3eefe5ea96715366e327ae1af91",
    "branch": "master",
    "message": "travis",
    "committed_at": "2012-03-15T19:26:12Z",
    "committer_name": "Nuno Job",
    "committer_email": "nunojobpinto@gmail.com",
    "author_name": "Nuno Job",
    "author_email": "nunojobpinto@gmail.com",
    "compare_url": "https://github.com/dscape/hello-world-flatiron-api/compare/db082ee...31f836a"
  }
  ],
  "commit": "abcda798007da3eefe5ea96715366e327ae1af91",
  "branch": "master",
  "message": "travis",
  "compare_url": "https://github.com/dscape/hello-world-flatiron-api/compare/db082ee...31f836a",
  "committed_at": "2012-03-15T19:26:12Z",
  "committer_name": "Nuno Job",
  "committer_email": "nunojobpinto@gmail.com",
  "author_name": "Nuno Job",
  "author_email": "nunojobpinto@gmail.com"
}
```

<a name="payloads-github"></a>
### Github


``` json
{
  "pusher": {
    "name": "none"
  },
  "repository": {
    "name": "hello-world-flatiron-api",
    "size": 92,
    "has_wiki": true,
    "created_at": "2012/03/15 09:58:36 -0700",
    "watchers": 1,
    "private": false,
    "fork": false,
    "url": "https://github.com/dscape/hello-world-flatiron-api",
    "language": "JavaScript",
    "pushed_at": "2012/03/15 12:26:21 -0700",
    "has_downloads": true,
    "open_issues": 0,
    "homepage": "",
    "has_issues": true,
    "forks": 1,
    "description": "Sample Flatironjs Application - Hello World API",
    "owner": {
      "name": "dscape",
      "email": "nunojobpinto@gmail.com"
    }
  },
  "forced": false,
  "head_commit": {
    "added": [],
    "modified": [".travis.yml"],
    "author": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    },
    "timestamp": "2012-03-15T12:26:12-07:00",
    "removed": [],
    "url": "https://github.com/dscape/hello-world-flatiron-api/commit/31f836acffeca4c88ff29d8e86f8c572707fd84a",
    "id": "31f836acffeca4c88ff29d8e86f8c572707fd84a",
    "distinct": true,
    "message": "travis",
    "committer": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    }
  },
  "after": "abcda798007da3eefe5ea96715366e327ae1af91",
  "deleted": false,
  "ref": "refs/heads/master",
  "commits": [
  {
    "added": [
    ".travis.yml",
    "test/uuid.js"
    ],
    "modified": [
    "index.js",
    "package.json"
    ],
    "author": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    },
    "timestamp": "2012-03-15T10:19:36-07:00",
    "removed": [
    ],
    "url": "https://github.com/dscape/hello-world-flatiron-api/commit/f32b8cd499cfcff0c125c829b94b410960bb0f63",
    "id": "f32b8cd499cfcff0c125c829b94b410960bb0f63",
    "distinct": true,
    "message": "[test] added test\n\nadded travisyml",
    "committer": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    }
  },
  {
    "added": [
    "README.md"
    ],
    "modified": [
    ],
    "author": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    },
    "timestamp": "2012-03-15T12:23:46-07:00",
    "removed": [
    ],
    "url": "https://github.com/dscape/hello-world-flatiron-api/commit/85c18350581e55698deaef7bce70cf384e5ae1e3",
    "id": "85c18350581e55698deaef7bce70cf384e5ae1e3",
    "distinct": true,
    "message": "travis",
    "committer": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    }
  },
  {
    "added": [
    ],
    "modified": [
    ".travis.yml"
    ],
    "author": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    },
    "timestamp": "2012-03-15T12:26:12-07:00",
    "removed": [
    ],
    "url": "https://github.com/dscape/hello-world-flatiron-api/commit/31f836acffeca4c88ff29d8e86f8c572707fd84a",
    "id": "31f836acffeca4c88ff29d8e86f8c572707fd84a",
    "distinct": true,
    "message": "travis",
    "committer": {
      "name": "Nuno Job",
      "username": "dscape",
      "email": "nunojobpinto@gmail.com"
    }
  }
  ],
  "before": "db082eee314d92856639ad75b795798ab247473e",
  "compare": "https://github.com/dscape/hello-world-flatiron-api/compare/db082ee...31f836a",
  "created": false
}
```