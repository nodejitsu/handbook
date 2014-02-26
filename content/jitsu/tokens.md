# Tokens

Token management for your accounts is available through `jitsu tokens *` commands.
Using Tokens you will be able to share your account without share the password of the account. This tokens are used to autenticate with our API, so keep it in secret.

## List all tokens

```
jitsu tokens list
```

Listing all available tokens, can be done with `jitsu tokens list [username]`,
where *username* is optional. You will be prompted to enter the password of the
account your trying to list the tokens for, per example:

```
info:    Welcome to Nodejitsu
info:    jitsu v0.12.10, node v0.8.22
info:    It worked if it ends with Nodejitsu ok
info:    Executing command tokens list [username]
info:    Listing all tokens for [username]
prompt: password:
data:    name         token
data:    tokenname1   4b7df949-1c21-4b70-8770-2c5615bc1d9a
data:    tokenname2   5116b717-988c-467c-8ae4-ae49896e8a3a
info:    Nodejitsu ok
```


## Create a new token

```
jitsu tokens create [token name]
```

Adding a token to an account can be done with
`jitsu tokens create [token name]`, where *token name* is a unique
chosen identifier/name.

## Remove a token

Removing a token is done by issuing `jitsu tokens
destroy [username] [token name]`. In the example above *token name* could be
`tokenname1` or `tokenname2`.

## Configure `jitsu` to authenticate using a token

Using this feature you can easily share the access of an account without share the password.

 * [Create a new token](#create-a-new-token)
 * Share the token with a third party
 * Configure `jitsu` to authenticate using a token

To configure `jitsu` use the next commands:

```
$ jitsu config set apiTokenName sharedTokenName
$ jitsu config set apiToken xxx-xxx-xxx-xxx
$ jitsu config set username myusername
```

[meta:title]: <> (Tokens)
