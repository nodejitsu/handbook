# Continuous Deployment using Github

<a name="webhookapi-index"></a>

Access the `Admin` section on your open source node.js Github repository. Click
`Service Hooks` and then `Nodejitsu`. You will be presented with a form with
four fields:

* Username, which defaults to your Github username
* Password, your password or a valid [Nodejitsu API authentication 
token](https://handbook.nodejitsu.com/api#create-an-api-token) (`jitsu tokens create github`)
* Branch, where you can define the branch you wish to deploy and defaults to master
* Endpoint, which defaults to https://webhooks.nodejitsu.com

![The Github Interface for Nodejitsu](https://versions.jitsu.com/resources/service-hooks.png)

Select `Active` and hit `Update Settings`. From now on every-time you commit to
Github (in the designated deployment branch) we will deploy that application for
you. That simple.

<a name="webhookapi-monitoring"></a>
## Monitoring deployments

There's several ways to access the deployment status in the Nodejitsu Webhook
API, and you can find the complete documentation at
[webhooks.nodejitsu.com](http://webhooks.nodejitsu.com).

The most fun way to monitor your deployment is with the real-time status changes
feed.

``` bash
# if your username is foo and password is bar this would be 
# https://foo:bar@webhooks.nodejitsu.com/1/status/foo/changes
curl -u username https://webhooks.nodejitsu.com/1/status/username/changes?include_docs=auto
```

This will create an HTTP keep alive connection that pushes the status to you in
real-time every time someone invokes our API:

``` javascript
{
  "id": "https://webhooks.nodejitsu.com/1/status/dscape/changes/2b3de47c2ce04a9dda4d31aac5000bab",
  "app_name": "hello-world-api-flatiron",
  "uuid": "aa6e9b1332436698771",
  "status": "ok",
  "provider": "travis",
  "commit": "dscape/hello-world-flatiron-api/96410ed970f6224a4cd3c450150c5d65bbc77fcd"
}
```

Each request to our API is logged with a unique `uuid`, so you can use it to
refer possible issues to our support staff.

We are now ready to deploy, go back to Github and click `Test Hook`. You should
be up and running shortly.

<a name="webhookapi-badges"></a>
## Badges

If you use our continuous deployment solution and wish there was a easier way to
see if the latest deployment worked you can now use our Continuous Deployment
Badges.

This is simple, if your username was `nodejitsu` and your github repository was
called `handbook` you could get deployment status by simply adding this to your
`readme.md` file:

``` markdown
[![Nodejitsu Deploy Status Badges](https://webhooks.nodejitsu.com/nodejitsu/handbook.png)](https://webops.nodejitsu.com#nodejitsu/webhooks)
```

It will look something like this:

[![Nodejitsu Deploy Status Badges](https://versions.jitsu.com/resources/success.png)](https://webops.nodejitsu.com#nodejitsu/webhooks)

<a name="webhookapi-travis"></a>
## Travis

What about continuous integration?  We added [Travis-CI](http://travis-ci.org/)
so you can feel safe about your deployments. Simply add something like this in
your `.travis.yml` file.

``` yaml
notifications:
  webhooks: 
    urls:
      - http://webhooks.nodejitsu.com/1/deploy
    on_success: always
    on_failure: never
```

Internally our API will try to see if you have Travis configured like this, and
if you do it will put the deployment request from Github on a hold until Travis
informs us all tests have passed.

If tests failed we won't deploy. Simple.

<a name="webhookapi-privaterepos"></a>
## Deploying Private Repositories & Commit Status API

If you authorize access so we can use your github account we can do more fun
stuff like allowing you to deploy your private repositories, or even update your
[commit status](https://github.com/blog/1227-commit-status-api) and check if a
deployment worked directly in github. We don't save any passwords - we just use
the password to retrieve a token to save.

![Commit Status API](https://versions.jitsu.com/resources/merge.png)

To authorize simply do:

``` bash
curl -X POST \
  -H "Content-type: application/json" \
  https://webhooks.nodejitsu.com/1/auth/github \
  --data '{ "credentials": "githubUser:githubPassword" }' \
  -u nodejitsuUser
```

**Note:** If your shell does not allow you to use the above format use the
single line command below:

``` bash
curl -X POST https://webhooks.nodejitsu.com/1/auth/github -H "Content-type: application/json" --data '{ "credentials": "githubUser:githubPassword" }' -u nodejitsuUser
```

<a name="webhookapi-apikeys"></a>
## But wait, I have API keys I can't commit to Github as open source?!

Don't worry, you can use `jitsu set env` to set environment variables that you
can access with `process.env`. Check our
[handbook](https://handbook.nodejitsu.com/features#feature/envvars) for more
information. Environment variables set this way persist across deployments and
are also available in our [webops](https://webops.nodejitsu.com) application.

<a name="webhookapi-api"></a>
## API Documentation

<a name="deploy"></a>
### Deploy

```
POST /
POST /1/deploy
```

Deploy a new application with a given payload. 

Check [Sample Payloads](#payloads) for examples. This method is normally called
by a [github](http://help.github.com/post-receive-hooks) or
[travis](http://about.travis-ci.org/docs/user/build-configuration) web-hook.

You must configure the github webhook to use the travis webhook. Works under the
assumption that if your repository has a `.travis.yml` file and that contains at
least one webhook notification we shouldn't deploy from the github request, but
instead wait until travis triggers the notify event and calls our API. This
effectively means that if travis tests don't pass your application does not get
deployed.

```
curl -X POST -u username -d @file https://webhooks.nodejitsu.com/1/deploy
```

Authentication can use a pair of `user:pass` or `user:apiToken`.

<a name="deploy-accept"></a>
#### Accept

<table class="rounded striped">
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

<table class="rounded striped">
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

<table class="rounded striped">
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

Gets the install status for a specific user. Useful to determine if the deploy
worked, or why it failed. `:user` is your Nodejitsu username and `:application`
is your application name.

```
curl -u dscape  https:/webhooks.nodejitsu.com/1/status/dscape/webhooks/hello-world-api-flatiron?limit=10\&skip=20
```

<a name="status-qs"></a>
#### Query String Parameters

<table class="rounded striped">
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

<table class="rounded striped">
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

<table class="rounded striped">
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

Streams log files as you deploy application with a changes stream. When you
provide an id it will just return that entry and close the http connection.

```
curl -u dscape https://webhooks.nodejitsu.com/1/status/dscape/changes?include_docs=true
```

<a name="changes-qs"></a>
#### Query String Parameters

<table class="rounded striped">
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

<table class="rounded striped">
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

<table class="rounded striped">
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
### Auth

```
POST /1/auth/github
```

Tries to get authorization from github, so elevated privileges can be used on
that service. This will give us access to get working code from your
repositories and change the status of a specific pull request

```
curl -X POST -u nodejitsuUser https://webhooks.nodejitsu.com/1/auth/github \
  --data '{"credentials":"githubUser:githubPass"}' \
  --header "Content-type: application/json"
```

<a name="auth-qs"></a>
#### Query String Parameters

The `app` parameter exists so you can restrict usage of a token to a individual
application. This is useful can then commit status can only be applied to that
specific application, and other third party tokens will not be returned.

However be careful, when specifying an application we will not be able to use
these credentials to access the repository (because when we do that for the
first time we still don't know the app name, we learn that from the package.json
file).

Bottom line if you want to do deployments for private repositories do not
specify `app` or you will fail.

<table class="rounded striped">
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

<table class="rounded striped">
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

<table class="rounded striped">
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

[meta:title]: <> (Continuous Deployment)
