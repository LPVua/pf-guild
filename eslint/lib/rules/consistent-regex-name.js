const toNoCase = require('to-no-case');

/**
 * @fileoverview Enforce consistent regex variable name
 * @author Pavlo Lompas
 */
('use strict');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const regexTypes = ['splitter', 'validator', 'replacer', 'matcher'];

const testConsistentName = (node, context) => {
  const nameArray = toNoCase(node.id.name).split(' ');

  if (nameArray.length < 2) {
    context.report({
      node,
      message: 'consistentRegexNameMessage',
      data: {
        name: node.id.name
      }
    });

    return;
  }

  if (nameArray[nameArray.length - 1] !== 'regex') {
    context.report({
      node,
      message: 'consistentRegexNameMessage',
      data: {
        name: node.id.name
      }
    });

    return;
  }

  if (regexTypes.indexOf(nameArray[nameArray.length - 2]) === -1) {
    context.report({
      node,
      message: 'consistentRegexNameMessage',
      data: {
        name: node.id.name
      },
      fix: (fixer) => {
        fixer.replaceText(node, )
      }
    });
  }
};
const isRegex = (node, context) => {
  const isRegex = !!node.init && node.init.regex;

  if (isRegex) {
    return isRegex;
  }

  if (!context.parserServices.esTreeNodeToTSNodeMap) {
    return isRegex;
  }

  const testNode = node.type === 'FunctionDeclaration' ? node : node.init;

  if (
    ['ArrowFunctionExpression', 'FunctionDeclaration'].indexOf(
      testNode.type
    ) === -1
  ) {
    return isRegex;
  }

  const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(testNode);

  if (tsNode.type && tsNode.type.typeName && tsNode.type.typeName.text) {
    return tsNode.type.typeName.text === 'RegEx';
  }

  const checker = context.parserServices.program.getTypeChecker();
  const signature = checker.getSignatureFromDeclaration(tsNode);

  if (signature) {
  const returnType = checker.getReturnTypeOfSignature(signature);
    return returnType.symbol && returnType.symbol.name === 'RegExp';
  }

  return false;
};

module.exports = {
  name: 'consistent-regex-name',
  meta: {
    docs: {
      description: 'Enforce consistent regex variable name'
    },
    messages: {
      consistentRegexNameMessage:
        'Regex variable name should include expression type and Regex suffix'
    },
    fixable: 'code'
  },

  create: function(context) {
    return {
      /**
       * Test variable declaration
       */
      VariableDeclarator(node) {
        if (!isRegex(node, context)) {
          return;
        }

        testConsistentName(node, context);
      },
      /**
       * Test identifier (function parameter)
       */
      FunctionDeclaration(node) {
        if (!isRegex(node, context)) {
          return;
        }

        testConsistentName(node, context);
      }
    };
  }
};
