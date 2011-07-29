<a name='package'></a>
# Appendix: package.json

## Understanding the package.json format
A package.json file describes your application, its dependencies, and other various application metadata. For a detailed spec on creating a package.json you can check out Isaac's fine documentation [here](https://github.com/isaacs/npm/blob/master/doc/developers.md#readme). 

## Preparing a package.json for your application

Nodejitsu requires that you create a valid [package.json](#package_json) for your application. The package.json will determine certain important pieces of information about your application which are required for deployment. Since sometimes it can get confusing when constructing your package.json file, we provide wizards in our CLI tool and on our website for creating one. 

Here is an example of what your package.json might look like:


    {
      "name": "hellonode",
      "subdomain": "hellonode",
      "scripts": {
        "start": "server.js"
      },
      "version": "0.0.0"
    }

Notice the "scripts" property? This is where you'll store information about specific scripts in your application. The "start" property indicates the script that will get called when your application is started. 

## Specifying dependencies in your package.json

If your application requires additional dependencies or third-party libraries, Nodejitsu fully supports npm module dependency resolution. All you have to do is list your dependencies the exact same way you would if you were packaging a module for npm. Here is an example of the same package.json with a few dependencies.


    {
      "name": "hellonode",
      "subdomain": "hellonode",
      "scripts": {
        "start": "server.js"
      },
      "dependencies": {
        "async": ">= 0.1.8",
        "colors": ">= 0.5.0",
        "request": ">= 1.9.0",
        "vows": ">= 0.5.8",
      },
      "version": "0.0.0"
    }

Your dependencies will be resolved when your application deploys to Nodejitsu.
