const inflect = require('i')();

/**
 * @fileoverview Dissallow singular form of words in array names
 * @author Pavlo Lompas
 */
('use strict');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const fix = (node, plural) => fixer => {
  fixer.replaceText(node, plural);
};

const isArray = (node, context) => {
  let isArray = node.init && node.init.type === 'ArrayExpression';

  if (!context.parserServices.esTreeNodeToTSNodeMap) {
    return isArray;
  }

  const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(node);
  const checker = context.parserServices.program.getTypeChecker();
  const type = checker.getTypeAtLocation(tsNode);

  if (type && type.symbol) {
    isArray = type.symbol.name === 'Array';
  }

  if (isArray) {
    return isArray;
  }

  const testNode = node.type === 'FunctionDeclaration' ? node : node.init;

  if (
    ['ArrowFunctionExpression', 'FunctionDeclaration'].indexOf(
      testNode.type
    ) === -1
  ) {
    return isArray;
  }

  const initTsNode = context.parserServices.esTreeNodeToTSNodeMap.get(testNode);

  if (
    initTsNode.type &&
    initTsNode.type.typeName &&
    initTsNode.type.typeName.text
  ) {
    return initTsNode.type.typeName.text === 'RegEx';
  }

  const signature = checker.getSignatureFromDeclaration(initTsNode);

  if (signature) {
    const returnType = checker.getReturnTypeOfSignature(signature);
    isArray = returnType.symbol && returnType.symbol.name === 'Array';
  }

  return isArray;
};

module.exports = {
  name: 'no-singular-arrays',
  meta: {
    docs: {
      description: 'Disallow singular form of words in array names'
    },
    messages: {
      noSingularArrays:
        "Array name should be written in plural form: '{{ name }}' -> '{{ pluralName }}'"
    },
    fixable: 'code'
  },

  create: function(context) {
    return {
      // TODO: get return type of arrow function definition
      /**
       * Test variable declaration
       */
      VariableDeclarator(node) {
        let isNotArray = !isArray(node, context);

        const isPlural = inflect.pluralize(node.id.name) === node.id.name;

        if (isNotArray || isPlural) {
          return;
        }

        context.report({
          node,
          message: 'noSingularArrays',
          data: {
            name: node.id.name
          },
          fix: fix(node.id, inflect.pluralize(node.id.name))
        });
      },
      /**
       * Test identifier (function parameter)
       */
      Identifier(node) {
        const hasWrongAnnotation =
          !node.typeAnnotation ||
          node.typeAnnotation.typeAnnotation.type !== 'TSArrayType';

        if (hasWrongAnnotation) {
          return;
        }

        const pluralName = inflect.pluralize(node.name);
        const isPlural = pluralName === node.name;

        if (isPlural) {
          return;
        }

        context.report({
          node,
          message: 'noSingularArrays',
          data: {
            name: node.name,
            pluralName
          },
          fix: fix(node, inflect.pluralize(node.name))
        });
      },
      /**
       * Test identifier (function parameter)
       */
      FunctionDeclaration(node) {
        let isNotArray = !isArray(node, context);

        const isPlural = inflect.pluralize(node.id.name) === node.id.name;

        if (isNotArray || isPlural) {
          return;
        }

        context.report({
          node,
          message: 'noSingularArrays',
          data: {
            name: node.id.name
          },
          fix: fix(node.id, inflect.pluralize(node.id.name))
        });
      }
    };
  }
};
