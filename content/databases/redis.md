# Database provisioner's

## IrisCouch

- 10 MB of free store


## Connecting using the redis-cli CLI tool

If you have Redis running locally, you will probably have the `redis-cli`
installed as well.

```bash
redis-cli -h <hostname> -p <port> -a <password>
```

Once you are connected you can simply any of the Redis commands. You can type a
simple `ping` or `info` command to check if the connection is working as
intended.

## Connecting to Redis using the Node.js redis module

The `redis` module is a complete Redis client for Node.js. It supports all the
commands including support for `EVAL`. The module makes use of it's own pure
JavaScript parser but has the option to the official `hiredis` C library for
parsing. The C library however is not compatible with Smart OS (the operating
system that Nodejitsu run on) so it's not advised to enable this.

To install the driver simply run:

```bash
npm install redis --save
```

Once you have it installed you can use it like this:

```javascript
'use strict';

var redis = require('redis'),
    client = redis.createClient(/* port number*/, /* host name*/);

client.auth(/* password */, function auth(err) {
  // In this example we throw the error but normally you would retry or fall
  // back to a different server.
  if (err) throw err;

  // No error, you are now authenticated with the redis server.
});

// You don't need to wait for any ready events, as the redis client will queue
// the command internally and send them when you are authenticated.
client.ping(function ping(err) { });
```

There's more dedicated documentation available in the [node-redis][node-redis]
Github repository.

## Connecting to Redis using the IrisCouch Redis module

The `iris-redis` client is a wrapper for the original `redis` client which makes it
easier to connect to the IrisCouch Redis servers. In addition to that it
provides you with the option to upgrade your connection to a direct connection
to reduce the latency between the database and your application. Please note
that this only works if you are in the same data center.

```bash
npm install iris-redis --save
```

If you want to learn more about this special IrisCouch Redis module take a look
at the [iris-redis][iris-redis] Github repository.

[node-redis]: https://github.com/mranney/node_redis#readme
[iris-redis]: https://github.com/iriscouch/iris-redis#readme
[meta:title]: <> (Redis)
