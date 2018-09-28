const POLYFILL_BROWSERS = require('../browsers.config.js');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        //debug: true,
        modules: false,
        useBuiltIns: 'usage',
        targets: POLYFILL_BROWSERS,
      }
    ]
  ],
}
