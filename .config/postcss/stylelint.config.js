module.exports = {
  'extends': 'stylelint-config-standard',
  'rules': {
    /* Selectors */
    'selector-list-comma-newline-after': 'always-multi-line',
    'selector-list-comma-space-after': 'always-single-line',
    'selector-attribute-operator-space-after': null,
    'selector-type-no-unknown': [
      true,
      {
        'ignoreTypes': [
          '/deep/'
        ]
      }
    ],

    /* Prefixes */
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,

    /* Custom */
    'block-no-empty': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['/^(define-)?mixin/'] }],
    'unit-no-unknown': [true, { ignoreUnits: ['vr'] }],
  }
};
