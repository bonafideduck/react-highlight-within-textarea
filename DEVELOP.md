# Development Process

## Localhost Server

```
yarn start
```

## Build and Test

```
yarn build
open demo/dist/index.html
```

## Publish New Demo

```
yarn publish-pages
```
* Manually edit each CodeSandbox ReactHighlightWithinTextarea version.


## Publish Update

* Merge develop into release on github using 
[this link](https://github.com/bonafideduck/react-highlight-within-textarea/pull/new/develop)

```
git pull
git checkout main
yarn upgrade --latest
yarn build
vi HISTORY.md
git commit
yarn publish
```

`yarn publish --tag alpha` for prerelease.
