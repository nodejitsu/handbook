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
