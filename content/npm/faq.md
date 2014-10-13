# Hosted private npm FAQ

### Will my private registry stay up If the public registry goes down?
Yes, it will remain online and you will be able to use `npm` without problems.

### Can anyone else access my registry?
Only the team members defined in the Web Interface can access your registry.

### Why do I need to do change your `npm` CLI configuration?

Because Nodejitsu's private npm works on two simple assumptions:

* *Every request requires authentication:* This means that users you have not authorized cannot download packages from your private npm. Since this is not the default behavior of the public npm you need to set:

```
npm config set always-auth true
```

* *We have our SSL certificates*: Our private npm registry has it's own FQTLD using a multi-level wildcard certificate issued by [DigiCert](http://www.digiserver.com/) and serves `https://*.registry.nodejitsu.com`, so you'll need to tell the `npm` CLI to allow for standard global Certificate Authorities (CA):

```
npm config set ca ""
```

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
You will need to resync your new password with your private npm registry. You can do this by:
```
npm login --reg=https://registry.nodejitsu.com
```
**If you are using `npm@2.x.x`** you will need to also run login _again_ against your fully qualified registry host:
```
npm login --reg=https://<your-subdomain>.registry.nodejitsu.com --always-auth=true
```
This is because as of `npm@2.0.0` the `npm` CLI now supports multiple registry configurations which both need to be properly configured with your user information.

### How do I publish **new** public modules?

Since all new publishes go by default to your private npm registry when you need **to publish a new public npm package** you must explicitly set the `--reg` flag:
```
npm publish --reg https://registry.npmjs.org
```

### How do I make a private npm module public?

If you've built a private module that you now want to make public, first: congrats! Open source for the win. In order to turn a private module on Nodejitsu private npm into a public module on the public npm registry you must:

1. **Check to see if the name is available:** If the module name is not available in the global public npm namespace, you will have to change the name of the new public module. To check this:
```
$ npm view some-package-name
npm http request GET https://demo.registry.nodejitsu.com/some-package-name
npm http 400 https://demo.registry.nodejitsu.com/some-package-name
npm ERR! Darwin 12.5.0
npm ERR! argv "node" "/Users/charlie/.local/bin/npm" "view" "some-package-name" "--loglevel=http"
npm ERR! node v0.10.32
npm ERR! npm  v2.1.4
npm ERR! code E400

npm ERR! 404 Not Found: some-package-name
npm ERR!
npm ERR! If you need help, you may report this error at:
npm ERR!     <http://github.com/npm/npm/issues>

npm ERR! Please include the following file with any support request:
npm ERR!     /Users/charlie/Git/nodejitsu/handbook/npm-debug.log
```
Here the `npm ERR!` output **is good.** It means that `some-package-name` does not exist in the public npm registry.
2. **Publish it to the public npm registry explictily:** Since all new publishes go by default to your private npm _new_ public modules must explictly be published to the public npm registry using the `--reg` flag:
```
npm publish --reg https://registry.npmjs.org
```
3. **Unpublish it from your private npm registry:** Now that you have the public module setup, it is time to remove your original private copy:
```
npm unpublish some-package-name --force --reg=https://<your-subdomain>.registry.nodejitsu.com
```

### Can I publish scoped modules to my private npm?
The short answer is: no, but soon! The long answer is that registering scopes to use with scoped modules is still very nacent and we are approaching this new feature cautioniously to avoid breaking backwards compatibility with any existing customers or clients.

[meta:title]: <> (FAQ)