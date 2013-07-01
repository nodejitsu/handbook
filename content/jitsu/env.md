# Environment control

Jitsu offers full control over the environment of your application. It is very
easy to change environment variables. Although environment variables are usually
written in uppercase, all commands are case-sensitive. Make sure you use the
proper capitalization when executing commands.

## Changing specific variables

Any environment variable can be changed using the `get` and `set` methods of
`jitsu env`. For instance if you'd like to view the value of *NODE_ENV*, simply
do `jitsu env get NODE_ENV`. This will return results as:

```
data:   NODE_ENV production
```

Changing *NODE_ENV* to staging in stead of the default production is done by
calling `jitsu env set NODE_ENV staging`. Environment variables changes will
come into effect after a [`jitsu start`][start].

---

## List current variables

By default Nodejitsu sets some environment variables for your application to
work. Inspecting the current variables is done using `jitsu env list [appname]`,
where *appname* is optional. Listing after a fresh [deploy][deploy] would look
like below. Both *SUBDOMAIN* and *NODE_ENV* are predefined for you.

```
info:    Listing all environment variables for testname
data:    { SUBDOMAIN: 'testname', NODE_ENV: 'production' }
info:    Nodejitsu ok
```

---

## Saving or loading

At any point you might want to save the environment variables to a local
JSON file. This could be handy for later use or porting to another
application. The JSON will be saved to a filename/location of your choosing.
Execute `jitsu env save [appname] [filename]`, where *appname* can be omitted.
If only *filename* is supplied, `jitsu` will save the configuration of the
application in the current directory.

Before saving you will be prompted if you are sure that you want to save
sensitive data. If so, make sure that destination directory is writable.
Also the destination will overwriten without additional confirmation, double
check if the *filename* is unique. Resulting JSON per example:

```javascript
{
  "SUBDOMAIN": "testname",
  "NODE_ENV": "production"
}
```

You can load any saved/predefined configuration by issuing `jitsu env load
[appname] [filename]`. Again, omitting *appname* will write *filename* content
to the application in the current directory. Before content is written you will
be presented with current environment variables and need to confirm:

```bash
info:    Old environment variables:
data:    { SUBDOMAIN: 'testname', NODE_ENV: 'production' }
info:    New environment variables:
data:    { SUBDOMAIN: 'testname', NODE_ENV: 'production' }
warn:    YOU CAN LOSE ENVIRONMENT VARIABLES IF YOU ARE NOT CAREFUL.
info:    Is this okay?
prompt:  yes/no:  (yes)
```

---

## Deleting any or all environment variables

Completely clearing an applications environment is possible, but should be
done with caution. As this will also delete predefined variables like
*SUBDOMAIN*. The usecase for a complete wipe, would be writing a
[load file](#saving-or-loading) after. Clearing the enviroment against the
current application can be done by `jitsu env clear`.

More fine grained control is available trough `jitsu env delete [key]`, where
*key* is required. For example, deleting `START` from configuration would be
done by executing `jitsu env delete START`. Note you will *NOT* be prompted
to confirm.

```javascript
{
  "SUBDOMAIN": "testname",
  "START": "file.js",
  "NODE_ENV": "production"
}
```
[start]: /jitsu/apps/#start
[deploy]: /jitsu/deploy/
[meta:title]: <> (Environment)
