## Quickstart

This quickstart will get setup with your Hosted Private npm registry from Nodejitsu. But first, if you haven't already take a look at this 4 minute introduction to our private npm registry:

<div style="text-align:center;margin:20px 0;">
  <iframe src="//player.vimeo.com/video/86596362" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

For your copy and paste pleasure, all the commands you need to get started on in one place:

```
npm config set always-auth true
npm config set ca ""
npm login --reg https://registry.nodejitsu.com
npm config set registry https://<your-subdomain>.registry.nodejitsu.com
```

What exactly is this doing for to your `npm` client? We're glad you asked:

### 1. Configure the npm CLI

Just like the public registry, the `npm` CLI program is what you'll use to install, publish and otherwise interact with npm modules. Nodejitsu Enterprise private npm has two changes in the configuration to your npm CLI client:

```
npm config set always-auth true
npm config set ca ""
```

### 2. Login

To use a private npm from Nodejitsu you need to sync your public npm credentials with us. To do this you simply run:
```
npm login --reg=https://registry.nodejitsu.com
```

**If you are using `npm@2.x.x`** you will need to also run login _again_ against your fully qualified registry host:
```
npm login --reg=https://<your-subdomain>.registry.nodejitsu.com --always-auth=true
```
This is because as of `npm@2.0.0` the `npm` CLI now supports multiple registry configurations which both need to be properly configured with your user information.

### 3. start making requests against your private npm

We recommend that you set your private npm registry as your default registry for all requests. This ensures that no one accidentally publishes a module publicly.
```
  npm config set registry https://your-subdomain.registry.nodejitsu.com
```

Alternatively, you can _ue the `--reg` flag when necessary._ The `--reg` flag (short for `--registry`) will allow you to make any request against your private registry:
```
  npm info your-private-module --reg http://your-subdomain.registry.nodejitsu.com
```

More information available at the [`npm` Command Line Interface Documentation][cli] and our [FAQ][faq].

### 4. Login to the Web Interface

```
http://your-subdomain.npm.nodejitsu.com
```

More information available at the [Private npm Web Interface Documentation][web-interface].

[web-interface]: /npm/web
[cli]: /npm/cli
[faq]: /npm/faq