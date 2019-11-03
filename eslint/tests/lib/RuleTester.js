const {
  TSESLint,
  ESLintUtils
} = require("@typescript-eslint/experimental-utils");
const path = require('path');
const parser = "@typescript-eslint/parser";

class RuleTester extends TSESLint.RuleTester {

  // as of eslint 6 you have to provide an absolute path to the parser
  // but that's not as clean to type, this saves us trying to manually enforce
  // that contributors require.resolve everything
  constructor(options) {
    super({
      ...options,
      parser: require.resolve(options.parser)
    });

    if (options.parserOptions && options.parserOptions.project) {
      this.filename = path.join(getFixturesRootDir(), "file.ts");
    }
  }

  // as of eslint 6 you have to provide an absolute path to the parser
  // If you don't do that at the test level, the test will fail somewhat cryptically...
  // This is a lot more explicit
  run(name, rule, tests) {
    const errorMessage = `Do not set the parser at the test level unless you want to use a parser other than ${parser}`;

    if (this.filename) {
      tests.valid = tests.valid.map(test => {
        if (typeof test === "string") {
          return {
            code: test,
            filename: this.filename
          };
        }
        return test;
      });
    }

    tests.valid.forEach(test => {
      if (typeof test !== "string") {
        if (test.parser === parser) {
          throw new Error(errorMessage);
        }
        if (!test.filename) {
          test.filename = this.filename;
        }
      }
    });
    tests.invalid.forEach(test => {
      if (test.parser === parser) {
        throw new Error(errorMessage);
      }
      if (!test.filename) {
        test.filename = this.filename;
      }
    });

    super.run(name, rule, tests);
  }
}

function getFixturesRootDir() {
  return path.join(process.cwd(), 'tests/fixtures/');
}

const { batchedSingleLineTests } = ESLintUtils;

module.exports = { RuleTester, batchedSingleLineTests };
