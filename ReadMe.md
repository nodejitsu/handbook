
# The Nodejitsu Handbook

*A gentle introduction to the art of Nodejitsu*

Welcome to the Nodejitsu handbook. This document will help familiarize you with Nodejitsu while also providing detailed information about specific platform features. This is a living document which you can submit patches to @ [http://github.com/nodejitsu/handbook](http://github.com/nodejitsu/handbook).

## What Is Nodejitsu?

[Nodejitsu](http://nodejitsu.com/) is a Platform as A Service for Node.js applications. Nodejitsu allows you to seamlessly deploy your Node.js applications into the cloud with a myriad of additional features. Nodejitsu's platform provides a robust suite of functionality to assist in the development, management, and deployment of Node.js applications.

## How Can I Get Started?

So you wish to learn the ways of Nodejitsu? Excellent! Reading this sentence is the first step! Below, you will find the Table Of Contents which provides an overview of the systems which comprise Nodejitsu. We suggest starting at [Deploying Applications](#Deploying_Applications). You can also always visit our website at [http://nodejitsu.com](http://nodejitsu.com). Good Luck!



# Table of Contents

- [Deploying Applications](#Deploying_Applications)
- [Using the Jitsu Client](#Using_The_Jitsu_Client)
    - Installation
    - Usage
- [Using the API](#Using_The_API)
    - [Applications](#Applications)
    - [Snapshots](#Snapshots)
    - [Users](#User)
    - [Databases](#Databases)
    - [Logging](#Logging)
    - [Marketplace](#Marketplace)
- [Using Databases](#Using_Databases)
    - Creating new Databases
    - Connecting existing Databases
- [Nodejitsu's Open-source Projects](#Open_source_Projects)
    - Why open-source
    - Where to find
    - How to contribute
- [Additional Information](#Additional_Information)
    - Installing Node.js
    - Installing NPM
    - Creating a package.json

<a name="Deploying_Applications"></a>
# Deploying Applications

If it is your first time deploying an application, we recommend that you try out [Jitsu](#Using_The_Jitsu_Client), our CLI tool. We also offer a web interface and API for deploying applications. 

## The Samurai web admin

Samurai is an easy to use web admin where you can manage and deploy your Node.js applications. Just visit [http://www.nodejitsu.com](http://www.nodejitsu.com) and sign-in. You'll be taken directly to the Samurai web admin interface.

     TODO: Add screen shot of Samurai interface

## Jitsu, The Nodejitsu Command Line Tool 

If you prefer a CLI ( Command Line Interface ) instead of a web-site you can download [Jitsu](#Using_The_Jitsu_Client), The Nodejitsu CLI tool. Jitsu is friendly to non-technical users, but it does cover our entire [API](#Using_The_API) and it's fully open-source for the more advanced Node.js user. 

## The API

If you are an advanced user, you might want to automate your deployment using scripts instead of manually deploying your application from Samurai or Jitsu. Nodejitsu provides a [high-level JSON API](#Using_The_API) which will allow you to deploy applications programmatically. 

You can see a detailed specification of the API [here](#Using_The_API).

<a name="Using_The_Jitsu_Client"></a>

# Using The Jitsu Client

[Jitsu](http://github.com/nodejitsu/jitsu) is a [Command Line Tool (CLI)](http://en.wikipedia.org/wiki/Command-line_interface) for interacting with the Nodejitsu platform. It's open-source and easy to use. We've designed Jitsu to be suitable for command line beginners, but still be powerful and extensible enough for production usage. If you aren't a fan of the command line or don't have terminal access you can still do everything Jitsu can do through our web admin, [Samurai](http://nodejitsu.com). 

Jitsu requires the Node Package Manager ( npm ). If you need help installing npm go to: [Installing npm](#Installing_npm)

## Installation

     [sudo] npm install jitsu
     
## Usage

     jitsu help
     
Jitsu is mostly self-documenting. For additional resources you can visit it's source code repository located @ [http://github.com/nodejitsu/jitsu](http://github.com/nodejitsu/jitsu).
<a name="Using_The_API"></a>
# Using The API

Nodejitsu provides a web API for developers who want to interact with the Nodejitsu platform programatically. This API is built to be [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) and communicates via [JSON](http://en.wikipedia.org/wiki/JSON).

- [Applications](#Applications)
- [Snapshots](#Snapshots)
- [Users](#User)
- [Databases](#API_Databases)
- [Logging](#Logging)
- [Marketplace](#Marketplace)

## Authentication 

Most of the calls to the API will require that you authenticate using your Nodejitsu account. If you do not have an account it is possible to create one using the User API, the Jitsu CLI, or just by visiting [http://nodejitsu.com](http://nodejitsu.com). Currently, we support [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). If you haven't used Basic Auth before don't fret, it's easy! 

**Here is an example using the command line utility, [Curl](http://curl.haxx.se/).**

     // get all applications for User "Marak"
     curl --user Marak:password http://nodejitsu.com/apps/marak

TODO: add example of what raw outgoing http request should look like

<a name="Applications"></a>
## Applications

Applications are the core of the Nodejitsu API. Each application represents a set of Node.js code plus a package.json which contains meta-data about the application such as it's dependencies, database connections, configuration settings, authors, etc. For more information about the package.json format see: [package.json](#package_json)

#### Get all Applications for a User
    
     GET /apps/:user-id

#### Create a new Application

     POST /apps/:user-id
     { package.json }

#### Start an Application

     POST /apps/:user-id/:app-id/restart

#### Stop an Application
     
     POST /apps/:user-id/:app-id/start

#### Restart an Application
     
     POST /apps/:user-id/:app-id/stop

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

Databases are an integral part to most applications. The Nodejitsu API allows you to dynamically create new hosted database instances for your applications. Cloud database hosting is provided by: CouchOne, Redis2Go and MongoHQ.

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

Logging is a very important feature to any professional grade Node.js application. Nodejitsu provides integrated logging solutions for your applications. Your logs are always saved and ready to be retrieved. TODO: add better description on logging

#### Get all logs for a user

     GET /logs/:user-id/

#### Get logs for a specific application

     GET /logs/:user-id/:app-id

<a name="Marketplace"></a>

## Marketplace

The Marketplace is an online store where you can browse ready to deploy Node.js Applications. The Marketplace is a great place to start if you are new to Node.js development or want to share your existing Node.js Application with the world.


#### Get all Marketplace Applications

    GET /marketplace

#### Get a specific Marketplace Application

    GET /databases/:user-id/:id

<a name="Using_Databases"></a>

# Using Databases

Applications on Nodejitsu are ready to be connected to any database. If you have already have a database running, Nodejitsu can connect to your pre-existing database. If you require a new database, Nodejitsu can provide you FREE instances of several different types of databases. These free instances are great for development purposes or hobby sites. If you require a high traffic or production database we provide an easy upgrade path to industrial strength database hosting.

## Creating new Databases

If you require database hosting you can create a new database instance of any of our supported databases using [Samurai](#Deploying_Applications), [Jitsu](#Using_The_Jitsu_Client), or our [API](#Using_The_API).


## Existing Databases

If you already have an externally hosted Database, Nodejitsu is capable of connecting to it. We've got Database hosting if you need it, but we fully support externally hosted Databases. Feel free to drop us an email if you have any questions.

## Connecting Applications to Databases

If you want to connect a Database to your Node.js application, Nodejitsu provides you with sample code for each Database type as well as the ability to specify database connection strings in your application's package.json

     TODO: Add better package.json configuration description


<a name="#Open_source_Projects"></a>
# Open-source Projects

## Why open-source

A lot of Nodejitsu's technology stack is released as open-source software. We choose to do this for many reasons. Aside from being able to give back to the very awesome Node.js community, releasing pieces of our stack as open-source allows other developers to review and improve our software. We've already received invaluable contributions to our platform from developers who would have never seen our code if we had not open-sourced it.

## Where to find

Nodejitsu hosts it's open-source projects on [Github.com](http://github.com/nodejitsu). Github is website for sharing and collobrating on source code. You can get source code without creating an account and if you want to create an account it's free. You'll need a [Git](http://gitscm.org/) client if you wish to check out any of our code repositories. 

You can visit our open-source project directory at: [http://github.com/nodejitsu](http://github.com/nodejitsu)

## How to contribute

Anyone can contribute to any Nodejitsu open-source projects at anytime. [Github](http://github.com/nodejitsu) has the facilities for managing patches, issues, code comments, version control, etc. If you have any questions about a project you sign up and create a Github issue. We'll make sure one our Ninja's gets back to you soon.<a name="Additional_Information"></a>

<a name="Additional_Information"></a>

# Additional Information

## Installing Node.js

### Building and Installing Node.js

### Step 1 - Pick Your Platform

Node should install out of the box on Linux, Macintosh, and Solaris.

With some effort you should be able to get it running on other Unix
platforms and Windows (either via Cygwin or MinGW).

### Step 2 - Prerequisites

Node has several dependencies, but fortunately most of them are
distributed along with it.  If you are building from source you should
only need 2 things.

* **python** - version 2.4 or higher. The build tools distributed with
  Node run on python.

* **libssl-dev** - If you plan to use SSL/TLS encryption in your
  networking, you'll need this.  Libssl is the library used in the
  [openssl](http://www.openssl.org/) tool. On Linux and Unix systems
  it can usually be installed with your favorite package manager. The
  lib comes pre- installed on OS X.

### Step 3a - Installing on Unix (including BSD and Mac)

**Building from source**

Use make to build and install Node (execute the following on the command line)

    git clone https://github.com/joyent/node.git
    cd node
    export JOBS=2 # optional, sets number of parallel commands.
    mkdir ~/local
    ./configure --prefix=$HOME/local/node
    make
    make install
    export PATH=$HOME/local/node/bin:$PATH

If you have any installation problems, look at [Troubleshooting
Installation](https://github.com/ry/node/wiki/Troubleshooting-Installation), try an [alternate installation method](https://gist.github.com/579814), or stop into [#node.js](http://webchat.freenode.net/?channels=node.js&uio=d4) and ask questions.

**Pre-built binaries**

You can also install node from packages: [[Installing Node.js via package manager]]

### Step 3b - Building on Windows

**Pre-built binaries**

Self-contained binaries are available at [node-js.prcn.co.cc](http://node-js.prcn.co.cc/)

**Building from source**

There are two ways of building Node on Windows. One is over the Cygwin
emulation layer the other is using MinGW (GNU toolchain for
windows). See the
[Cygwin](https://github.com/ry/node/wiki/Building-node.js-on-Cygwin-%28Windows%29)
and [MinGW](https://github.com/ry/node/wiki/Building-node.js-on-mingw)
pages.

Neither builds are satisfactorily stable but it is possible to get
something running.

### Step 4 - Install NPM

NPM is a package manager that has become the de-facto standard for
installing additional node libraries and programs. Here's the quick
and easy one-liner for installing on Unix.

    $ curl http://npmjs.org/install.sh | sh

To install a library e.g. Express:

    $ npm install express

And visit
[https://github.com/isaacs/npm](https://github.com/isaacs/npm) for
details.


## Creating a package.json

A package.json file describes your application and its dependencies. This was written
by isaacs the author of NPM.

This document is all you need to know about what's required in your package.json
file.  It must be actual JSON, not just a JavaScript object literal.

A lot of the behavior described in this document is affected by the config
settings described in `npm help config`.

### name

The *most* important things in your package.json are the name and version fields.
Those are actually required, and your package won't install without
them.  The name and version together form an identifier that is assumed
to be completely unique.  Changes to the package should come along with
changes to the version.

The name is what your thing is called.  Some tips:

* Don't put "js" or "node" in the name.  It's assumed that it's js, since you're
  writing a package.json file, and you can specify the engine using the "engines"
  field.  (See below.)
* The name ends up being part of a URL, an argument on the command line, and a
  folder name. Any name with non-url-safe characters will be rejected.
  Also, it can't start with a dot or an underscore.
* The name will probably be passed as an argument to require(), so it should
  be something short, but also reasonably descriptive.
* You may want to check the npm registry to see if there's something by that name
  already, before you get too attached to it.  http://registry.npmjs.org/

### version

The *most* important things in your package.json are the name and version fields.
Those are actually required, and your package won't install without
them.  The name and version together form an identifier that is assumed
to be completely unique.  Changes to the package should come along with
changes to the version.

Version must be parseable by
[node-semver](https://github.com/isaacs/node-semver), which is bundled
with npm as a dependency.  (`npm install semver` to use it yourself.)

Here's how npm's semver implementation deviates from what's on semver.org:

* Versions can start with "v"
* A numeric item separated from the main three-number version by a hyphen
  will be interpreted as a "build" number, and will *increase* the version.
  But, if the tag is not a number separated by a hyphen, then it's treated
  as a pre-release tag, and is *less than* the version without a tag.
  So, `0.1.2-7 > 0.1.2-7-beta > 0.1.2-6 > 0.1.2 > 0.1.2beta`

This is a little bit confusing to explain, but matches what you see in practice
when people create tags in git like "v1.2.3" and then do "git describe" to generate
a patch version.

### description

Put a description in it.  It's a string.  This helps people discover your
package, as it's listed in `npm ls`.

### keywords

Put keywords in it.  It's an array of strings.  This helps people
discover your package as it's listed in `npm ls`.

### homepage

The url to the project homepage.

**NOTE**: This is *not* the same as "url".  If you put a "url" field,
then the registry will think it's a redirection to your package that has
been published somewhere else, and spit at you.

Literally.  Spit.  I'm so not kidding.

### people fields: author, contributors

The "author" is one person.  "contributors" is an array of people.  A "person"
is an object with a "name" field and optionally "url" and "email", like this:

    { "name" : "Barney Rubble"
    , "email" : "b@rubble.com"
    , "url" : "http://barnyrubble.tumblr.com/"
    }

Or you can shorten that all into a single string, and npm will parse it for you:

    "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)

Both email and url are optional either way.

npm also sets a top-level "maintainers" field with your npm user info.

### files

The "files" field is an array of files to include in your project.  If
you name a folder in the array, then it will also include the files
inside that folder. (Unless they would be ignored by another rule.)

You can also provide a ".npmignore" file in the root of your package,
which will keep files from being included, even if they would be picked
up by the files array.  The ".npmignore" file works just like a
".gitignore".

### main

The main field is a module ID that is the primary entry point to your program.
That is, if your package is named `foo`, and a user installs it, and then does
`require("foo")`, then your main module's exports object will be returned.

This should be a module ID relative to the root of your package folder.

For most modules, it makes the most sense to have a main script and often not
much else.

### bin

A lot of packages have one or more executable files that they'd like to
install into the PATH. npm makes this pretty easy (in fact, it uses this
feature to install the "npm" executable.)

To use this, supply a `bin` field in your package.json which is a map of
command name to local file name. On install, npm will link that file into
place right next to wherever node is installed. (Presumably, this is in your
PATH, and defaults to `/usr/local/bin`.) On activation, the versioned file
will get linked to the main filename (just like how the main.js stuff works,
but with an executable in the PATH.)

For example, npm has this:

    { "bin" : { "npm" : "./cli.js" } }

So, when you install npm, it'll create a symlink from the `cli.js` script to
`/usr/local/bin/npm-version`. Then, when you activate that version, it'll
create a symlink from `/usr/local/bin/npm-version` to `/usr/local/bin/npm`.

Notice that if the executable file is interpreted by node (i.e., specifying
node in the shebang line), npm actually installs a shim instead of symlinking
it, which causes expressions `require.main === module` and `module.id === "."`
evaluate to `false` within the file. This seems unable to be resolved until
node provides a "flexible `require()`".

Shortcut: If you have a single executable, and its name is already what you
want it to be, then you can just supply it as a string.  For example:

    { "bin" : "./path/to/program" }

would be the same as this:

    { "bin" : { "program" : "./path/to/program" } }

### man

Specify either a single file or an array of filenames to put in place for the
`man` program to find.

If only a single file is provided, then it's installed such that it is the
result from `man <pkgname>`, regardless of its actual filename.  For example:

    { "name" : "foo"
    , "man" : "./man/doc.1"
    }

would link the `./man/doc.1` file in such that it is the target for `man foo`

If the filename doesn't start with the package name, then it's prefixed.
So, this:

    { "name" : "foo"
    , "man" : [ "./man/foo.1", "./man/bar.1" ]
    }

will create files to do `man foo` and `man foo-bar`.

Man files must end with a number, and optionally a `.gz` suffix if they are
compressed.  The number dictates which man section the file is installed into.

    { "name" : "foo"
    , "man" : [ "./man/foo.1", "./man/foo.2" ]
    }

will create entries for `man foo` and `man 2 foo`

### directories

The CommonJS [Packages](http://wiki.commonjs.org/wiki/Packages/1.0) spec details a
few ways that you can indicate the structure of your package using a `directories`
hash. If you look at [npm's package.json](http://registry.npmjs.org/npm/latest),
you'll see that it has directories for doc, lib, and man.

In the future, this information may be used in other creative ways.

#### directories.lib

Tell people where the bulk of your library is.  Nothing special is done
with the lib folder in any way, but it's useful meta info.

#### directories.bin

If you specify a "bin" directory, then all the files in that folder will
be used as the "bin" hash.

If you have a "bin" hash already, then this has no effect.

#### directories.man

A folder that is full of man pages.  Sugar to generate a "man" array by
walking the folder.

#### directories.doc

Put markdown files in here.  Eventually, these will be displayed nicely,
maybe, someday.

#### directories.example

Put example scripts in here.  Someday, it might be exposed in some clever way.

### repository

Specify the place where your code lives. This is helpful for people who
want to contribute.  If the git repo is on github, then the `npm docs`
command will be able to find you.

Do it like this:

    "repository" :
      { "type" : "git"
      , "url" : "http://github.com/isaacs/npm.git"
      }

    "repository" :
      { "type" : "svn"
      , "url" : "http://v8.googlecode.com/svn/trunk/"
      }

The URL should be a publicly available (perhaps read-only) url that can be handed
directly to a VCS program without any modification.  It should not be a url to an
html project page that you put in your browser.  It's for computers.

### scripts

The "scripts" member is an object hash of script commands that are run
at various times in the lifecycle of your package.  The key is the lifecycle
event, and the value is the command to run at that point.

See `npm help scripts` to find out more about writing package scripts.

### config

A "config" hash can be used to set configuration
parameters used in package scripts that persist across upgrades.  For
instance, if a package had the following:

    { "name" : "foo"
    , "config" : { "port" : "8080" } }

and then had a "start" command that then referenced the
`npm_package_config_port` environment variable, then the user could
override that by doing `npm config set foo:port 8001`.

See `npm help config` and `npm help scripts` for more on package
configs.

### dependencies

Dependencies are specified with a simple hash of package name to version
range. The version range is EITHER a string which has one or more
space-separated descriptors, OR a range like "fromVersion - toVersion"

**Please do not put test harnesses in your `dependencies` hash.**  See
`devDependencies`, below.

Version range descriptors may be any of the following styles, where "version"
is a semver compatible version identifier.

* `version` Must match `version` exactly
* `=version` Same as just `version`
* `>version` Must be greater than `version`
* `>=version` etc
* `<version`
* `<=version`
* `~version` See 'Tilde Version Ranges' below
* `1.2.x` See 'X Version Ranges' below
* `http://...` See 'URLs as Dependencies' below
* `*` Matches any version
* `""` (just an empty string) Same as `*`
* `version1 - version2` Same as `>=version1 <=version2`.
* `range1 || range2` Passes if either range1 or range2 are satisfied.

For example, these are all valid:

    { "dependencies" :
      { "foo" : "1.0.0 - 2.9999.9999"
      , "bar" : ">=1.0.2 <2.1.2"
      , "baz" : ">1.0.2 <=2.3.4"
      , "boo" : "2.0.1"
      , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
      , "asd" : "http://asdf.com/asdf.tar.gz"
      , "til" : "~1.2"
      , "elf" : "~1.2.3"
      , "two" : "2.x"
      , "thr" : "3.3.x"
      }
    }

#### Tilde Version Ranges

A range specifier starting with a tilde `~` character is matched against
a version in the following fashion.

* The version must be at least as high as the range.
* The version must be less than the next major revision above the range.

For example, the following are equivalent:

* `"~1.2.3" = ">=1.2.3 <1.3.0"`
* `"~1.2" = ">=1.2.0 <2.0.0"`
* `"~1" = ">=1.0.0 <2.0.0"`

#### X Version Ranges

An "x" in a version range specifies that the version number must start
with the supplied digits, but any digit may be used in place of the x.

The following are equivalent:

* `"1.2.x" = ">=1.2.0 <1.3.0"`
* `"1.x.x" = ">=1.0.0 <2.0.0"`
* `"1.2" = "1.2.x"`
* `"1.x" = "1.x.x"`
* `"1" = "1.x.x"`

You may not supply a comparator with a version containing an x.  Any
digits after the first "x" are ignored.

#### URLs as Dependencies

Starting with npm version 0.2.14, you may specify a tarball URL in place
of a version range.

This tarball will be downloaded and installed locally to your package at
install time.

### devDependencies

If someone is planning on downloading and using your module in their
program, then they probably don't want or need to download and build
the external test or documentation framework that you use.

In this case, it's best to list these additional items in a
`devDependencies` hash.

These things will be installed whenever the `--dev` configuration flag
is set.  This flag is set automatically when doing `npm link`, and can
be managed like any other npm configuration param.  See `npm help
config` for more on the topic.

### bundledDependencies

Array of package names that will be bundled when publishing the package.

### engines

Packages/1.0 says that you can have an "engines" field with an array of engine
names. However, it has no provision for specifying which version of the engine
your stuff runs on.

With npm, you can use either of the following styles to specify the version of
node that your stuff works on:

    { "engines" : [ "node >=0.1.27 <0.1.30" ] }

or:

    { "engines" : { "node" : ">=0.1.27 <0.1.30" } }

And, like with dependencies, if you don't specify the version (or if you
specify "*" as the version), then any version of node will do.

If you specify an "engines" field, then npm will require that "node" be
somewhere on that list. If "engines" is omitted, then npm will just assume
that it works on node.

### preferGlobal

If your package is primarily a command-line application that should be
installed globally, then set this value to `true` to provide a warning
if it is installed locally.

It doesn't actually prevent users from installing it locally, but it
does help prevent some confusion if it doesn't work as expected.

### publishConfig

This is a set of config values that will be used at publish-time.  It's
especially handy if you want to set the tag or registry, so that you can
ensure that a given package is not tagged with "latest" or published to
the global public registry by default.

Any config values can be overridden, but of course only "tag" and
"registry" probably matter for the purposes of publishing.

See `npm help config` to see the list of config options that can be
overridden.
