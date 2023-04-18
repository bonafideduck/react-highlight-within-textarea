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

## Update the dependencies

```
rm yarn.lock demo/yarn.lock
npx npm-check-updates -u --dep dev && yarn
(cd demo && npx npm-check-updates -u && yarn)
```

## Publish Update

In a branch off of main, do the following:

```sh
checkout main
yarn upgrade --latest
vi HISTORY.md
git commit
yarn build
yarn publish --bug # --minor --major --new-version # --tag alpha # for prerelease
git push --follow-tags

checkout release-3.x.x
git merge origin/main
git push
```

* Merge this publish branch into release on github using 
[this link](https://github.com/bonafideduck/react-highlight-within-textarea/pull/new/develop)


