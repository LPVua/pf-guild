# Enforce consistent regex variable name

This rule enforces correct regex variable name according to best practices guide

## Rule Details

This rule aims to increase consistency of the codebase by enforcing correct regex variable name

Examples of **incorrect** code for this rule:

```js
const addressRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const addressMatcher = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const getPhoneNumberRegex = () => /-/;
const getPhoneNumberSplitter = () => /-/;
const regex = /-/;
```

Examples of **correct** code for this rule:

```js
const addressMatcherRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const phoneNumberSplitterRegex = /-/;
const numberValidatorRegex = /^[0-9]$/;
const fieldReplacerRegex = /\{([a-zA-Z]+)\}/;
const getPhoneNumberSplitterRegex = () => /-/;
function getPhoneNumberSplitterRegex(): RegEx {
  const splitterRegex = /-/;

  return splitterRegex;
}
```
