/**
 * @fileoverview a
 * @author a
 */

const RuleTester = require('../RuleTester');
const rule = require("../../../lib/rules/a"),
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run("a", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "a",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
