# Business plan features

If you're one of our **[Business Plan](https://nodejitsu.com/paas/pricing/)**
customers, you have access to special features which give you more selection and
reliability.

You can choose which infrastructure provider and datacenter you deploy your
application to, and choose how many drones to allocate towards your apps.

To access Business plan features, you need to first make sure you're running the
latest version of jitsu. Please run:

```
$ [sudo] npm install jitsu -g
```

Make sure your application is deployed on Nodejitsu before using the following
commands.

## Using jitsu cloud

### View cloud information

You can view the details for the datacenter and provider where your application
is deployed.

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

To change your application to another cloud provider and datacenter, use the
following command:

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

You can deploy to any of the following
[datacenters](https://nodejitsu.com/paas/datacenters/):

#### Joyent

* Las Vegas, US: `us-sw-1`
* Viriginia, US: `us-east-1`
* Amsterdam, NL: `eu-ams-1`

#### Telefónica

* Madrid, ES: `eu-mad-1`
* London, UK: `eu-lon-1`

Or using the following command:

```
$ jitsu cloud list
info:    Welcome to Nodejitsu jitsuka
info:    jitsu v0.12.1, node v0.8.20
info:    It worked if it ends with Nodejitsu ok
info:    Executing command cloud list
info:    You can use one of the following providers
data:    jitsu cloud joyent us-east-1
data:    jitsu cloud joyent us-sw-1
data:    jitsu cloud joyent eu-ams-1
data:    jitsu cloud telefonica eu-london-1
data:    jitsu cloud telefonica eu-mad-1
info:    Nodejitsu ok
```

---

## Setting up your DNS

To setup your custom DNS domain with the correct datacenter you can follow the
[DNS configuration instructions](/documentation/features/dns/) from this handbook.

---

## Scaling your application

You can scale your application by adding more drones or ram, using the
`--drones` and `--ram` parameters.

### To Add more ram

To setup the RAM of the drone use the `--ram <size>` parameter.
Larger drone are metered as multiple 256MB drones.
For example, two 512MB drones would be metered as four drones. 

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

### To Add more drones

To add more drones use the `--drones <n>` parameter.

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
