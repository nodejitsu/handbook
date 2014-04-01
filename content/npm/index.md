# Private npm

* [Getting Started](#getting-started)
* [Web Interface][web-interface]
* [User management][user-management]
* [Package management][package-management]
* [Troubleshooting][troubleshooting]
* [FAQ][faq]

In this getting started guide you will get setup with your Enterprise Private npm registry from Nodejitsu as well as learn about some of the best practices for working with `package.json` files.

<hr>

## Getting Started

<div style="text-align:center;margin:20px 0;">
  <iframe src="//player.vimeo.com/video/86596362" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

### 1. Configure the npm CLI

Just like the public registry, the `npm` CLI program is what you'll use to install, publish and otherwise interact with npm modules. Nodejitsu Enterprise private npm has two changes in the configuration to your npm CLI client:

```
npm config set always-auth true
npm config set ca ""
```

Why do you need to do these things?

* _Every request requires authentication:_ This means that users you have not authorized cannot download packages from your private npm. Since this is not the default behavior of the public npm you need to set:
```
npm config set always-auth true
```
* _Trust industry standard CAs:_ We use DigiCert for our SSL certificate to `*.registry.nodejitsu.com` which is a different CA than the one used by `https://registry.npmjs.org`. As such you need to tell your `npm` CLI client to trust all industry standard Certificate Authorities (CAs):
```
npm config set ca ""
```

### 2. Start making requests against your private npm

Requests can be made against your private npm in two ways:

* _Set the registry for all requests:_ This means that every request will hit your private registry
```
  npm config set registry https://your-subdomain.registry.nodejitsu.com
```
* _Use the `--reg` flag when necessary:_ The `--reg` flag (short for `--registry`) will allow you to make any request against your private registry:
```
  npm info your-private-module --reg http://your-subdomain.registry.nodejitsu.com
```

**We recommend that **you set the registry for all requests** to avoid any accidental publishes of private modules to the public registry. Since all new publishes go by default to your private npm registry when you need **to publish a new public npm package** you can explicitly set the `--reg` flag:

```
  cd /my/new/public/package
  npm init
  npm publish --reg https://registry.npmjs.org
```

### 3. Login to the web interface

```
http://your-subdomain.npm.nodejitsu.com
```

More information available at the [Web Interface Documentation](/npm/web)

### PROTIP: Publish modules using `publishConfig`

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


[web-interface]: /npm/web
[faq]: /npm/faq

[meta:title]: <> (Hosted private npm)
