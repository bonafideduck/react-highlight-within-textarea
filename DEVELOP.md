# Development Process

## Localhost Server

```
yarn start
```

## Build and Test

no testing is yet supported

## Publish New Demo

```
yarn publish-pages
```
* Manually edit each CodeSandbox ReactHighlightWithinTextarea version.


## Publish Update

In a branch off of main, do the following:

```sh
yarn upgrade --latest
vi HISTORY.md
git commit
npm version patch # minor major 'name'
git push --follow-tags
yarn build
yarn publish # --tag alpha # for prerelease
```
* Merge this publish branch into release on github using 
[this link](https://github.com/bonafideduck/react-highlight-within-textarea/pull/new/develop)


