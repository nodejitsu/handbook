<hr />

Welcome to the **[Business plan](http://nodejitsu.com/paas/pricing)** features, you can deploy your application in a different cloud provider and datacenter, also scale your application at will.

To access Business plan features, you need to first make sure you're running the latest version of jitsu. Please run:

```
$ [sudo] npm install jitsu -g
```

Make sure your application is deployed on Nodejitsu before using the following commands.

## Using jitsu cloud


### View cloud information

You can see the information of the cloud where your application is deployed.

Example:

```
$ jitsu cloud
info:    Welcome to Nodejitsu jitsuka
info:    jitsu v0.12.0, node v0.8.19
info:    It worked if it ends with Nodejitsu ok
info:    Executing command cloud
info:    Fetching app example
info:    Viewing cloud info for example
data:    {
data:        datacenter: 'us-east-1',
data:        ram: 256,
data:        drones: 1,
data:        provider: 'joyent'
data:    }
info:    Nodejitsu ok
```

### Change cloud provider and datacenter

If you want to change your application to another cloud provider and datacenter you can do it with the following command:

```
$ jitsu cloud <cloud> <datacenter>
```

Example:

```
$ jitsu cloud joyent us-sw-1
info:    Welcome to Nodejitsu jitsuka
info:    jitsu v0.12.0, node v0.8.19
info:    It worked if it ends with Nodejitsu ok
info:    Executing command cloud joyent us-sw-1
info:    Fetching app example
info:    App currently deployed to
data:    {
data:        datacenter: 'us-east-1',
data:        ram: 256,
data:        drones: 1,
data:        provider: 'joyent'
data:    }
info:    Deploying application in cloud with:
data:    {
data:        datacenter: 'us-sw-1',
data:        ram: 256,
data:        drones: 1,
data:        provider: 'joyent'
data:    }
info:    App example is now started
info:    http://example.jyt.us.sw1.nodejitsu.com on Port 80
info:    Nodejitsu ok
```

### Available Datacenters
You can setup one of the following [datacenters](http://nodejitsu.com/paas/datacenters):

#### Joyent
* Las Vegas, US: ```us-sw-1```
* Viriginia, US: ```us-east-1```
* Amsterdam, NL: ```eu-ams-1```
* San Francisco, US: *not available yet*

#### Telefónica
* Madrid, ES: *not available yet*

## Scaling your application

You can scale your application (add more drones / add more ram) using the ```--drones``` and ```--ram``` parameters.

### Add more ram

To setup the RAM of the drone use the ```--ram <size>``` parameter.

Example:

```
$ jitsu cloud joyent us-sw-1 --ram 512
info:    Welcome to Nodejitsu jitsuka
info:    jitsu v0.12.0, node v0.8.19
info:    It worked if it ends with Nodejitsu ok
info:    Executing command cloud joyent us-sw-1
info:    Fetching app example
info:    App currently deployed to
data:    {
data:        datacenter: 'us-sw-1',
data:        ram: 256,
data:        drones: 1,
data:        provider: 'joyent'
data:    }
info:    Deploying application in cloud with:
data:    {
data:        datacenter: 'us-sw-1',
data:        ram: 512,
data:        drones: 1,
data:        provider: 'joyent'
data:    }
info:    App example is now started
info:    http://example.jyt.us.sw1.nodejitsu.com on Port 80
info:    Nodejitsu ok
```


### Add more drones
To add more drones use the ```--drones <n>``` parameter.

Example:

```
$ jitsu cloud joyent us-sw-1 --drones 2
info:    Welcome to Nodejitsu jitsuka
info:    jitsu v0.12.0, node v0.8.19
info:    It worked if it ends with Nodejitsu ok
info:    Executing command cloud joyent us-sw-1
info:    Fetching app example
info:    App currently deployed to
data:    {
data:        datacenter: 'us-sw-1',
data:        ram: 256,
data:        drones: 1,
data:        provider: 'joyent'
data:    }
info:    Deploying application in cloud with:
data:    {
data:        datacenter: 'us-sw-1',
data:        ram: 256,
data:        drones: 2,
data:        provider: 'joyent'
data:    }
info:    App example is now started
info:    http://example.jyt.us.sw1.nodejitsu.com on Port 80
info:    Nodejitsu ok

```

[meta:title]: <> (Business Plan Features)