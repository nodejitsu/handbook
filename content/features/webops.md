<hr>

The Nodejitsu WebOps interface allows developers to administrate their
application through a web interface. This web interface offers the same
functionality that can be found in [jitsu](/features/jitsu) CLI or our 
[RESTful API](/api).

In addition to having feature parity with `jitsu` it also allows you to
subscribe to our different payed plans. The WebOps interface be found at
[https://webops.nodejitsu.com](https://webops.nodejitsu.com).

## Logging in to WebOps

To log in to our WebOps interface you can press the 
[login](https://webops.nodejitsu.com/#/login) button that is present in our menu
bar. You will be presented with a login modal dialog. If you forgot the
credentials for your Nodejitsu account, you can press the "forgot password" link
and a password recovery e-mail will be sent to you.

![login](https://versions.nodejitsu.com/id:handbook/resources/login.png)

If you don't have a Nodejitsu account yet, you can register it at our front
page. Once you register an account a confirmation code will be send to your
e-mail address. When you have confirmed your account, you can deploy your
application to the Nodejitsu platform.

![register](https://versions.nodejitsu.com/id:handbook/resources/register.png)

When you have successfully logged in, you will be redirected to your application's
page. If you don't have any applications, you will be presented with a simple
placeholder.

![no applications](https://versions.nodejitsu.com/id:handbook/resources/noapps.png)

And if you have applications, you will see our applications page.

![applications](https://versions.nodejitsu.com/id:handbook/resources/applications.png)

## Managing Your Applications

In the applications page, you can see all the applications that are hosted on
Nodejitsu in the sidebar. The red and green dots prefixed before their names
indicate if your applications are started or stopped.

As you can see in the screen shot above, our application `http-server` is
currently stopped. We can start it clicking the **start** button in the
application control menu bar.

![application starting](https://versions.nodejitsu.com/id:handbook/resources/application-starting.png)

It can take a while for an application to start, because we need to build all
the dependencies and deploy it on multiple drones (when specified). Therefore,
we start applications in the background, and notify you when the application is
started in the Application page

In addition to starting, stopping and restarting your application, you can also
modify the ENV variables, start a different snapshot or tail the logs of your
application.

![tailing](https://versions.nodejitsu.com/id:handbook/resources/logs.png)

## Creating a Free Database

When you are developing your application, you might need access to a database to
save your data or to support sessions. You can create a database in
WebOps; these database are the free databases that are provided by third-party
database providers.

To create a new free database, simply click on the type of database that you want
and select the provider where you want to host this database. The different
providers have different limits, so make sure to select one that fits your needs.
After clicking on the provider, you will be presented by a modal dialog.

![create database](https://versions.nodejitsu.com/id:handbook/resources/create-database.png)

After you have created the database the database will be listed on the page, and
you can copy and paste the authorization details and start using the database.

## Managing Your Account and Creating a Subscription

You can change your account details by either clicking your username or gravatar
in the menu bar or clicking the menu item with a cog. Sometimes there will be a
red notification indicator; this usually means that you have an uncompleted
account and that some data might still be missing from your account.

![account](https://versions.nodejitsu.com/id:handbook/resources/account.png)

As you can see in the account screen shot above, I'm missing a couple of things.
I don't have a Nodejitsu subscription yet and I didn't submit my billing
information. **If you enter your billing information, we will actually add 1
extra free month of sandbox time to your account**. So let's fill in our billing
details and get some free time. All the fields in billing tab are required, so
make sure you fill them all in correctly. When you want to change information, you
will be presented with an addition modal dialog which asks for your password.
This way we know that you actually have the authority to change the account
details and submit billing information.

![confirm](https://versions.nodejitsu.com/id:handbook/resources/account-confirm.png)

After successfully submitting your billing information, you will have access
to our `plans` tab. Once you are ready to start deploying your application and
leave the development sandbox, you can select one of the plans that are presented
here. Simply select the plan you want to run and subscribe.

![plans](https://versions.nodejitsu.com/id:handbook/resources/plans.png)

When you are subscribed to a plan, you can see how many drones you have used and
upgrade if needed. You can easily see which applications are currently using the
drones from your plan by clicking on the details button.

![plan details](https://versions.nodejitsu.com/id:handbook/resources/plan-details.png)

In the invoices tab you can see all the charges that are made against your
credit card.

![invoices](https://versions.nodejitsu.com/id:handbook/resources/invoices.png)

Now that you know what WebOps is capable of, try it yourself at
[https://webops.nodejitsu.com](https://webops.nodejitsu.com)

[meta:title]: <> (Using Webops)
