# Nodejitsu private npm config

* [Front-end, `npm-ui`](#front-end-npm-ui)
* [Backend, `agent/bin/*`](#backend-agentbin)

## Front-end, `npmjitsu-ui`

* **http_port**
* **api**
  - uri
  - auth.username
  - auth.password

## Backend, `npmjitsu-proxy|updater|api`

* **copy-users**
  - **(description)** Boolean value to specify if we insert our OWN user
    document when an npm login is correctly proxied.
* **hosted**
  - **(description)** Boolean value for if we are in hosted mode (which is
    probably yes)
* **domain**
  - (e.g) "registry.nodejitsu.com"
  - **(description)** Root domain of the registry (`npmjitsu-proxy`)
* **http**
  - **(description)** Either true or an actual port number (defaults to 80)
* **https**
  - **(description)** https values, see [`create-servers`][create-servers] for what we actually pass in
* **vhosts**
  - e.g { "localhost": "npmjitsu.co" }
  - **(description)** Mapping of the couch domain and the host header we want to send it
* **admins**
  - e.g { "localhost": "admin:password" }
  - **(description)** Mapping of couch domain and auth to use when making requests (if any)
* **couches**
  - policy
    - **(description)** Full URL to the npm-policies database
  - private
    - **(description)** A single URL to a couch or an array of couches to use for private npms
  - public
    - e.g { "read": "couchOrNpmUrl", "write": "couchOrNpmUrl", "local": "couchOrNpmUrl"}
    - **(description)** Object of urls for their various purpose. `read` url is
      directed towards the registry we want to read from (usually our in hosted
      case). The `write` registry url is for where we want to proxy `PUT`s to
      (this is optional). Local is used for testing locally for the location to
      `PUT` the user we grab from the `write` url's npm when `copy-user` is true.
      This allows for seamless syncing of npm user accounts
      This whole thing can also be an array or a single URL if we wanted.
* **api**
  - username
  - password
  - **(description)** object of username/password to auth with the api backend
    (used by UI and API)
* **godot**
  - **(description)**  Boolean (false if disabling) or configuration object for `godot`.
    This should be set to false for all enterprise users.

[create-servers]: https://github.com/indexzero/create-servers
