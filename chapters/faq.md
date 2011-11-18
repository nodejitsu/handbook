# Frequently Asked Questions
<a name='faq'></a>

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

The ability to host tcp applications on nodejitsu and listen on non-80 ports is on our roadmap but has no associated timeline.

## "How can I point my custom domain to my nodejitsu app?"

Yes! For directions on how to set up a custom domain with Nodejitsu, [go here](http://dns.nodejitsu.com).


## "Why won't this C++ addon compile?"

Many [C++ addons](http://nodejs.org/docs/v0.4.10/api/addons.html) require libraries that are not included in Nodejitsu's infrastructure by default. For example, [node-canvas](https://github.com/learnboost/node-canvas) requires [cairo](http://cairographics.org/), which only recently became available on nodejitsu's platform.

## "How do I specify which files not to bundle? How do I know what files are getting bundled?"

Jitsu uses npm to bundle files, meaning that jitsu bundles files in exactly the same manner than npm bundles published modules. You can read about this in [npm's documentation](http://npmjs.org/doc/developers.html).

In more detail: npm uses a file called `.npmignore`, which should contain a list of files and folders to ignore for the purpose of bundling. If this file does not exist, npm will use git's ignore file, called `.gitignore`, instead. This means that, if you want to bundle files that are ignored by git, you should create an `.npmignore` even if it's blank.

*Note*: There is a minor but important difference between how `.npmignore` and `.gitignore` list folders. In the case of `.npmignore`, ignored folders should have a trailing slash:

    folderToIgnore/

In contrast, this is not necessary for `.gitignore`, and listing `folderToIgnore` without a trailing slash will work as expected.

Finally, jitsu has the ability to bundle your app without deploying with the `jitsu package create` command. You can use this to make sure that the resulting .tgz file is as you expect.

