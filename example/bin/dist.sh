#!/bin/bash
fail() {
   echo ERROR: "$*" >&2
   exit 1
}

test -d doc || git clone -b gh-pages git@github.com:bonafideduck/react-highlight-within-textarea.git || fail Could not clone doc
(cd doc && git reset --hard HEAD && git rm -rf *) || fail Could not clean up doc
yarn build || fail Yarn build failed.
cp -r build/* doc/ || fail Could not copy to doc.
(cd doc && git add .) || fail Could not git add.
(cd doc && git status -s && test "" != "$(git status -s)") || fail No changes to push.
(cd doc && git commit -m 'publish' && git push) || fail Failed to push
