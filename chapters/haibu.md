# Create Your Own Cloud With Haibu
<a name='haibu'></a>

Haibu is an open-source tool for spawning and managing several node.js
applications on a single server. It's an integral part of Nodejitsu's
production stack and is fully supported by a dedicated team of core node.js
developers.

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

## Installation

    [sudo] npm install -g haibu

This will install haibu globally.

## Usage

Haibu comes with three applications, one of which is optional:

* `haibu-server` is the program that manages your node.js web applications.
Haibu-server allows you to manage and track your drones.

* `haibu` is the user interface for interacting with (and administrating) a
running haibu-server.

* `haibu-balancer` \[*optional*\] is a load balancer tool, used to split
requests across  multiple drones of the same application. It is entirely
optional, and many deployments won't have a need for it.

It may be nice to flesh this out with an example deployment, but I think this
should be relatively low priority.


## Additional Documentation

For more documentation, visit haibu's [github page](https://github.com/nodejitsu/haibu).
