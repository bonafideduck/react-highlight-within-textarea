# HISTORY

## 3.2.1

- Fix #175 improving performance by adding DecoratorFactory to cache previous decorators.

## 3.2.0

- Mistakenly published version.

## 3.1.1 - 17-Aug-2022

- Fix #157 where a crash happened when changing value with no focus

## 3.1 - 17-Jul-2022

- Version 3.0.4-alpha.7 released as an official build.

## 3.0.4-alpha.7

- A complete rebuild of RHWTA adding typescript and DraftJS properties

## 2.1.3 - 22-Jan-2022

- Fix #85, Range highlight does not work if boundary is end of the string

- `yarn upgrade --latest`

## 2.1.2 - 6-Nov-2021

- Add Selection and in addition to when the value changes, call onChange when the selection changes.

- exported createDecorator to allow using the highlighting from draft.js directly.

## 2.1.1 - 16-Oct-2021

- Fixed #55, Issues with editing the existing text

## 2.1.0-beta - 18-July-2021
- Fixed #39, Array of Two Numbers (Range) highlights on multiple rows, when new lines are used in the text
- [Not backwards compatible] Changed strategy function profile to receive the text and not the draftJS ContentState
- [Not backwards compatible] Changed parameters supplied to the Decorator Components to not expose draftJS data

## 2.0.0 - 14-June-2021
- Draft-js based rewrite

## 1.0.2 - 9-June-2021
- Documentation changes to introduce 2.0 Alpha

## V1.0.1 - 6-Mar-2021
- Fixed README.md to be included in distribution.

## V1.0.0 - 6-Mar-2021

- Added the "enhancement" parameter to highlight to allow 
    wrapping with decorators of the spans.

## V0.9.12 - 13-Oct-2020

- Update package.json due to dependabot alerts for react.

## V0.9.11 - 22-July-2020

- Update yarn.lock due to lodash security issues.
- Improve release tooling and documentation.

## V0.9.10 - 29-June-2020

- Fixes scrolling.
- Disables resize and adds note in README.md that it needs to be fixed.

## V0.9.9 - 23-June-2020

- Initial published version.
