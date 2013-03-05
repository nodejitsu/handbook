<hr>
**[package.json.jit.su](http://package.json.jit.su) is an interactive package.json properties explorer! Highly recommended.**
<hr>

## Understanding the package.json format
A package.json file describes your application, its dependencies, and other various application metadata. For a detailed spec on creating a package.json you can check out Isaac's fine documentation [here](https://npmjs.org/doc/json.html). 

<hr>
## Preparing a package.json for your application

Nodejitsu requires that you create a valid [package.json](#package_json) for your application. The package.json will determine certain important pieces of information about your application which are required for deployment. Since sometimes it can get confusing when constructing your package.json file, we provide wizards in our CLI tool and on our website for creating one. 

Here is an example of what your package.json might look like:

``` javascript
{
  "name": "hellonode",
  "subdomain": "hellonode",
  "scripts": {
    "start": "node server.js"
  },
  "version": "0.0.0",
  "engines": {
    "node": "v0.8.x"
  }
}
```

Notice the "scripts" property? This is where you'll store information about specific scripts in your application. The "start" property indicates the script that will get called when your application is started. Usage is compatible with `npm start`.

And what about that "engines" property? Nodejitsu support [multiple versions of node](/features#feature/multi-node)

<hr>
## Specifying dependencies in your package.json

If your application requires additional dependencies or third-party libraries, Nodejitsu fully supports npm module dependency resolution. All you have to do is list your dependencies the exact same way you would if you were packaging a module for npm. Here is an example of the same package.json with a few dependencies.

<a name="package_json"></a>
``` javascript
{
  "name": "hellonode",
  "subdomain": "hellonode",
  "scripts": {
    "start": "server.js"
  },
  "dependencies": {
    "async": "0.1.x",
    "colors": "0.5.x",
    "request": "1.9.x"
  },
  "version": "0.0.0",
  "engines": {
    "node": "v0.8.x"
  }
}
```

Your dependencies will be resolved when your application deploys to Nodejitsu.

**TIP:** When installing your dependencies, use the `--save` flag like `npm install --save flatiron` to add the dependencies and theirs versions to the package.json

<hr>
## Nodejitsu-Specific package.json Properties

A few package.json properties have special behavior on the Nodejitsu platform:

* *subdomain*: Specify the subdomain for your hosted app's nodejitsu url (for example, `subdomain.nodejitsu.com`.
* *domains*: A list of custom domains for your hosted app. See <http://handbook.jitsu.com/features/dns>.
* *env*: Specify environment variables for your app (for example, NODE_ENV="production" is set by default).
* *scripts.start*: This field is also used for `npm start`. However, nodejitsu's current implementation takes a path, whereas npm's implementation takes a shell command.
* *analyze*: Set this to "false" to force jitsu to not analyze for the app's dependencies.
* *engine*: On Nodejitsu you can choose between different available node.js versions. [Read more](/features#feature/multi-node)

[meta:title]: <> (Get into package.json)
[meta:description]: <> (package.json.jit.su is an interactive package explorer, it will get you started quickly and is highly helpful)
