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

```
yarn upgrade --latest
yarn build
vi HISTORY.md
git commit
yarn publish
```
