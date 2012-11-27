<hr>
[`jitsu`](http://github.com/nodejitsu/jitsu) is a [Command Line Interface](http://en.wikipedia.org/wiki/Command-line_interface) (CLI) for interacting with the Nodejitsu platform. It's open-source and easy to use.
<hr>

## Installation

`jitsu` is distributed using the Node Package Manager (npm). Installing jitsu with npm is as simple as a single command:

```
  [sudo] npm install -g jitsu
```

This command installs jitsu to your Node path, so that it may be run like any other global shell command.

<hr>
## Usage

Commands for jitsu follow this pattern:

```
  jitsu <resource> <action> <param1> <param2> ...
```

For example, in `jitsu apps deploy`, "apps" is the resource and "deploy" is the action.

<hr>
### jitsu deploy (jitsu apps deploy)

`jitsu deploy` will attempt to deploy the application in the current directory to [Nodejitsu](http://nodejitsu.com). It deploys your application using the following steps:

1. Creates the application (if necessary)
2. Creates or validates the package.json
3. Packages and creates a new snapshot
4. Starts the application

If you had a previous deployment running, and the most recent deploy failed, your old  application will contnue to run without interruption.

<hr>
### jitsu list (jitsu apps list)

`jitsu list` lists your applications, as well as their respective states, subdomains, entry points and latest snapshots.

<hr>
### jitsu help <resource> <action>

**_`jitsu` is self-documenting_** All commands will yield friendly messages to you if you specify incorrect parameters. Additionally, `jitsu help` will return useful help messages about any given resource or resource/action pair. for instance:

```
  $ jitsu help apps deploy
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
```

If no resource and/or action are specified, then `jitsu help` alone will describe what resources are available.

<hr>
### jitsu apps <action>

In addition to the commands aliased to `jitsu create`, `jitsu deploy` and  `jitsu list`, the `apps` resource allows you to create, destroy, stop, start and otherwise interact with your applications.

If your app is in a stopped state, you will not be charged for it, ever. To put your app in a stopped state run `jitsu apps stop <appname>`.

<hr>
### jitsu env <action>

`jitsu` allows you to set environment variables on your production environment. For example, [Express](http://expressjs.com), a popular node.js web framework, uses the `NODE_ENV` environment variable to change behavior based on whether the environment is for development or production. In the case of Express, nodejitsu has `NODE_ENV` set to "production" by default, but if one wanted to change this variable or add more for their application, `jitsu env` supplies the tools to do so.

<hr>
### jitsu config <action>

`jitsu config` commands allow you to edit your local jitsu configuration file.

<hr>
### jitsu snapshots <action>

`jitsu snapshots *` commands allow you to work with snapshots for your  Applications on Nodejitsu. Snapshots are images of your Application's code that are deployed to the Nodejitsu Platform.

For commands that take a `<name>` parameter, if no parameter is supplied, `jitsu` will attempt to read the package.json from the current directory.

<hr>
### jitsu users <action>

`jitsu users *` commands allow you to work with new or existing Nodejitsu user accounts. You will be prompted for additional user information as required.

<hr>
### jitsu install

`jitsu install` is a built-in tool for downloading "starter apps" to speed up development. For example, here's how to use `jitsu install` to download a "hello world" application:

```
  $ jitsu install helloworld
  info:   Welcome to Nodejitsu jesusabdullah
  info:   It worked if it ends with Nodejitsu ok
  info:   Executing command install helloworld
  info:   Installing helloworld locally.
  warn:   Downloading packages from npm, this may take a moment...
  info:   helloworld installed.
  help:   You can now jitsu deploy this application
  prompt: Would you like to start this application locally? (yes): no
  info:   Nodejitsu ok
  $ cd helloworld
  $ ls
  bin  node_modules  package.json  ReadMe.md
```

<hr>
## Configuring jitsu

All user-level configuration data for your local jitsu install is located in the *.jitsuconf* file located in your home directory. Directly modifying this file is not advised. You should be able to make all configuration changes using `jitsu config`.

### Selected Properties of .jitsuconf

* *loglength*: Change this to modify the default length of returned logs from `jitsu logs`.
* *loglevel*: Change this to modify the logging levels displayed by jitsu. Defaults to "info".
* *colors*: Change this to false to turn off jitsu's colors. Defaults to `true`.
* *analyze*: Change this to false to disable require-analyzer for all apps. Defaults to `true`.

[meta:title]: <> (Using the jitsu CLI)