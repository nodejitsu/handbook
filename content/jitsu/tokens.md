# Tokens

Token management for your accounts is available through `jitsu tokens *`.
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

Adding a token to an account can be done with
`jitsu tokens create [username] [token name]`, where *token name* is a unique
chosen identifier/name. Removing a token is done by issuing `jitsu tokens
destroy [username] [token name]`. In the example above *token name* could be
`tokenname1` or `tokenname2`.

[meta:title]: <> (Tokens)
