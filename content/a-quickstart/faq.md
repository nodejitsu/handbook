# For more information about pricing, see [the pricing FAQ](http://nodejitsu.com/paas/faq.html).

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

[meta:title]: <> (FAQ)
