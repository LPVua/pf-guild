# Disallow singular form of words in array names (no-singular-arrays)

This rule ensures that array variables are named in plural

## Rule Details

This rule aims to increase readability of the codebase by defining explicit rules on
naming of the array variable

Examples of **incorrect** code for this rule:

```js
const myApple = [];
const apple = [];
const evenCard = cards.filter((card, index) => index % 2 == 0);
```

Examples of **correct** code for this rule:

```js
const myApples = [];
const cards = [1, 2, 3];
const evenCards = cards.filter((card, index) => index % 2 == 0);
```
