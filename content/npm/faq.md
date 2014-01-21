# Private npm FAQ

### Will my private registry stay up If the public registry goes down?
Yes, it will remain online and you will be able to use `npm` without problems.

### Can anyone else access my registry?
Only the team members defined in the Web Interface can access your registry.

### How can I make sure I don't accidentally publih to the public registry?
You can use the `publishConfig` property in your `package.json`:

For example:

``` json
{
	"publishConfig": { "registry": "https://your-subdomain.registry.nodejitsu.com" }
}
```

### What happens if I need to change my password on the public npm registry?
Nothing! As long as your `.npmrc` is kept up to date the use of your private npm
will be as seamless as the public registry!

[meta:title]: <> (FAQ)
