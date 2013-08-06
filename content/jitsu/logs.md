# Viewing application logs

Logging is critical for application management. Good logs will make the life of
a developer easier. For instance, if your application stopped working checking
the logs before calling [support][support] is the way to go. `jitsu logs` can be
used in a variety of ways. Executing this command from inside a project folder
containing a [package.json][package] will show logs for the current project. If
no logs are generated yet `jitsu logs` will return `No logs for [appname] in
specified timespan`.

Running the command outside a project folder will show a list the authenticated
users' applications. You will be prompted for which application you would like
to show the logs. Supplying the *appname* will show the respective logs.

```bash
info:    Welcome to Nodejitsu [username]
info:    jitsu v0.11.6, node v0.8.14
info:    It worked if it ends with Nodejitsu ok
info:    Executing command logs app
info:    Listing all apps for [username]
data:    name         state   subdomain          drones running snapshot
data:    [appname]    started [subdomain]        1/3    apps-xxx-0.x.x-xx.tgz
data:    [appname]    started [subdomain]        1/3    apps-xxx-0.x.x-xx.tgz
data:    [appname]    started [subdomain]        1/3    apps-xxx-0.x.x-xx.tgz

info:    Which application to view logs for?
prompt: app name:
```

## Per application

Application logs can also be aquired by specifing the application name on the
CLI. `jitsu logs app [appname]` will show the logs for application *appname*.
To reduce output, execute `jitsu logs app [appname] [n]` where *n* is an
integer. If you stored another account in a local configuration file, you could
access your applications easily without switching accounts by doing:

```bash
jitsu logs app [username]/[appname] -j $HOME/.userconf
```

Note the slash between *username* and *appname*. Also *$HOME* should point to the
location where the configurations are stored, by default this would be your home
folder.

## Tailing logs

Tracking issues caused by dynamic application behavior can be difficult to track
with static logs. That is why Nodejitsu supports tailing logs. This command can
be issued from the project directory. Tailing logs from any random directory will
show your list of applications. Also, the additional options listed below
are available as well.

```bash
jitsu logs tail
```

## Additional useful options

If you would like to pipe log output to another script/service you can use the
`--raw` option. This will output the logs as line-delimited raw JSON. Also
`--no-colors` will disable coloring of the log output.

[package]: /appendix/package-json/
[support]: /support/
[meta:title]: <> (Viewing logs)
