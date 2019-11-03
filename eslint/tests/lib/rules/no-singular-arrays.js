/**
 * @fileoverview Dissallow singular form of words in array names
 * @author Pavlo Lompas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const path = require("path");
const rule = require("../../../lib/rules/no-singular-arrays");
const { RuleTester } = require("../RuleTester");
const rootPath = path.join(process.cwd(), 'tests/fixtures/');
const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: rootPath,
    project: './tsconfig.json',
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("no-singular-arrays", rule, {
  valid: [
    "const apples: string[] = []",
    "const apple = 'yellow'",
    "const myApples = []",
    "const men = []",
    "const children = []",
    "const people = []",
    "const women = []",
    `
      const cards = [1, 2, 3];
      const evenCards = cards.filter((card, index) => index % 2 == 0);
    `,
    `
      const text = 'some string';
      const words = text.split(' ');
    `,
    `
      const getApple = (apples: string[], ID) => {
        return apples[ID]
      }
    `
  ],

  invalid: [
    {
      code: `
        const getApple = (apple: string[], ID) => {
          return apple[ID]
        }
      `,
      errors: [
        {
          messageId: "noSingularArrays"
        }
      ]
    },
    // TODO: get return type of arrow function definition
    // {
    //   code: `
    //     const getEvenCard = (cards: number[], ID) => {
    //       return cards.filter((card, index) => index % 2 == 0)
    //     }
    //   `,
    //   errors: [
    //     {
    //       messageId: "noSingularArrays"
    //     }
    //   ]
    // },
    {
      code: `
        const cards = [1, 2, 3];
        const evenCard = cards.filter((card, index) => index % 2 == 0);
      `,
      errors: [
        {
          messageId: "noSingularArrays"
        }
      ]
    },
    {
      errors: [
        {
          messageId: "noSingularArrays"
        }
      ],
      code: `
        const text = 'some string';
        const word = text.split(' ');
      `,
    },
    {
      code: "const man = [];",
      errors: [
        {
          messageId: "noSingularArrays"
        }
      ]
    },
    {
      code: "const woman = [];",
      errors: [
        {
          messageId: "noSingularArrays"
        }
      ]
    },
    {
      code: "const apple = [];",
      errors: [
        {
          messageId: "noSingularArrays"
        }
      ]
    },
    {
      code: "const myApple = [];",
      errors: [
        {
          messageId: "noSingularArrays"
        }
      ]
    }
  ]
});
