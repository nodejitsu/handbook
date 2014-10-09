# Enterprise Private Npm

* [Getting Started](#getting-started)

## Getting Started

From this point we assume you have read the basic info of our Hosted Private Npm
service. This will give you the necessary background to understand the
interaction you will be dealing with. Luckily it is just like using the regular
public npm!

What we will go over here is how to go about getting started with our
private-npm. The first question we ask is whether or not you want a full public replica setup or
just an on premise hosted npm. If the former is true please see our section on
setting that up [here][setting-up-replica]. Otherwise we can go ahead and get
started below!

**Note** If you do not have couchdb installed on a specified box, please see the
section on [installing couchdb][installing-couchdb].

If you would like a more in depth overview on how this software works, see our
[architectural explanation][arch].

## Installing the `npmjitsu-agent`

In order to get started with our enterprise product, you first need to install
the software. This can be done from our custom registry
`paid.registry.nodejitsu.com`. Once you have acquired access to this registry
from us, just run the following command!

`$ npm install npmjitsu-agent --reg https://paid.registry.nodejitsu.com`

The following command will install all the neessary services you will need to
run including the `npmjitsu-proxy`, `npmjitsu-api` and `npmjitsu-updater`.

If you are also running the UI internally, run the following command.

`$ npm install npmjitsu-ui --reg https://paid.registry.nodejitsu.com`

## Setting up the configuration

This is where we will talk about the tool that is used to setup the
configuration needed to run the processes. Until this tool is finished, you can
look at the configuration values used found [here][config] where each value is
explained.

## Running the processes

After you have built your configuration you will be ready to go! All you have to
do is

[setting-up-replica]: /npm/enterprise/replica
[installing-couchdb]: /npm/enterprise/replica#setup-couchdb
[arch]: /npm/enterprise/arch
[config]: /npm/enterprise/config

[meta:title]: <> (Private npm Enterprise)
