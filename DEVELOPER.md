# Notes to assist development of this tool.

## Install and run the app and sample app locally.

```
(cd react-highlight-within-textarea && yarn install && yarn watch &)
(cd example && yarn install && yarn start)
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

1. Manually update the "version" in package.json and update HISTORY.md.  Do not commit!
2. Run `yarn rc` which commits the current code with the "Release candidate for x.y.z".
3. `git push` 4. This will trigger (by the comment) a github action to release when pushed to master.
4. If that fails, just repeat the above steps.
