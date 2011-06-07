<a name="Using_The_Jitsu_Client"></a>

# Using The Jitsu Client

[Jitsu](http://github.com/nodejitsu/jitsu) is a [Command Line Interface (CLI)](http://en.wikipedia.org/wiki/Command-line_interface) for interacting with the Nodejitsu platform. It's open-source and easy to use. We've designed Jitsu to be suitable for command line beginners, but still be powerful and extensible enough for production usage. If you aren't a fan of the command line or don't have terminal access you can still do everything Jitsu can do through our web admin, [Samurai](http://nodejitsu.com). 

Jitsu requires the Node Package Manager (npm). If you need help installing npm go to: [Installing npm](#Installing_npm)

<a name="Installation"></a>
## Installation

     [sudo] npm install jitsu

<img src="https://github.com/nodejitsu/jitsu/raw/master/assets/jitsu.png"/>

<a name="Usage"></a>
## Usage

`jitsu` is mostly self documenting. After installation, run the `jitsu` command from your command line.

If it's your first time using `jitsu`, you will be prompted to login with an existing account or create a new account.

<img src="https://github.com/nodejitsu/jitsu/raw/master/assets/login.png"/>

**After you've logged in, you can start deploying apps immediately!**

## One-line deployment

    cd /path/to/myapp
    jitsu deploy

This will create a new application, package.json (if you need one), and deploy the current path to [Nodejitsu](http://nodejitsu.com). If it's your first deployment, you'll be prompted for some information such as *subdomain* and *start script* but it's really easy and we promise it will only take a few seconds.

Now just open up your favorite browser, and go to yoursubdomain.nodejitsu.com.  If everything has been set up correctly, then you, too, are on the path of nodejitsu!

If you have any issues deploying your node.js application please feel free to open up an issue on the [Github Issues](https://github.com/nodejitsu/jitsu/issues) section of the jitsu homepage. We'll have someone get back to you in a flash!


## Command Line Usage

`jitsu` is mostly self-documenting. Try any of these commands to get started.


  **Usage:**

    jitsu <resource> <action> <param1> <param2> ...

  **Common Commands:**

  *Deploys current path to [Nodejitsu](http://nodejitsu.com)*

    jitsu deploy

  *Creates a new application on [Nodejitsu](http://nodejitsu.com)*

    jitsu create

  *Lists all applications for the current user*

    jitsu list

  *Additional Commands*

    jitsu apps
    jitsu snapshots
    jitsu users
    jitsu conf
    jitsu logout



### Help

All commands will yield friendly messages to you if you specify incorrect parameters, but we have also included help commands for all available command and configuration options. If you find anything difficult to use, please open up a Github issue or pull request! 

    jitsu help
    jitsu help apps
    jitsu help snapshots
    jitsu help users
    jitsu help config

## .jitsuconf file

All configuration data for your local `jitsu` install is located in the *.jitsuconf* file located in your home directory. Directly modifying this file is not advised. You should be able to make all configuration changes via:

    jitsu config
