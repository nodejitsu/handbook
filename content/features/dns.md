Here's how to set up a custom domain name for your Nodejitsu app:

## Get a list of ip addresses for Nodejitsu's balancers:

If you're on the command line, you can get the latest version of this list by running:

``` bash
$ host nodejitsu.com
nodejitsu.com has address 165.225.131.5
nodejitsu.com has address 165.225.129.253
nodejitsu.com has address 165.225.130.235
nodejitsu.com has address 165.225.130.237
nodejitsu.com has address 165.225.130.238
nodejitsu.com has address 165.225.130.239
nodejitsu.com has address 165.225.130.240
nodejitsu.com has address 165.225.130.241
nodejitsu.com has address 165.225.131.4
```

## Set the A-record for your app

Using your DNS provider, modify the A-record for your domain to point to the ip addresses you found in step 1. This process depends on your DNS hosting provider. Add **all** of these addresses to your A-records, as they serve as fallbacks for each other.

## Modify your package.json

Nodejitsu uses a special field in your package.json, called "domains", to keep track of an app's assigned custom domains. For example, the app hosted at http://jesusabdullah.jit.su has the following package.json:

``` javascript
{
  "name": "myapp",
  "subdomain": "myapp",
  "domains": [
    "myawesomedomain.com",
    "www.myawesomedomain.com"
  ],
  "scripts": {
    "start": "server.js"
  },
  "version": "0.0.1",
  "engines": {
    "node": "0.8.x"
  }
}
```

In this example, the "domains" property is a list of domains you want to point to your application.

## Push your changes to nodejitsu

The most painless way to do this, if your app is already running, is to use `jitsu apps update` to push only your package.json:

``` bash
$ jitsu apps update
info:   Welcome to Nodejitsu
info:   It worked if it ends with Nodejitsu ok
info:   Executing command apps update
info:   Authenticated as nodejitsu_user
info:   Updating application myapp with:
data:   {
data:       domains: [ 'myawesomedomain.com', 'www.myawesomedomain.com' ]
data:   }
info:   Nodejitsu ok
```

## Test it out!

http://www.myawesomedomain.com

Don't forget to give it some time so DNS resolves, and add a "powered by Nodejitsu" badge to your homepage (or just give a shout-out on Twitter)

[meta:title]: <> (Using my domain (DNS))
