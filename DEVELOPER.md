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
3. Bump the version and commit.
    ```
    yarn version --patch
    ```
    Note that this creates a RC-Vmajor.minor.patch version tag.  You may
    optionally 'git commit --follow-tags' so you can reference to it in
    your repository.  If this is a forked repository, the main repository
    will not inherit this tag.
    system.
4. Commit and push that.  This will trigger (by the comment) a github 
    action to release when pushed to master.
