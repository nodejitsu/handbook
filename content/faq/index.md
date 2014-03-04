# For more information about pricing, see [the pricing FAQ](http://nodejitsu.com/paas/faq.html).

 * [How do I reset my password?](#how-do-i-reset-my-password)
 * [Is there a cheatsheet somewhere?](#is-there-a-cheatsheet-somewhere)
 * [How are programs kept alive? Do I need to use Forever?](#how-are-programs-kept-alive-do-i-need-to-use-forever)
 * [How can I make my app use a port other than port 80?](#how-can-i-make-my-app-use-a-port-other-than-port-80)
 * [How do I make Koding work with jitsu?](#how-do-i-make-koding-work-with-jitsu)
 * [Can I use jitsu with Cloud9 IDE?](#can-i-use-jitsu-with-cloud9-idehttp:c9.io)
 * [How can I turn off the require-analyzer in jitsu? I want to manage my own dependencies!](#how-can-i-turn-off-the-require-analyzer-in-jitsu-i-want-to-manage-my-own-dependencies)
 * [How Do I add my GitHub repository as a dependency?](#how-do-i-add-my-github-repository-as-a-dependency)
 * [Why won't this C++ addon compile?](#why-wont-this-c-addon-compile)
 * [How do I specify which files not to bundle? How do I know what files are getting bundled?](#how-do-i-specify-which-files-not-to-bundle-how-do-i-know-what-files-are-getting-bundled)
 * [How do I fix 'Error: package.json error: can't find starting script'?](#how-do-i-fix-error:-package.json-error:-cant-find-starting-script)
 * [How do I choose what port to use in Nodejitsu?](#how-do-i-choose-what-port-to-use-in-nodejitsu)
 * [I'm getting an error: listen EACCESS when starting my application in Nodejitsu](#im-getting-an-error:-listen-eaccess-when-starting-my-application-in-nodejitsu)
 * [How do I force my clients to use HTTPS with my application?](#how-do-i-force-my-clients-to-use-https-with-my-application)
 * [How do I change the timezone on my drone?](#how-do-i-change-the-timezone-on-my-drone)
 * [How do subdomains work and what are the valid subdomains?](#how-do-subdomains-work-and-what-are-the-valid-subdomains)
 * [Where are personal plan drones hosted?](#where-are-personal-plan-drones-hosted)
 * [Can I use cluster to improve the availability of my app?](#can-i-use-clusterhttps:github.comlearnboostcluster-to-improve-the-availability-of-my-app)
 * [When we push our app to Nodejitsu, does it start a new instance, then cut the traffic over from the old one if successful? Or would the app be down if something went wrong?](#when-we-push-our-app-to-nodejitsu-does-it-start-a-new-instance-then-cut-the-traffic-over-from-the-old-one-if-successful-or-would-the-app-be-down-if-something-went-wrong)
 * [Why is the subdirectory or its content not deployed to Nodejitsu?](#why-is-the-subdirectory-or-its-content-not-deployed-to-nodejitsu)
 * [How can I change the name of my application?](#how-can-i-change-the-name-of-my-application)
 * [How can I use Socket.IO alongside a http server?](#how-can-i-use-socket.io-alongside-a-http-server)
 * [Can I write to the file system? What are the limits?](#can-i-write-to-the-file-system-what-are-the-limits)
 * [I'm getting a HTTP 401 error when using Twitter API. How do I fix it?](#im-getting-a-http-401-error-when-using-twitter-api.-how-do-i-fix-it)
 * [What libraries/binaries can I use?](#what-librariesbinaries-can-i-use)
 * [What are the outgoing IPs?](#what-are-the-outogoing-ips)
 * [How can I tail the logs of my application?](#how-can-i-tail-the-logs-of-my-application)
 * [Can I deploy a Meteor application to Nodejitsu?](#can-i-deploy-a-meteor-application-to-nodejitsu)
 * [How to generate a SSL CSR (Certificate Signing Request) for my Custom Domain?](#how-to-generate-a-ssl-csr-certificate-signing-request-for-my-custom-domain)
 * [How to upload my SSL certificates to Nodejitsu?](#how-to-upload-my-ssl-certificates-to-nodejitsu)
 * [How to target an application through a specific load balancer?](#how-to-target-an-application-through-a-specific-load-balancer)
 * [How to target a specific drone of an application?](#how-to-target-a-specific-drone-of-an-application)
 * [How to share my account without sharing my password?](#how-to-share-my-account-without-sharing-my-password)
 * [How to run bower install before a deploy?](#how-to-run-bower-install-before-a-deploy)


## How do I reset my password?

One way is to use jitsu. Simply type:

```
jitsu users forgot :username
```

where `:username` is your username. Alternately, go to
http://webops.nodejitsu.com/ and click the "login" link; then search for the
link "Did you by any chance forgot your password?", where you will be prompted
for your username. Either process will send you an email with further
instructions.

---

## Is there a cheatsheet somewhere?

There sure is! Check out http://cheatsheet.nodejitsu.com.

---

## How are programs kept alive? Do I need to use Forever?

Nodejitsu's cloud services watch your programs for you! You shouldn't have to do
anything special to keep your apps running, much less use
[Forever](https://github.com/nodejitsu/forever) or similar tools.

---

## How can I make my app use a port other than port 80?

Connecting to other servers using arbitrary ports requires no special
considerations. However, *listening* for outside connections is currently
limited to port 80 on the Nodejitsu platform because we require http host
headers for domain name resolution of subdomains. Consequentially, each
subdomain may only host one listening service. Note that this does not mean you
can only listen to port 80 from your app; since Nodejitsu redirects it to port
80 you can listen on any port from your app. However, you can only access your
app *externally* through port 80.

The ability to host TCP applications on nodejitsu and listen on non-80 ports is
on our roadmap but has no associated timeline.

---

## How do I make Koding work with jitsu?

By default, Koding will not install packages globally, due to a permission
error. You can fix this by setting the npm prefix to a location that you have
permissions to access, like your home directory. To do this, simply run:

```
npm config set prefix ~
```

And then you can install jitsu normally:

```
npm i jitsu -g
```

---

## Can I use jitsu with [Cloud9 IDE](http://c9.io)?

Yes! Follow these steps to install jitsu:

1. Install the latest npm globally: `npm install -g npm`
2. Install the latest jitsu locally: `npm install jitsu`

Now you can use jitsu as usual. If you get error, try
`npm rm -g jitsu && npm cache clean`.

---

## How can I turn off the require-analyzer in jitsu? I want to manage my own dependencies!

There are three ways to disable the require-analyzer:

* Use the `--noanalyze` flag when running jitsu commands to disable it on a
  one-time basis.
* Add `"analyze": false` to your package.json to disable it on a per-app basis.
* Set "analyze" to `false` in your jitsu config using the command: `jitsu config
  set analyze false` to disable it on a global level, or add the option to the
  config file `~/.jitsuconf`

---

## How Do I add my GitHub repository as a dependency?

Use the following format: `https://github.com/:user/:repo/tarball/:branch`

---

## Why won't this C++ addon compile?

Many [C++ addons](http://nodejs.org/docs/latest/api/addons.html) require
libraries that are not included in Nodejitsu's infrastructure by default. For
example, [node-canvas](https://github.com/learnboost/node-canvas) requires
[cairo](http://cairographics.org/). Nodejitsu has cairo and many other such
libraries, but may not have some more obscure ones.

---

## How do I specify which files not to bundle? How do I know what files are getting bundled?

`jitsu` uses npm to bundle files, meaning that jitsu bundles files in exactly
the same manner than npm bundles published modules. You can read about this in
[npm's documentation](http://npmjs.org/doc/developers.html).

In more detail: npm uses a file called `.npmignore`, which should contain a list
of files and folders to ignore for the purpose of bundling. If this file does
not exist, npm will use git's ignore file, called `.gitignore`, instead. This
means that, if you want to bundle files that are ignored by git, you should
create an `.npmignore` even if it's blank.

Finally, jitsu has the ability to bundle your app without deploying with the
`jitsu package create` command. You can use this to make sure that the resulting
.tgz file is as you expect.

---

## How do I fix 'Error: package.json error: can't find starting script'?

Nodejitsu requires a starting script in the package.json to know which script to
run to start your application. You need to make sure that the scripts.start
field in your package.json points to the correct starting script.

A common issue is using `node app` as the value of scripts.start in your
package.json. This won't work on Nodejitsu because the file extension is not
specified. You'll need to do something along the lines of `node app.js`.You can
also use just the name of the main file, `app.js`.

---

## How do I choose what port to use in Nodejitsu?

At Nodejitsu it's super important for us that you can run your application just
like you do in your local machine. That said, you don't have to choose a
specific port: just make sure it is either 80 or > 1024. __(to listen on those
ports you need to run with `sudo`, and we don't do that in our servers. Port 80
gets overriden to 1024)__.

Internally our load balancers know what port your application is listening on.
If you chose port `1337` our load balancer will proxy the traffic that is
directed to your Nodejitsu application (e.g. foo.jit.su) on port `80` to
whatever the port you choose in your application (e.g. 1337).

---

## I'm getting an error: listen EACCESS when starting my application in Nodejitsu

Check the answer above, [How do I choose what port to use in
Nodejitsu?](#faq-how-do-i-choose-what-port-to-use-in-nodejitsu).
You are trying to use a root level port (between 0-1024). Please set your app to
listen on a port greater than 1024.

---

## How do I force my clients to use HTTPS with my application?

You'll need to redirect your clients to the HTTPS address when they make a
request with HTTP. See the following code for an example:

``` javascript
// http
var http = require('http');

var server = http.createServer(function (req, res) {
  // optional, for HSTS
  // see https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
  res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');

  if (req.headers['x-forwarded-proto'] !== 'https') {
    var url = 'https://' + req.headers.host + '/';
    res.writeHead(301, {'location': url});
    return res.end('Redirecting to <a href="' + url + '">' + url + '</a>.');
  }
});

server.listen(8080);

//express
var express = require('express');

var app = express();

app.use(function (req, res, next) {
  // see above
  res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');

  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, 'https://' + req.headers.host + '/');
  }

  next();
})

app.listen(8090);
```

---

## How do I change the timezone on my drone?

You can set the `TZ` environment variable with `jitsu env`. A list of time zones
can be found [here](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Here is an example:

```
jitsu env set TZ America/Los_Angeles
```

---

## How do subdomains work and what are the valid subdomains?

Valid subdomains are strings 1-n characters long that begin and end with
alphanumerical characters while the remaining letters can be alphanumerics,
hyphen or a underscore.

Valid subdomains would be:

+ helloworld.nodejitsu.com
+ hello-world.nodejitsu.com
+ hello_world.nodejitsu.com

_Note: the use of periods in subdomains is deprecated._

---

## Where are personal plan drones hosted?

Drones for personal plans on Nodejitsu are hosted on Joyent's us-east-1 datacenter.
Note that this is only for personal plans, business plan users are able to choose
their datacenter.

---

## Can I use [cluster](https://github.com/LearnBoost/cluster) to improve the availability of my app?

Nodejitsu's cloud services watch your programs for you! You shouldn't have to do
anything special to keep your apps running. If you need to scale your app, we
offer the simple way of "[drones](/features/#feature/drones)", where you can add
more drones to fit your needs.

---

## When we push our app to Nodejitsu, does it start a new instance, then cut the traffic over from the old one if successful? Or would the app be down if something went wrong?

We always provision a new virtual machine. The old one gets decommissioned if
and only if everything went ok, so a failed deploy does not equate to down time.

---

## Why is the subdirectory or its content not deployed to Nodejitsu?

Execute `npm pack` inside your application and make sure that the resulting
package includes the file. Nodejitsu uses the same command when deploying
your app.

In case it is not included in the package, you should look into your
`gitignore` and/or `.npmignore` files to ensure that the folder or
contained files are not ignored. Note that any files/folders starting with
`.` like `.DS_Store` are ignored by default and some special ones like `.git`
cannot be unignored since npm prevents that.

To explicitly unignore a file use `!filename` inside either `.gitignore` or
`.npmignore`.

---

## How can I change the name of my application?

Changing the name is possible, however there's just one caveat. After the name
change you will loose previous snapshots and other configured settings.

To change the application name do `jitsu destroy`, confirm and finally redeploy
with `jitsu deploy`. Both commands must be executed within the project folder.

---

## How can I use Socket.IO alongside a http server?

We reroute all traffic to port 80. To use a http server and socket.IO over the
same port, you need to tie socket.IO in http. [Socket.IO documentation][docs] will
provide a clear example or try our demo app `jitsu install socket.io`.
To give you a general idea of the logic:

```
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);
```

---

## Can I write to the file system? What are the limits?

File system on our virtual machines is both readable and writable, but does not
persist across deploys. Capacity of the file system is 3 GB.

---

## I'm getting a HTTP 401 error when using Twitter API. How do I fix it?

This is most likely related to different time zone on our and Twitter's servers.
To ensure consistency, do `jitsu env set TZ GMT`. This will force your application
to use GMT timezone.

---

## What libraries/binaries can I use?

We install following libraries and binaries on our servers:

  * git
  * OpenSSL
  * Python 2.7
  * [gd](http://www.boutell.com/gd/)
  * [cairo](http://cairographics.org/)
  * pkg-config
  * xproto
  * renderproto
  * kbproto
  * [giflib](http://sourceforge.net/projects/giflib/)
  * [libjpeg](http://libjpeg.sourceforge.net/)
  * [libpng](http://www.libpng.org/pub/png/libpng.html)
  * [ImageMagick](http://www.imagemagick.org/script/index.php)
  * [GraphicsMagick](http://www.graphicsmagick.org/)
  * zip
  * unzip
  * bzip2
  * gzip
  * [libxml2](http://www.xmlsoft.org/)
  * GeoIP
  * [gmp](http://gmplib.org/)
  * [icu](http://site.icu-project.org/)
  * PostgreSQL 9.1 client
  * gmake
  * gcc
  * [ffmpeg](http://www.ffmpeg.org/)

And all of their dependencies.

If you need a specific library and it's missing, we'll do our best to install it.
Please email support@nodejitsu.com or hit us up in IRC.

---

## What are the outgoing IPs?

If you are connecting to a remote host from Nodejitsu, you'll see a connection
from one of those IPs, depending on which data center your application is in:

  * Joyent, `us-east-1`: 165.225.134.101, 165.225.134.102, 165.225.134.103, 165.225.134.104

---

## How can I tail the logs of my application?

Simply issue `jitsu logs tail` locally from the applications directory or visit
webops. Additional information can be found at
[tailing logs](https://npmjs.org/package/demeteorizer).

---

## Can I deploy a Meteor application to Nodejitsu?
Yes, you can!

We support `npm` deployments so you'll need to convert your Meteor application
to a compatible `npm` package. You can do it easily using
[demeteorizer](https://npmjs.org/package/demeteorizer).

1. Install `demeteorizer` usign npm:
```
$ [sudo] npm install -g demeteorizer
```

2. Execute `demeteorizer` in your Meteor application folder:
```
$ demeteorizer -o package
```
This will create a folder called `package`, this will be your `npm` compatible
package to deploy to Nodejitsu.

3. Modify your package before deploy:

 Edit your new `package.json` in the `package` folder and do the following:

 - Change engine version to `0.10.x`  *(`0.8.x` will fail to start)*
```
"engines": {
  "node": "0.10.x"
}
```

4. Deploy and profit!

 Deploy your application, it will prompt for a subdomain to use in Nodejitsu.
```
$ jitsu deploy
```
 If you are using MongoDB you'll need to define the ENV variable with the connection
 string and restart the application.
```
$ jitsu env set MONGO_URL "mongodb://user:password@host:port/databasename?autoReconnect=true"
$ jitsu start
```

## How to generate a SSL CSR (Certificate Signing Request) for my Custom Domain?
You'll need to install [OpenSSL](http://www.openssl.org) in your OS, you can
install it with homebrew (Mac OSX) with `brew install openssl` or in Linux
(Debian/Ubuntu) with `[sudo] apt-get install openssl`, or download the following
binary distrubution for Windows
[OpenSSL for Windows](http://www.slproweb.com/products/Win32OpenSSL.html).

You can generate your CSR with the following command:
```
$ openssl req -new -keyout server.key -out server.csr
```

Or you can follow the instructions of the following SSL providers:

* [Comodo CSR Instructions][comodo]
* [Digicert CSR Instructions][digicert]
* [RapidSSL CSR Instructions][rapid]
* [Thawte CSR Instructions][thawte]
* [VeriSign CSR Instructions][verisign]

## How to upload my SSL certificates to Nodejitsu?

You can upload the certificates under the SSL tab in the application view on
[WebOps](https://webops.nodejitsu.com) admin interface. Make sure you have a
Business plan account and your `package.json` is configured with the custom domains.

Individual plans can't use Custom SSL but they can use our Free SSL service with
`*.jit.su` and `*.nodejitsu.com`. Just prepend the `https://` and it's done.

## How to target an application through a specific load balancer?

For debugging purposes it's sometimes useful to hit your application through a
specific balancer. This is easily done by providing a Host header to the
request. The `curl` command below will hit a balancer with IP `165.225.131.253`
and target the application `yourapp.jit.su`. Note, replace `yourapp` with the
subdomain of your application.

```
$ curl --verbose --header 'Host: yourapp.jit.su' 165.225.131.253
```

For a list of balancers, check our [list][list].

## How to target a specific drone of an application?

If your application uses multiple drones, we provide a special header for targetting
a specific drone. Per example, if your application uses 2 drones, you can
provide either `x-drone: 1` or `x-drone: 2` as header. Note, replace `yourapp` with
the subdomain of your application.

```
$ curl --verbose --header 'x-drone: 1' yourapp.jit.su
```

## How to share my account without sharing my password?

You can use [tokens](/documentation/jitsu/tokens/) to share your account access without needing to share your password.

Simply create the token using jitsu
```
$ jitsu tokens create <yourTokenName>
```

And install it on shared clients
```
$ jitsu config set apiTokenName <yourTokenName>
$ jitsu config set apiToken xxx-xxx-xxx-xxx
$ jitsu config set username myusername
```

## How to run bower install before a deploy?

You need to install your front-end dependencies before upload your snapshot, so, you need to run `bower install` just before make a deploy.

We offer two additional script fields `predeploy` and `postdeploy` at package.json wich both run on your local machine. Just add the next to your package.json in the scripts section:

```
{
  "scripts": {
    "predeploy": "bower install"
  }
}
```

[logs]: https://www.nodejitsu.com/documentation/jitsu/logs/#tailing-logs
[docs]: http://socket.io/#how-to-use
[list]: https://www.nodejitsu.com/documentation/features/dns/#individual-plans

[comodo]: https://www.instantssl.com/ssl-certificate-support/csr_generation/ssl-certificate-index.html
[digicert]: https://www.digicert.com/csr-creation.htm?rid=011592
[rapid]: https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&id=SO6506&actp=search&viewlocale=en_US&searchid=1270237704682
[thawte]: https://search.thawte.com/support/ssl-digital-certificates/index?page=content&id=AR1108
[verisign]: https://knowledge.verisign.com/support/ssl-certificates-support/index?page=content&id=AR235

[meta:title]: <> (FAQ)
