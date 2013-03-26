# Manage your applications

`jitsu apps` has commands to manage your application from top to bottom. Some
commands have shorthand variants. Also commands that take a *name* parameter,
if no parameter is supplied, jitsu will attempt to read the package.json from
the current directory.

## Deploy

Deploy your application to our cloud, for full details see the shorthand in
jitsu [deploy][deploy].

```bash
jitsu apps deploy
```

---

## List

To show all applications of the authenticated user, you can issue either of
the following commands.

```bash
jitsu list        # shorthand
jitsu apps list   # longhand
```

---

## Create

This command will prepare an application in our cloud based on the current
[package.json][package]. However, unlike `jitsu deploy` it will not create a
snapshot of your application also no drones will be appointed. This is
particularly useful if you would like to claim a subdomain immediatly, even
before your application is production ready. The moment your application is
ready you can [deploy][deploy] to the subdomain with `jitsu deploy`.

```bash
jitsu apps create
```

---

## View

Inspecting the applications configuration in our cloud can be done with view,
where *appname* is the application name you would like to inspect.

```
jitsu apps view [appname]
```

This command will provide relevant information about the available packages,
databases and environment, like:

```bash
data:    {
data:        engines: { node: '0.8.x' },
data:        drones: 1,
data:        dependencies: { ... },
data:        maxDrones: 1,
data:        mtime: '02/11 12:03:00 GMT+0100',
data:        active: { ... },
data:        repository: { type: 'git', url: 'xxx' },
data:        description: 'Hello world',
data:        snapshots: [ ... ],
data:        domains: [],
data:        user: [username],
data:        main: 'server.js',
data:        scripts: { start: 'node server.js' },
data:        subdomain: [subdomain],
data:        env: { SUBDOMAIN: [subdomain], NODE_ENV: 'production' },
data:        name: [appname],
data:        version: '0.3.0-2',
data:        databases: {},
data:        config: {},
data:        ctime: '02/11 11:37:07 GMT+0100'
data:    }
```

---

## Update

Updates the application in the current directory with the information in
the [package.json][package] file. If *appname* is supplied the application
with *appname* is updated.

Note that it will always be updated to the package.json in the current
directory. Use with caution, as the command is potentially harmful, e.g. you
could overwrite an applications package.json with another applications
package.json.

```bash
jitsu apps update [appname]
```

---

## Destroy

This command will completely remove your application and its snapshots from
our cloud, free up the subdomain and used drones. Since this can be potentially
destructive you will always be asked for confirmation, which defaults to `yes`.
The shorthand is `jitsu destroy.`

```bash
jitsu apps destroy [appname]
```

---

## Start

Start your application with this command or use the shorthand `jitsu start`,
for instance after you have [stopped](#stop) your application.

```bash
jitsu apps start [appname]
```

---

## Restart

Restarting an application is only possible if the current state is `started`. If
the application is in a [stopped](#stop) state, simply use [start](#start). 500
errors can usually be resolved with an application restart.

```bash
jitsu apps restart [appname]
```

---

## Stop

Stop your application with this command or use the shorthand `jitsu stop`.
Stopping the application will free up the drone, so it can be used for
another application. The running snapshot and subdomain of the stopped
application are retained.

```bash
jitsu apps stop [appname]
```

---

## Set number of drones per application

Subscriptions authenticated to use multiple drones, for instance [individual
small][pricing] can change the drone count per application. To change the
drone usage by any of your applications use setdrones. *Number* is an integer
lower than the maximum allowed by the subscription, 3 in this example.

```bash
jitsu apps setdrones [appname] [number]
```

---

## Cloud

Business subscriptions can control the cloud distribution of their application.
Simply viewing the current provider, datacenter, number of used drones and ram
can be done by using the first command. For more information about changing
clouds, see [business plans][plans] documentation.

```bash
jitsu apps cloud [appname]                                # list cloud information
jitsu apps cloud [name] <provider> <datacenter> [drones]  # change cloud
```

Querying for information, could provide the following results:

```bash
data:    {
data:        datacenter: 'us-east-1',
data:        drones: 1,
data:        ram: 256,
data:        provider: 'joyent'
data:    }
```

[plans]: /features/business/
[cloud]: /jitsu/cloud/
[package]: /appendix/package-json/
[deploy]: /jitsu/deploy/
[meta:title]: <> (Manage applications)
