# ts-package-boilerplate

## Setup

`build/` dir not ignored by default.

## Publish

### Login

In order to publish your package, you need to create an NPM account.  
If you don’t have an account run command `npm adduser`
If you already have an account, run `npm login` to login to you NPM account.

### Publish

To publish your package run

```
npm publish
```

### Versioning

To patch

```
npm version patch
npm publish
```

`version` command executes `git add ...` and `git push`, see `package.json`


## Todo

- [ ] add github actions for tests and build?
