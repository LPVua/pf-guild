const { ESLintUtils } = require('@typescript-eslint/experimental-utils');

const createRule = ESLintUtils.RuleCreator();

module.exports = createRule({
  name: 'rule-name',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'rule-description'
    },
    schema: [
      // fill in your schema
    ]
  },
  create(context) {
    return {
      TSArrayType(node) {

      }
    }
  }
})
