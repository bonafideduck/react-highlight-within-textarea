# Notes to assist development of this tool.

## Install and run the app and sample app locally.

**TBD**

## Create the Demo Page

**This doesn't actually work yet.**

The (demo page)[https://bonafideduck.github.io/react-highlight-within-textarea/]
app is published to the github pages branch. Currently it is a manual process.

```
cd example
git clone git clone -b gh-pages git@github.com:bonafideduck/react-highlight-within-textarea.git doc
yarn build
(cd doc && git rm -rf *)
cp -r dist/* doc
cp public/* doc
cd doc 
git add .
git commit -m 'updated pages'
git push
```

## Running Tests

`yarn test`

## Publish to NPM

TBD, but likely follow [these instructions](https://www.twilio.com/blog/release-custom-react-component-hook-effect-npm-package).


