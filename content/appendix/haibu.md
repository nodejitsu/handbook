Haibu is an open-source tool for spawning and managing several node.js
applications on a single server. It's an integral part of Nodejitsu's production
stack and is fully supported by a dedicated team of core node.js developers.

By installing haibu, a user creates a development environment for themselves
that mirrors the functionality of Nodejitsu's cloud platform! Any project that
can be deployed on Nodejitsu can be ran by haibu.

Haibu, which is Japanese for "hive", wraps node.js applications in a "carapace"
and converts them into managed "drones". This approach allows haibu to directly
interact with node.js applications and add all sorts of additional
functionality. Haibu also contains a plugin system, so you can easily add even
more functionality.

Haibu builds on this concept of "drones" and exposes a robust and granular API
for interacting with your node.js applications. At a low level, haibu's API is
exposed as a RESTFul HTTP webservice. Any system that supports basic HTTP
requests can communicate with a haibu server. If you are working in Node.js,
haibu comes with a high-level Node.js API client.

---

## Installation

```
[sudo] npm install haibu -g
```

This will install haibu globally. You can also grab the source
[directly from git](https://github.com/nodejitsu/haibu).

---

## Usage

To start haibu, all you have to do is run `haibu`:

```
$ haibu 
      __                  __               
     / /_    ______  __  / /_     __  __   
    / __ \  / __  / / / /  __ \  / / / /   
   / / / / / /_/ / / / /  /_/ / / /_/ /    
  /_/ /_/  \__,_/ /_/ /_/\___/  \__,_/     

  This is Open Source Software available under
  the MIT License.

  © 2010 Nodejitsu Inc.
  All Rights Reserved - www.nodejitsu.com
  haibu started @ 10.0.1.4 on port 9002 as api-server
    using plugins: config, exceptions, directories, log, http
```

Haibu is an http server that exposes a REST api on port 9002. You can either
access this API client with a regular HTTP client, or use our
[haibu-api](https://github.com/nodejitsu/haibu-api/tree/master/node.js) module.
Unfortunately, jitsu does not work with haibu's HTTP API, only the Nodejitsu
API.

---

## Additional Documentation

For more documentation, visit [haibu's github page](https://github.com/nodejitsu/haibu).

[meta:title]: <> (Run it yourself With Haibu)
