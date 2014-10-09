# Setting up a public npm replica (attachments and all)

**NOTE** This is only necessary if you plan to setup a public replica within
your own internal infrastructure

## Grab the couch file

1. Rsync the couch file from `replicate.nodejitsu.com` or another replica machine.

1. If we have a customer behind a corporate proxy we will need to rsync this
   in a special way. In order for this to happen, we need to setup an
   `/etc/rsyncd.conf` on the box we are replicating from (source) that looks like the
   following.

```sh
uid = nobody
gid = nogroup
timeout = 600
log file = /var/log/rsyncd.log
transfer logging = true

[ftp]
comment = public archive
path = /home/ubuntu/hosting/servers/replica/db/database_dir
use chroot = yes
auth users = nodejitsu
secrets file = /var/rsync/users.secrets
```

1. Then run the following command on the source machine `rsync --daemon`

1. On the destination machine run the following

```sh
$ rsync -raP "rsync://nodejitsu@replicate.nodejitsu.com/ftp/registry.couch" registry.couch
```

**NOTE**: If you would like access to a full couch file, please contact us
regarding the password

## Setup CouchDB

This will depend on the type of operating system you are installing on but we recommend
installing from
[source](https://github.com/opsmezzo/composer-systems/blob/master/database/couchdb/scripts/install.sh)
if available or use a tool like
[`build-couchdb`](https://github.com/jhs/build-couchdb).

After this is complete, move the registry couch file you copied over into the
correct folder (based on your installation) and restart or start up the couch!

## Setting up the fullfat agent

1. Install the fullfat agent onto the designated machine `npm install -g npm-fullfat-registry --reg https://paid.registry.nodejitsu.com`

1. Now we simply need to run the agent! For most enterprise customers it will be
   something like the following.

```sh
$ npm-fullfat-registry --fat=http://localhost:5984/registry \
  --skim=http://skimdb.npmjs.com/registry \
  --tmp=/tmp \
  --seq-file=/var/lib/seq \
  --missing-log=/opt/couchdb/var/log/npm-missing.log \
  --registry=https://registry.npmjs.org \
  --proxy=http://proxy.yourOptionalCorporateProxy.com
```

### Agent options

Some notes on the agent options we have opted in for

* seq-file: This is the path to a file that will be used to track the sequence
  number that couchdb is at. This is used for when the process crashes (which is
  ok) and restarts itself so it knows where to start listening for couchdb
  changes

* tmp: This is the temporary directory where tarballs are stored

* missing-log: This is a file that will keep track of any tarballs that the
  agent was unable to fetch. This can just be for network connectivity issues or
  it is just not available or accessible through the registry

* proxy: This is only necessary if you are running


**IMPORTANT** The value contained in the seq-file will depend on the state of
the couch file that has been rsynced. The safest route is to check the current
sequence value of the http://skimdb.nodejitsu.com/registry endpoint at the time
of the rsync. Use this as the initial value of the seq-file before you start the
fullfat-agent.
