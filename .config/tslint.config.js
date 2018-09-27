const path = require('path');
const SOURCE_DIR = path.resolve(process.cwd(), 'src');

module.exports = {
  'extends': 'tslint-config-standard',
  'defaultSeverity': 'warning',
  'rules': {
    'arrow-return-shorthand': [true],
    'comment-format': false,
    'curly': false,
    'interface-name': [true, 'always-prefix'],
    'member-ordering': false,
    'no-empty': false,
    'no-extra-boolean-cast': false,
    'no-unused-variable': false,
    'ordered-imports': true,
    'strict-type-predicates': false,
    'semicolon': [true, 'always', 'ignore-interfaces'],
    'space-before-function-paren': [true, 'never'],
    'trailing-comma': [true, { 'multiline': 'always', 'singleline': 'never' }],
  },
  'linterOptions': {
    'exclude': [
      path.join(SOURCE_DIR, 'schema.ts'),
    ],
  },
};
