# Using and managing databases

Nodejitsu provides easy access to several third-party hosted databases. Included
databases are, [MongoDB][mongo], [Redis][redis] and [CouchDB][couch]. Most
databases have several providers, per example MongoHQ and MongoLab for MongoDB.
All database available are free. For limitations check the provider. Database
management is converned by the `jitsu databases` command.

## Creating a database

Provisioning a new database is as easy as executing
`jitsu databases create [type] [name]` where *name* is an arbitrary chosen
name. The name will be translated to an internal ID by the provider. The *name*
will be used by Nodejitsu as reference for [listing databases](#listing-active-databases).
*Type* should be a valid database type, e.g. `mongo`, `redis` or `couch`

Executing `jitsu databases create mongo testname` will create a new
[MongoDB][mongo] database at MongoLab, referenced by `testname`. Also you will
be provided with details of the newly created database:

```bash
info:    Welcome to Nodejitsu [username]
info:    jitsu v0.12.10, node v0.8.22
info:    It worked if it ends with Nodejitsu ok
info:    Executing command databases create mongo testname
info:    A new mongo has been created
data:    Database Type: mongo
data:    Database Name: testname
data:    Connection url: mongodb://[cred].mongolab.com:51947/[dbname]
help:
help:    Connect with the `mongo` cli client:
help:
           $ mongo [domain].mongolab.com:51947/[dbname] -u nodejitsu_[username] -p [pw]
help:
help:    Connect with the `mongodb-native module`:
help:
           var mongodb = require('mongodb');
           var db = new mongodb.Db('nodejitsu_[dbname]',
             new mongodb.Server('[domain].mongolab.com', 51947, {})
           );
           db.open(function (err, db_p) {
             if (err) { throw err; }
             db.authenticate('nodejitsu_[username]', '[pw]', function (err, replies) {
               // You are now connected and authenticated.
             });
           });
help:
help:    Connect with the `mongoose` module:
help:
           var mongoose = require('mongoose');
           mongoose.connect('mongodb://[cred].mongolab.com:51947/[dbname]');
help:
info:    Nodejitsu ok
```

Note that *domain*, *dbname*, *username*, *cred* and *pw*  are replaced with actual
credentials and details on how to connect with your new MongoDB.

---

# Listing active databases

To show all databases simply execute `jitsu databases list`, which will provide
an overview of all your databases. Here is an overview of data returned from the
[created](#creating-a-database) `testname` database:

```
data:    Database Type: mongo
data:    Database Name: testname
data:    Connection url: mongodb://[cred].mongolab.com:51947/nodejitsu_[dbname]
info:    Nodejitsu ok
```

---

## Details of database

If you lost details and/or credentials of a single database and would like
to retrieve those, simply execute `jitsu database get [dbname]`. Where *dbname*
is the unique database name, per example `testname` as used
[above](#listing-active-databases). Note that *dbname* is required, otherwise you
will receive a warning.

---

## Destroying database instance

Databases for which you have no use any longer can be destroyed. However, this
will delete all data without means of retrieval. Make sure you backed-up any
data in database. You will be prompted to continue (defaults to yes) before
any database is deleted. To delete a database, use `jitsu databases destroy
[dbname]`. As with [aquiring](#details-of-database) database details, *dbname*
entry is required. If the database was destroyed properly
`info: Database was deleted` will be returned.

[mongo]: http://www.mongodb.org/
[redis]: http://redis.io/
[couch]: http://couchdb.apache.org/
[meta:title]: <> (Database control)
