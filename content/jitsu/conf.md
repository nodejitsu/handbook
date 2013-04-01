# Configuring jitsu

To show your current jitsu configuration do `jitsu conf`. Results will contain
information about our API location, your username and authentication token.
*Username* and *token* have been removed from the example below but should
contain details specific to your account.

```bash
data:    {
data:        directories: {},
data:        userconfig: '/home/user/.jitsuconf',
data:        remoteHost: 'api.nodejitsu.com',
data:        username: '[username]',
data:        api-token: '[token]'
data:    }
```

Changing any of the keys is possible through `jitsu conf set [key] [value]`.
For example, to change the `username` to any alternative username execute
`jitsu conf set username otherusername`.

---

## Command specific flags

Jitsu also provides a myriad of different flags that can be appended to each
command, here is a short overview.

#### Release

Appending `--release` or `-r` will allow you to specify a release version
number or semantic increment, e.g: *build*, *patch*, *minor*, *major*. For
example `jitsu deploy --release minor` will increment the minor version number
(build version increment is default).

#### Colors

Changing color output is available through `--colors`. By default coloring of
output is on, this can be disabled by appending `--no-colors`.

#### Confirm

If you are confident on jitsu actions you can prevent additional prompts to
confirm actions by appending `--confirm` or `-c`.

#### Alternative configuration

Any alternative `jitsu` configuration can be loaded from file, without switching
accounts.

**Local and parent directories:** Append `--localconf`

**Specified file location:** Append `--jitsuconf` or `-j` followed by file location.

#### Version

Useful for support questions and the like, aquire your current `jitsu` version
by appending `--version` or `-v`.

#### Skip analyzing

Skipping dynamic dependency detection can be done by appending `--noanalyze`.

#### Raw output

If you need all `jitsu` output as raw JSON, e.g. for piping, append `--raw`.

[meta:title]: <> (Configuration)
