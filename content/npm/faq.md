# Hosted private npm FAQ

### Will my private registry stay up If the public registry goes down?
Yes, it will remain online and you will be able to use `npm` without problems.

### Can anyone else access my registry?
Only the team members defined in the Web Interface can access your registry.

### How can I make sure I don't accidentally publih to the public registry?
We recommend that you set the default to private npm registry. This removes even the slightest chance that your private code could get published publicly accidentally.

```
npm config set https://{your-subdomain}.registry.nodejitsu.com
```

Alternatively, if you're feeling bold: you can use the `publishConfig` property in your `package.json`:

For example:

``` json
{
	"publishConfig": { "registry": "https://your-subdomain.registry.nodejitsu.com" }
}
```

The `publishConfig` in your package.json does the following (from the [npm documentation](https://github.com/isaacs/npm/blob/master/doc/files/package.json.md#publishconfig)):

> This is a set of config values that will be used at publish-time. It's especially
> handy if you want to set the tag or registry, so that you can ensure that a given
> package is not tagged with "latest" or published to the global public registry by default.
>
> Any config values can be overridden, but of course only "tag" and "registry" probably
> matter for the purposes of publishing.

### What happens if I need to change my password on the public npm registry?
Nothing! As long as your `.npmrc` is kept up to date the use of your private npm
will be as seamless as the public registry!

[meta:title]: <> (FAQ)
