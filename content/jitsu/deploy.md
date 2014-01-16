# Deploying your application

Deploying your application is easy, it should only take a few seconds.
`jitsu deploy` can be executed from the root of the application. This is where
the *package.json* is located. Deployment will iterate through the following
steps.

1. Creates the application (if necessary)
2. Creates or validates the package.json
3. Packages and creates a new snapshot
4. Stops the application (if necessary)
5. Starts the application

If you deploy for the first time, you'll be prompted for a subdomain and
confirm the changes to [package.json][package]. By default your username will be
prepended before the application name. After a succesful deploy `Nodejitsu ok`
will be returned.

```
info:    Welcome to Nodejitsu [user]
info:    jitsu v0.12.8, node v0.8.22
info:    It worked if it ends with Nodejitsu ok
info:    Executing command deploy
warn:
warn:    The package.json file is missing required fields:
warn:
warn:      Subdomain name
warn:
warn:    Prompting user for required fields.
warn:    Press ^C at any time to quit.
warn:
prompt: Subdomain name:  (subdomain)
warn:    About to write /var/www/test/helloworld/package.json
...
prompt: Is this ok?:  (yes)
info:    Skipping require-analyzer because noanalyze option is set
info:    Checking app availability nodeapps-helloworld
info:    Creating app nodeapps-helloworld
info:    Creating snapshot 0.2.2
info:    Uploading: [=============================] 100%
info:    Updating app nodeapps-helloworld
info:    Activating snapshot 0.2.2 for nodeapps-helloworld
info:    Starting app nodeapps-helloworld
info:    App nodeapps-helloworld is now started
info:    http://subdomain.nodejitsu.com on Port 80
info:    Nodejitsu ok
```
## Repeated deployments

After an initial deploy you can redeploy as often as you would like. Note
however that `jitsu` will ask to increase the package build version, e.g the
`x` in `0.0.z-x` will be incremented. A manual increase of the patch `z`
version will skip the step below and immediatly deploy your application.

```
info:    Welcome to Nodejitsu [user]
info:    jitsu v0.12.8, node v0.8.22
info:    It worked if it ends with Nodejitsu ok
info:    Executing command apps deploy
info:    Skipping require-analyzer because noanalyze option is set
info:    Skipping require-analyzer because noanalyze option is set
warn:    Local package version appears to be old
warn:    The package.json version will be incremented automatically
warn:    About to write /var/www/test/helloworld/package.json
...
data:        version: '0.2.2-1',
...
prompt: Is this ok?:  (yes)
```

You can also do `jitsu deploy --release patch` to force `jitsu deploy` to
increase the patch version number. For more fine-grained versioning control
see [jitsu config --release][release].

## Hooks

Applications can required certain tasks to be done for before or just after
deployment. For these repetitive tasks we offer pre and post deploy hooks. Hooks
are scripts that perform some required tasks before starting your application.
Per example:

```javascript
{
  "name": "test-app",
  "subdomain": "test-app",
  "scripts": {
    "predeploy": "echo This will be run before deploying the app",
    "postdeploy": "echo This will be run after deploying the app",
    "start": "app.js"
  },
  "engines": {
    "node": "0.10.x"
  },
  "version": "0.0.0"
}
```

Deploying an application with these deploy hooks, would result in:

```bash
info:    Welcome to Nodejitsu
info:    It worked if it ends with Nodejitsu ok
info:    Executing command deploy
info:    Analyzing your application dependencies in app.js
info:    Checking app availability test-app
info:    Creating app test-app
This will be run before deploying the app
info:    Creating snapshot 0.0.0
info:    Updating app test-app
info:    Activating snapshot 0.0.0 for test-app
info:    Starting app test-app
info:    App test-app is now started
info:    http://test-app.jit.su on Port 80
This will be run after deploying the app
info:    Nodejitsu ok
```

## Continuous integration

Nodejitsu also supports continuous integration (CI) for deployments. For more
information about CI check the [getting started page][gettingstarted] or
relevant [handbook section][handbook].

## What is deployed

Deploy will normally include all files, excluding the *node_modules* directory.
The content that is deployed is dependant on `npm pack`. This command is
executed by `jitsu deploy` and governs the snapshots we use for deployment.
`npm pack` by default ignores files and folders starting with an dot, e.g.
*.DS_Store*. In addition, it also takes *.gitignore* and *.npmignore* into
account. More information about this subject can be found in the [FAQ][faq].

[release]: /jitsu/config/#release
[faq]: /faq/#why-is-the-subdirectory-or-its-content-not-deployed-to-nodejitsu
[handbook]: /features/continuous_deployment/
[gettingstarted]: https://www.nodejitsu.com/getting-started-with-github/
[package]: /appendix/package-json/
[meta:title]: <> (Deploying apps)
