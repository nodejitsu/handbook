Nodejitsu's database offering allows you to easily create a free tier database
with our database partners.

### [MongoDB](/documentation/databases/mongodb)

[MongoDB][mongodb] is an open source document database created by 10gen. MongoDB
is really popular for Node.js applications as it's build on top of JavaScript
and using JSON in Node feels really natural. It features:

<dl>
  <dt>Document Oriented</dt>
  <dd>It stores JSON documents with flexible schema's</dd>

  <dt>Querying</dt>
  <dd>Custom query language that is optimized for JSON documents</dd>

  <dt>In-place updates<dt>
  <dd>Atomic modifiers for contention-free performance</dd>

  <dt>Map/Reduce</dt>
  <dd>Map/Reduce can be used for data aggregation and processing</dd>

  <dt>GridFS</dt>
  <dd>Supports storing files of any size without complicating your stack</dd>
</dl>

### [Redis](/documentation/databases/redis)

[Redis][redis] is an open source key-value database created by antirez. It's
famous for it's high speed which achieved by storing all data in memory. It has
uses a simple protocol that was inspired by the memcached ASCII protocol. Some
of it's highlights:

<dl>
  <dt>Different data types</dt>
  <dd>Add data to lists, hashes or sets.</dd>

  <dt>Pub/Sub</dt>
  <dd>Redis comes with fast and stable Publish/Subscribe messaging system build in</dd>

  <dt>Lua scripting</dt>
  <dd>Execute Lua scripts to aggregate and process data</dd>

  <dt>Expires</dt>
  <dd>Redis allows you to set the time to live different for every key</dd>
</dl>

### [CouchDB](/documentation/databases/redis)

[Couchdb][couchdb] is also an open source database that uses JSON for
documentation storage, JavaScript for Map/Reduce queries and HTTP for an API. As
HTTP is a first class citizen in Node.js it's really easy to use this. But also:

<dl>
  <dt>Build for Offline</dt>
  <dd>
    CouchDB can replicate to devices (like smartphones) that go offline and
    syc when it's online
  </dd>

  <dt>ACID</dt>
  <dd>It does this by implementing Multi-Version Concurrency Control</dd>
</dl>

## Do we get access to the providers web interfaces?

The database details that are created for database do no provide you with access
to the providers web interfaces. The databases are created Nodejitu's account
and thus not accessible.

[mongodb]: http://www.mongodb.org/
[redis]: http://redis.io/
[couchdb]: http://couchdb.apache.org/
[meta:title]: <> (Databases)
