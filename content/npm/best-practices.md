This is meant to be a non-exhaustive list of best practices when using `npm`.

### Publish modules using `publishConfig`

The `publishConfig` in your package.json does the following (from the [npm documentation](https://github.com/isaacs/npm/blob/master/doc/files/package.json.md#publishconfig)):

> This is a set of config values that will be used at publish-time. It's especially
> handy if you want to set the tag or registry, so that you can ensure that a given
> package is not tagged with "latest" or published to the global public registry by default.
>
> Any config values can be overridden, but of course only "tag" and "registry" probably
> matter for the purposes of publishing.

For example:

``` js
  {
    "publishConfig": { "registry": "https://your-subdomain.registry.nodejitsu.com" }
  }
```

The benefits of using `publishConfig` is that it avoids accidental publishes to the public registry due to user error. Take for example a developer on your team who has not properly configured their machine by running `npm config set registry` or using the `--reg` flag. _That command would send your code public._ By using the `publishConfig` property you avoid that because it is part of your application.

### Don't run `npm install` on your production machines

The calculus of [semver][semver] (semantic versioning) makes `npm install` dangerous on your production machines. Here's an example:

1. You deploy your code to five machines at the same time. Everything is great
2. The next day you spin up two more machines.
3. In that day, a new version of a dependency was released.

Now your production machines have different dependencies satisfying the same `package.json` for your application. The solution? **Deploy a pre-built tarball** using something like `module-foundry`. `module-foundry` was developed by Nodejitsu for its Platform-as-a-Service product and you can think of it as "npm install as a service": you send it a package.json and it will return you a fully built tarball. For more information on [module-foundry checkout the Github repository][module-foundry]

[meta:title]: <> (npm Best Practices)

[module-foundry]: https://github.com/nodejitsu/module-foundry
[semver]: http://semver.org