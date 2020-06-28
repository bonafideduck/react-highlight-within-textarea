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

1. Make sure your code is committed.
    ```
    git commit...
    ```
2. Set a new version tag in git
    ```
    yarn version
    ```
3. Push the new version to git
    ```
    git push --follow-tags
    ```

Once this tag is pushed to master, it publish-to-npm will automatically do this action.
