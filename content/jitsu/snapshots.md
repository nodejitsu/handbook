# Working with snapshots

The `jitsu snapshots` command manages snapshots for applications on Nodejitsu.
Snapshots are images of the applications code that is deployed to the
Nodejitsu Platform. You can compare snapshots to tarballs or zipped content.
For commands that take a *appname* parameter, if no parameter is supplied,
jitsu will attempt to read the [package.json][package] from the current directory.

## List all snapshots

To show a list of all snapshots, simply do `jitsu snapshots list [appname]`. The
list is chronological in descending order. The latest snapshot will be listed as
active. Results should be something like below:

```bash
data:    name     status   created                 md5
data:    0.2.0-2  archived 08/25 02:18:46 GMT+0200 aec8c128dc140ae55a502f013f1c0a19
data:    0.2.0-3  archived 08/25 02:30:01 GMT+0200 74015351d37add683d77f5993fca10e7
data:    0.2.0-4  active   08/25 03:07:28 GMT+0200 e273917229236e3fbcc62a8e4408b169
```

## Activating a specific snapshot

If you need to revert to an older state quickly you can simply activate an older
snapshot. Making `jitsu snapshots activate [appname]` perfect for crisis
management. Active will also start the snapshot for you, so you can work
continue work on a fix right after. In the example below `0.3.0-1` will be
activated.

```
data:    0.3.0-1 archived 02/11 11:58:02 GMT+0100 2091668dafe62815dd7afa88ad021e2e
data:    0.3.0-2 active   02/11 12:02:59 GMT+0100 ad8ed5121c03302d61d885de65f00298
prompt: Snapshot Name:  0.3.0-1
```

## Grabbing snapshots from the cloud

You can download any snapshot to inspect or modify it. The snapshot might
provide insight in any error or failure. For instance, if a [directory][deploy] is
unintentionally [not included][missing] in the snapshot. Grabbing a snapshot,
changing code and redeploying is possible, but Nodejitsu recommends using
[git][git] for code management, as it will improve your workflow.

To get a snapshot from the cloud use `jitsu snapshots fetch [appname]`. You will
be prompted to enter the snapshot name. Snapshot names are equal to the version
at deployment. In the example below, the *snapshot name* would be `0.2.0-2`

```
data:    0.2.0-2  archived 08/25 02:18:46 GMT+0200 aec8c128dc140ae55a502f013f1c0a19
```

## Removing snapshots

This command is potentially harmful and should be used with caution. Destroy
will remove any snapshot of your choosing but cannot be undone.

`jitsu snapshots destroy [appname]` will ask you if you want to proceed
initially, after you will be prompted to supply the *snapshot name*. In the
example below, the *snapshot name* would be `0.3.0`
```
data:    0.3.0  archived 02/11 11:38:22 GMT+0100 0bfc425bff1ddc845036786f1b82b9c2
```

This snapshot will be permanantly removed, without means of recovery. Make sure
you do not remove your active snapshot as this will kill your running application.

[git]: http://www.github.com/
[deploy]: /jitsu/deploy/#what-is-deployed
[missing]: /faq/#how-can-i-change-the-name-of-my-application
[package]: /appendix/package-json/
[meta:title]: <> (Application snapshots)
