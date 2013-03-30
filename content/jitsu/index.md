# Jitsu

Jitsu is a Command Line Tool (CLI) for managing and deploying Node.js
applications. It's open-source and easy to use. We've designed jitsu to
be suitable for command line beginners, but still be powerful and
extensible enough for production usage. Jitsu's commands are available as user
interface in [webops][webops]. Jitsu day to day use:

* [Login](#login)
* [Logout](#logout)
* [Deploy management](#additional-commands)

## Install and first time use

Before using Jitsu a quick and easy installation is required. If required you
can signup after. `npm` is required for installing the `jitsu` package.

```bash
[sudo] npm install jitsu -g
```

If you prefer using git repositories over the package you can also install
`jitsu` by cloning the repository and linking with npm after. This would also
allow you to contribute to jitsu more easily.

```bash
git clone git@github.com:nodejitsu/jitsu.git
[sudo] npm link
```

## Sign up
Most of you will sign up to Nodejitsu by using our [web interface][webops] or
by using the [signup form][signup]. If you prefer signing up on the command
line however, execute:

```bash
jitsu signup
```

Choose your preferred username and provide a password. If your username is
already taken you will be provided with adequate feedback. Make sure you enter a
valid e-mail address.

## Login

Before accessing our API through jitsu a login is required. You will be prompted
to provide you username and password. Your password will be hidden, e.g. if you
type you'll not see any characters. Don't worry it is working as intended. After
your logged in every command you execute with `jitsu` is against your account.

```bash
jitsu login
```

After providing the correct credentials you should see

```bash
info:    Authenticated as [username]
info:    Nodejitsu ok
```

## Logout

If you would like to switch between users or make sure you logged out, for
instance when you're on a public device, simply execute

```bash
jitsu logout
```

## Demo

We reduced the hurdle of the first step by preparing some demo applications.
To try one make sure you are in a writable directory, e.g. your home folder.
See below for an example of installing the helloworld demo server. If you would
like to choose another demo, simply type `jitsu install`

```bash
jitsu install helloworld
```

If you receive an `EACCES` error the current directory is not writable for
jitsu. If all goes well, you will be prompted to start the application, by
default the server will be listening to *port 8080*. To check the results
visit *http://localhost:8080/*. If you get an `EADDRINUSE` error the *port 8080*
is already in use. Close the other application before starting the helloworld
demo.

This application is running locally, see [deploying][deploy] under
additional commands to get it running on our cloud.

## Additional commands

Jitsu is a very powerful tool with numerous additional tools. See more
documentation about:

* [Deploying][deploy]
* [Managing application](/jitsu/apps/)
* [View the logs](/jitsu/logs/)
* [Environment control](/jitsu/env/)
* [Manage snapshots](/jitsu/snapshots/)
* [Jitsu configuration](/jitsu/conf/)
* [User management](/jitsu/user/)
* [Manage databases](/jitsu/databases/)
* [Control your tokens](/jitsu/tokens/)

*Useful commands for business plans*

* [Your cloud](/features/business/)

[deploy]: /jitsu/deploy/
[signup]: https://www.nodejitsu.com/signup/
[webops]: https://webops.nodejitsu.com/
[meta:title]: <> (Jitsu CLI)
