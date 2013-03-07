## Get a list of IP addresses for Nodejitsu's balancers

Here's how to set up a custom domain name for your Nodejitsu application.

### Business Plans

First you need to select the datacenter endpoint where your application is running.

* Joyent
  * us-east-1: `*.jit.su`
  * us-sw-1: `*.jyt.us.sw1.jit.su`
  * eu-ams-1: `*.jyt.eu.ams1.jit.su`

* Telefonica
  * eu-lon-1: `*.tf.eu.lon1.jit.su`
  * eu-mad-1: `*.tf.eu.mad1.jit.su`

Then you can obtain the IP addresses using the `host` command with the
datacenter address.

For example, if you want to obtain the IP addresses of the Amsterdam datacenter
`eu-ams-1`, you need to run the following:

``` bash
$ host example.jyt.eu.ams1.jit.su
example.jyt.eu.ams1.jit.su has address 37.153.97.163
example.jyt.eu.ams1.jit.su has address 37.153.97.50
example.jyt.eu.ams1.jit.su has address 37.153.97.85
example.jyt.eu.ams1.jit.su has address 37.153.97.152
```

---

### Individual Plans

_Note: Individual plans runs on datacenter `us-east-1`_

You can get the latest version of this list by running:

``` bash
$ host jit.su
jit.su has address 165.225.130.239
jit.su has address 165.225.131.5
jit.su has address 165.225.130.238
jit.su has address 165.225.131.4
jit.su has address 165.225.130.241
jit.su has address 165.225.130.237
jit.su has address 165.225.130.235
jit.su has address 165.225.129.253
jit.su has address 165.225.130.240
```

---

## Set the A-record for your application

Using your DNS provider, modify the A-record for your domain to point to the IP
addresses you found in step 1. This process depends on your DNS hosting
provider. Add **all** of these addresses to your A-records, as they serve as
fallbacks for each other.

---

## Modify your package.json

Nodejitsu uses a special field in your package.json, called "domains", to keep
track of an app's assigned custom domains. For example, an app hosted at
http://awesomeapp.jit.su has the following package.json:

``` javascript
{
  "name": "awesomeapp",
  "subdomain": "awesomeapp",
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

In this example, the "domains" property is a list of domains you want to point
to your application.

---

## Push your changes to nodejitsu

The most painless way to do this, if your app is already running, is to use
`jitsu apps update` to push only your package.json:

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

---

## Test it out!

http://www.myawesomedomain.com

Don't forget to give it some time so DNS resolves, add a "powered by Nodejitsu"
badge to your homepage (or just give a shout-out on Twitter)

[meta:title]: <> (Using my domain (DNS))
