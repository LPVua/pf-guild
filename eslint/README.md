# eslint-plugin-pf-rules

Custom eslint rules for Property Finder FE

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-pf-rules`:

```
$ npm install eslint-plugin-pf-rules --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-pf-rules` globally.

## Usage

Add `pf-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "pf-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "pf-rules/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





