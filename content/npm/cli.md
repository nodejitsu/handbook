* [Setup](#)
* [Package Management](#package-management)
	* [Install](#install-package)
	* [Publish](#publish-package)
	* [Unpublish](#unpublish-package)
* [Maintainers Management](#maintainers-management)


## Private npm Setup

## Package Management


### Install Package

```
$ npm install <package-name>
```

```
$ npm install <package-name> --save
```

```
$ npm install <package-name> --save-dev
```

### Publish Package

```
$ npm publish
```

### Unpublish Package

## Maintainers Management

### List Maintainers

```
$ npm owner ls <package-name>
```

![](../../resources/npm/npm_owner_ls.gif)

### Add Maintainer

```
$ npm owner add <username> <package-name>
```

![](../../resources/npm/npm_owner_add.gif)

### Remove Maintainer

```
$ npm owner rm <username> <package-name>
```

After adding or removing a maintainer don't forget to Sync it on the [Web Interface](web#sync-maintainers) using `Sync Maintainers` button.


[meta:title]: <> (Command Line Interface)
