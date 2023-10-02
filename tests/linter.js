const eslint = require('eslint');

function getLinter(type, chapter) {
  const rules = {
    // ENABLED RULES:

    eqeqeq: 'error',
    'prefer-let/prefer-let': 'error',
    'no-tabs': 'error',
    'space-infix-ops': 'error',
    'space-before-blocks': 'error',
    'func-call-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/no-for-in-array': 'error',
    'no-prototype-builtins': 'error',
    'object-curly-spacing': [
      'error',
      'always',
      { arraysInObjects: true, objectsInObjects: true },
    ],
    'keyword-spacing': ['error', { before: true }],
    'key-spacing': ['error', { beforeColon: false }],
    'array-element-newline': ['error', 'consistent'],
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', 'consistent'],
    'no-useless-return': 'error',
    'no-unneeded-ternary': 'error',

    // Nitpicky, but could be useful
    // 'one-var': ['error', 'never'],
    // 'comma-dangle': ['error', 'always-multiline'],
    // 'operator-assignment': ['error', 'always'],
    // 'no-negated-condition': 'error',
    // 'function-paren-newline': ['error', 'multiline'],
    // semi: ['error', 'always'],
    // quotes: ['error', 'single', { avoidEscape: true }],
    // 'no-shadow': 'error',

    // DISABLED RULES:

    // Snippets can be fragments, code can be in diffent files without imports, etc.
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // One snippet has an empty function to discuss arguments
    'no-empty': 'off',

    // Some snippets redeclare variables with strikethrough styles
    'no-redeclare': 'off',

    // Allow `while (true) {}`
    'no-constant-condition': ['error', { checkLoops: false }],

    // Overlaps with `no-tabs` rule
    'no-mixed-spaces-and-tabs': 'off',
  };

  if (chapter > 4) {
    rules['@typescript-eslint/prefer-for-of'] = 'error';
  }

  return new eslint.ESLint({
    overrideConfig: {
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      plugins: ['prefer-let', '@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 6,
      },
      rules,
    },
  });
}

module.exports = { getLinter };
