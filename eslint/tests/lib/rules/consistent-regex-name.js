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
        const addressMatcher= /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
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
          messageId: 'consistentRegexNameMessage'
        }
      ]
    },
    {
      code: `
        const getPhoneNumberSplitter = () => /-/;
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
          messageId: 'consistentRegexNameMessage'
        }
      ]
    },
    {
      code: `
        function getPhoneNumberSplitterRegex(): RegEx {

          const splitter = /-/;

          return splitterRegex;
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
