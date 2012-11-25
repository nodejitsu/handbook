# Frequently Asked Questions
<a name='faq'></a>

**For more information about pricing, see [the pricing FAQ](http://nodejitsu.com/paas/faq.html).**

## "How do I reset my password?"

One way is to use jitsu. Simply type:

    jitsu users forgot :username

where `:username` is your username. Alternately, go to <http://develop.nodejitsu.com/> and click the "forgot password" link, where you will be prompted for your username. Either process will send you an email with further instructions.

## "Is there a cheatsheet somewhere?"

There sure is! Check out <http://cheatsheet.nodejitsu.com>.

## "How are programs kept alive? Do I need to use Forever?"

Nodejitsu's cloud services watch your programs for you! You shouldn't have to do anything special to keep your apps running, much less use Forever.

## "How can I make my app use a port other than port 80?"

Connecting to other servers using arbitrary ports requires no special considerations. However, *listening* for outside connections is currently limited to port 80 on the Nodejitsu platform because we require http host headers for domain name resolution of subdomains. Consequentially, each subdomain may only host one listening service.

The ability to host TCP applications on nodejitsu and listen on non-80 ports is on our roadmap but has no associated timeline.

## "How do I make Koding work with jitsu?"

By default, Koding will not install packages globally, due to a permission error. You can fix this by setting the
npm prefix to a location that you have permissions to access, like your home directory. To do this, simply run:

`npm config set prefix ~`

And then you can install jitsu normally:

`npm i jitsu -g`

## "Can I use jitsu with Cloud9 IDE (<http://c9.io>)?"

Yes! Follow these steps to install jitsu.

1. Install the latest npm globally: `npm install -g npm`

2. Install the latest jitsu locally: `npm install jitsu`

Now you can use jitsu as usual. If you get error, try `npm rm -g jitsu && npm cache clean`.

## "How can I turn off the require-analyzer in jitsu? I want to manage my own dependencies!"

There are three ways to disable the require-analyzer:

* Use the `--noanalyze` flag when running jitsu commands to disable it on a one-time basis.
* Add `"analyze": false` to your package.json to disable it on a per-app basis.
* Set "analyze" to `false` in your `~/.jitsuconf` to disable it on a global level.

## "How Do I add my GitHub repository as a dependency?"

Use the following format: `https://github.com/:user/:repo/tarball/:branch`

## "Why won't this C++ addon compile?"

Many [C++ addons](http://nodejs.org/docs/latest/api/addons.html) require libraries that are not included in Nodejitsu's infrastructure by default. For example, [node-canvas](https://github.com/learnboost/node-canvas) requires [cairo](http://cairographics.org/). Nodejitsu has cairo and many other such libraries, but may not have some more obscure ones.

## "How do I specify which files not to bundle? How do I know what files are getting bundled?"

Jitsu uses npm to bundle files, meaning that jitsu bundles files in exactly the same manner than npm bundles published modules. You can read about this in [npm's documentation](http://npmjs.org/doc/developers.html).

In more detail: npm uses a file called `.npmignore`, which should contain a list of files and folders to ignore for the purpose of bundling. If this file does not exist, npm will use git's ignore file, called `.gitignore`, instead. This means that, if you want to bundle files that are ignored by git, you should create an `.npmignore` even if it's blank.

Finally, jitsu has the ability to bundle your app without deploying with the `jitsu package create` command. You can use this to make sure that the resulting .tgz file is as you expect.

## "How do I fix `Error: package.json error: can't find starting script`?"

Nodejitsu requires a starting script in the package.json to know which script to run to start your application. You need to make sure that the scripts.start field in your package.json points to the correct starting script.

A common issue is using "node app" as the value of scripts.start in your package.json. This won't work on Nodejitsu because the file extension is not specified. You'll need to do something along the lines of "node app.js".
