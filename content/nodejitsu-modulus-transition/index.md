# Transitioning to Modulus from Nodejitsu

- [Redeeming your Modulus coupon](#redeeming-your-coupon)
- [Moving your app, step-by-step](#step-by-step)
- [Frequently asked questions](#faq)

<hr>
<a name="redeeming-your-coupon" />
## Redeeming your Modulus coupon

You should have already received your Modulus promo code in an email from the Nodejitsu team. In order to be eligible you have to be an active paying customer on Nodejitsu. If you did not receive a code and you believe you are eligible for one please email us at [support@nodejitsu.com](mailto:support@nodejitsu.com).

Once you have your code you can redeem it in two ways:

1. Enter it when you [signup for Modulus](https://my.modulus.io/register)
2. Enter it the Billing page for your account.

<hr>
<a name="step-by-step" />
## Moving your app, step-by-step

#### 1. [Signup for Modulus](https://my.modulus.io/register). You can also [authenticate with Github](https://my.modulus.io/github/auth) in one click.

#### 2. Add your Modulus coupon from Nodejitsu.

#### 3. Install the modulus CLI and login
```
npm i -g modulus
modulus login --username $YOUR_USERNAME --password $YOUR_PASSWORD
```

#### 4. Create a project for your Nodejitsu app.
```
modulus project create `node -pe 'require("./package").name'` -s 396 -r 'node.js'
```

#### 5. Make [necessary code changes], if any.

- **Ensure you are listening on `process.env.PORT`:** Modulus specifies which port your application must listen on in `process.env.PORT`. The value of this environment variable is always `8080` because your application runs inside of a container. So if you're listening on `8080` already you're in the clear!

But if you are running a server on a port other than `8080` such as:

``` js
var server = require('http').createServer(function (req, res) {
  res.writeHead(200);
  res.end('Farewell Nodejitsu. Hello Modulus!');
});

server.listen(8888);
```

You will need to replace it with:

``` js
server.listen(process.env.PORT || 8888);
```

Modulus will not wait for your application to start before completing your deployment, so if your application fails to start on the first attempt this is likely the problem.

> Nodejitsu historical note: the [`listen(3)` syscall](http://linux.die.net/man/3/listen) was intercepted to make applications start without any environment variables using [interposed](https://github.com/opsmezzo/forza/blob/master/src/plugins/start/libinterposed.c).

- **Specify binary in `scripts.start`:** Modulus will not infer `node` by default when interpreting the value of the `scripts.start` in your package.json file. You will need to specify it explicitly. What that means is if your package.json was:

``` js
{
  "name": "your-nodejitsu-app",
  /* other metadata*/
  "scripts": {
    "start": "./server.js"
  }
}
```

You will need to add `node` in the value for `"start"` before `"./server.js"`, e.g.:

``` js
  "scripts": {
    "start": "node ./server.js"
  }
```

- **Copy your ignore files to `.modulusignore` if necessary:** since the `jitsu` CLI used [fstream-npm](https://github.com/npm/fstream-npm) under the covers it could automatically pickup on other ignore files if `.jitsuignore` did not exist. The precedence is:

```
.jitsuignore
.npmignore
.gitignore
```

Which means you will need to copy one of these files to `.modulusignore` if _(and only if)_ you have that ignore file.

```
cp .jitsuignore .modulusignore # IFF you have a .jitsuignore
cp .npmignore   .modulusignore # IFF you have a .npmignore, but no .jitsuignore
cp .gitignore   .modulusignore # IFF you have a .gitignore, but no .jitsuignore or .npmignore
```

- **_(Optional)_ Import your environment variables:** if you have environment variables set on your application from `jitsu env` you will need to import these into your Modulus application.

``` bash
jitsu env save env-vars.json
modulus env load env-vars.json -p `node -pe 'require("./package").name'`
```

#### 6. Deploy it!
```
modulus deploy -p `node -pe 'require("./package").name'`
```

#### 7. Update any DNS records (A, CNAME, etc).

<hr>
## Frequently asked questions

### Will older snapshots of applications be migrated to Modulus?

**No, they will not.** If you want to backup your snapshots from Nodejitsu you can do this by running `jitsu snapshots fetch`:

```
jitsu snapshots fetch your-nodejs-app
```

### Will older logs of applications be migrated to Modulus?

**No, they will not.** If you want to backup your old Nodejitsu logs you can do this by running `jitsu logs`:

```
jitsu logs app your-nodejs-app 1000
```

### I have custom domain SSL on Nodejitsu, can I use this on Modulus?

**Yes, you can!** Simply take your certificate files and follow the [SSL setup guide](https://modulus.desk.com/customer/portal/articles/1701165-ssl-setup-guide) prepared by Modulus.

### Will my databases be migrated to Modulus? Will I lose my data?

Your Redis, MongoDB, and CouchDB instances will **not** be migrated to Modulus, BUT you **will not** lose you data because these are not hosted directly by Nodejitsu. Please follow-up with the individual provider for more details on transitioning your database:

- MongoDB: MongoHQ or MongoLab
- Redis: IrisCouch
- CouchDB: IrisCouch

### What should I do if I use the Github Webhooks API for deployment to Nodejitsu?

If you are currently using the [Github webhooks API](https://www.nodejitsu.com/documentation/features/webhooks/) for deployment to Nodejitsu we recommend that you setup [Codeship with Modulus](https://blog.codeship.com/modulus-continuous-deployment/).

### What version of `node` should I set in my `package.json`?

Currently Nodejitsu is running `node@0.10.39` so if you want to run the **exact same** version on Modulus you need to specify this in your `package.json`

``` js
{
  "name": "your-nodejs-app",
  /* other package.json properties */
  "engines": {
    "node": "0.10.39"
  }
}
```
### What should I do if I run `coffeescript` or another binary?

Just make sure to reference that binary in your `package.json` file:

``` js
{
  "name": "your-nodejs-app",
  /* other package.json properties */
  "scripts": {
    "start": "coffee server.coffee"
  }
}
```

[meta:title]: <> (Transitioning to Modulus from Nodejitsu)
