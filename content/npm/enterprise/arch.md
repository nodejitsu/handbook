# Nodejitsu private npm

* [Architecture](#architecture)
* [Hosting Scenario](#hosting-scenario)
* [Change handling](#change-handling)

## Architecture

The architecture is composed of four core components:

* `npmjitsu-proxy`: Core HTTP(S) proxy that serves all of the requests from the `npm` CLI.
* `npmjitsu-api`: Server which provides the RESTful API used
* `npmjitsu-ui`: [`bigpipe`][bigpipe] powered front-end UI server.
* `npmjitsu-updater`: Process that manages the state of the private npm installation and allows for triggering of notifications etc.
* `npm-replicator` (handled by [`omnipotent`][omnipotent] and [`overwatch`][overwatch]): ensures replication for public npm replicas and for `_design` documents in customers' private npm databases.

![High-level architecture](https://i.cloudup.com/imQKInYaUA-3000x3000.png)
_Figure 1. High-level architecture_

## Hosting scenario

Every customer has an `/{{customer_name}}_admin` database ("admin database") and a `/{{customer_name}}_npm`.

These two databases are managed by the `npm-updater` process and update the
index database (`npm-policies`) based on their state change. The `npm-updater` ensures that `policy` documents in the `npm-polciies` database are up to date. Think about the `npm-policies` as an on disk index of the state of the `{{customer_name}}_admin` database.

![architecture](https://i.cloudup.com/8Jq3bZo87y-3000x3000.png)
_Figure 1. Architecture Picture_

## Change handling

* `_changes` from `customer_admin`
  1. On changes where `{ "delete": true }` from `customer_admin` the private npm registry agent
  removes the documents from the policy in-memory.
  2. On all other changes from `customer_npm` the private npm registry agent attempts
  to add the documents to the in-memory policy.
* `_changes` from `customer_npm`
  1. On changes where `{ "delete": true }` from `customer_npm` the private npm registry agent
  removes the documents from the `customer_admin`
  2. On all other changes from `customer_npm` the private npm registry agent attempts
  to add the documents to the `customer_admin`.

[overwatch]: https://github.com/nodejitsu/overwatch
[omnipotent]: https://github.com/nodejitsu/omnipotent
[bigpipe]: https://github.com/bigpipe/bigpipe
