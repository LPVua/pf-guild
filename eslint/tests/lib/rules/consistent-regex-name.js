/**
 * @fileoverview Enforce consistent regex variable name
 * @author Pavlo Lompas
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const path = require('path');
const rule = require('../../../lib/rules/consistent-regex-name');
const { RuleTester } = require('../RuleTester');
const rootPath = path.join(process.cwd(), 'tests/fixtures/');
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: rootPath,
    project: './tsconfig.json'
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('consistent-regex-name', rule, {
  valid: [
    `
      const dummyConst = 'const name';
      const addressMatcherRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
    `,
    'const phoneNumberSplitterRegex = /-/;',
    'const numberValidatorRegex = /^[0-9]$/;',
    'const fieldReplacerRegex = /{([a-zA-Z]+)}/;',
    `
      const getPhoneNumberSplitterRegex = () => /-/;
    `,
    `
      function getPhoneNumberSplitterRegex(): RegEx {

        const splitterRegex = /-/;

        return splitterRegex;
      };
    `
  ],

  invalid: [
    {
      code: `
        const addressRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
      `,
      errors: [
        {
          messageId: 'consistentRegexNameMessage'
        }
      ]
    },
    {
      code: `
        const addressMatcher = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
      `,
      output: `
        const addressMatcherRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
      `,
      errors: [
        {
          messageId: 'consistentRegexNameMessage'
        }
      ]
    },
    {
      code: `
        const getPhoneNumberRegex = () => /-/;
      `,
      errors: [
        {
          messageId: 'consistentRegexNameMessage2'
        }
      ]
    },
    {
      code: `
        const getPhoneNumberSplitter = () => /-/;
      `,
      output: `
        const getPhoneNumberSplitterRegex = () => /-/;
      `,
      errors: [
        {
          messageId: 'consistentRegexNameMessage'
        }
      ]
    },
    {
      code: `
        const getPhoneNumber = () => /-/;
      `,
      output: `
        const getPhoneNumberRegex = () => /-/;
      `,
      errors: [
        {
          messageId: 'consistentRegexNameMessage'
        }
      ]
    },
    {
      code: `
        function getPhoneNumberRegex(): RegEx {

          const splitterRegex = /-/;

          return splitterRegex;
        };
      `,

      errors: [
        {
          messageId: 'consistentRegexNameMessage2'
        }
      ]
    },
    {
      code: `
        function getPhoneNumberSplitterRegex(): RegEx {

          const splitter = /-/;

          return splitter;
        };
      `,
      // TODO: rename references as well
      output: `
        function getPhoneNumberSplitterRegex(): RegEx {

          const splitterRegex = /-/;

          return splitter;
        };
      `,
      errors: [
        {
          messageId: 'consistentRegexNameMessage'
        }
      ]
    }
  ]
});
