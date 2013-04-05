# Account management

Account management can be done from the CLI by using `jitsu users`. The
following commands are at your disposal to change account details.

---

## Usernames

**Who Am I?**

To check the current authenticated account name, do `jitsu users whoami`. The
response should read as below where *username* is the current logged in
account name.

```
info:    You are: [username]
```

**Is a new account name available?**

Account name availability for a new account can be checked with `jitsu users
available [username]` where *username* is the name of your choice. The feedback
should contain either:

```
info:    Username [username] is not available // or
info:    Username [username] is available
```

---

## Passwords

**Change your password**
If you would like to change your current password, make sure you are logged in
with the right user. Changing your password can be done by calling
`jitsu users changepassword`. You will be prompted to enter a new password first
and to confirm it after, like so:

```
info:    Welcome to Nodejitsu [username]
info:    jitsu v0.12.8, node v0.8.22
info:    It worked if it ends with Nodejitsu ok
info:    Executing command users changepassword
prompt:  password:
prompt:  confirm password:
```

**Lost your password?**

Losing your password is cumbersome, but we provide easy recovery through
`jitsu users forgot [username]`. Where *username* is your account name for which
you would like to recover the password. You should receive an e-mail on e-mail
address known to Nodejitsu. The e-mail will provide instructions to complete
recovery. To reset your password run the following jitsu command:

```
jitsu users forgot [username] [handshake]
```

This command can be copy-pasted from the e-mail. The *handshake* is the
unique identifier temporarily bound to your account to reset your password.
After entering above command you will be prompted to enter your new password.

---

## Account control

Login, logout and signup can both be done shorthand and through `jitsu users`.
For more details see [Jitsu CLI][main]

```
jitsu users create // signup
jitsu users login // login
jitsu users logout // logout
```

[main]: /jitsu/#sign-up
[meta:title]: <> (User management)
