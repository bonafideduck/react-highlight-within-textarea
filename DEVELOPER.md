# Notes to assist development of this tool.

## Install and run the app and sample app locally.

```
yarn install
(cd example && yarn install && yarn run)
```

## Create the Demo Page

The (demo page)[https://bonafideduck.github.io/react-highlight-within-textarea/]
app is published to the github pages branch. Do these steps to publish.

```
cd example
yarn dist
```

## Running Tests

`yarn test`

## Publish to NPM

Based on [these instructions](https://www.twilio.com/blog/release-custom-react-component-hook-effect-npm-package)
and [publish-to-npm action](https://github.com/marketplace/actions/publish-to-npm).

1. Manually update the "version" in package.json.
    ```
    git commit...
    ```
2. Update CHANGES.md with all significant changes.
3. Set a new version tag in git
    ```
    yarn version --minor
    ```
4. Commit and push that.  This will trigger a github action to release.
