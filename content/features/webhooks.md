It's possible to achieve Continuous Deployment techniques on Nodejitsu, you can use the official and free [Webhooks API](#webhookapi-index) or third party paid services like [Codeship](http://codeship.io).

* [Continuous Deployment with Github and Webhooks API](#github)
* [Continuous Deployment with Codeship](#codeship)

---

<a name="github"></a>
## Continuous Deployment using Github and Webhooks API

<a name="webhookapi-index"></a>

Access the `Admin` section on your open source node.js Github repository. Click
`Service Hooks` and then `Nodejitsu`. You will be presented with a form with
four fields:

* Username, which defaults to your Github username
* Password, your password or a valid [Nodejitsu API authentication 
token](/api/#create-an-api-token) (`jitsu tokens create github`)
* Branch, where you can define the branch you wish to deploy and defaults to master
* Endpoint, which defaults to https://webhooks.nodejitsu.com

![The Github Interface for Nodejitsu](https://versions.nodejitsu.com/id:handbook/resources/service-hooks.png)

Select `Active` and hit `Update Settings`. From now on every-time you commit to
Github (in the designated deployment branch) we will deploy that application for
you. That simple.

<a name="webhookapi-monitoring"></a>
### Monitoring deployments

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
### Badges

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

[![Nodejitsu Deploy Status Badges](https://versions.nodejitsu.com/id:handbook/resources/success.png)](https://webops.nodejitsu.com#nodejitsu/webhooks)

<a name="webhookapi-travis"></a>
### Travis

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
### Deploying Private Repositories & Commit Status API

If you authorize access so we can use your github account we can do more fun
stuff like allowing you to deploy your private repositories, or even update your
[commit status](https://github.com/blog/1227-commit-status-api) and check if a
deployment worked directly in github. We don't save any passwords - we just use
the password to retrieve a token to save.

![Commit Status API](https://versions.nodejitsu.com/id:handbook/resources/merge.png)

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
### But wait, I have API keys I can't commit to Github as open source?!

Don't worry, you can use `jitsu set env` to set environment variables that you
can access with `process.env`. Check our
[handbook](/features/#feature/envvars) for more
information. Environment variables set this way persist across deployments and
are also available in our [webops](https://webops.nodejitsu.com) application.

<a name="webhookapi-api"></a>
### [Webhook API Documentation](api/webhooks)


<a name="codeship"></a>
## Continuous Deployment with Codeship

![Codeship](https://codeship-images.s3.amazonaws.com/logo_codeship_colour.png)

Codeship tests and deploys your Bitbucket and GitHub commits on a branch-level to Nodejitsu. Simply configure it on the Codeship website within seconds and automate your deployment pipeline.

All you need to deploy to Nodejitsu is your username and an API token.

![Codeship Deployment Settings](https://raw.github.com/codeship/screencast-storyboards/v0.4/screenshots/node/nodejitsu/new-deployment.png)

You can read their official step-by-step tutorials and videos in:
* [Deploy from Bitbucket](http://blog.codeship.io/2013/10/23/how-to-deploy-a-node-js-app-from-bitbucket-to-nodejitsu.html)
* [Deploy from GitHub](http://blog.codeship.io/2013/10/29/how-to-deploy-a-node-js-app-from-github-to-nodejitsu.html)

[meta:title]: <> (Continuous Deployment)
