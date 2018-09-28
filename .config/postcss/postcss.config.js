/* PostCSS Plugins */
const postcssPresetEnv = require('postcss-preset-env');
const lh = require('postcss-lh');

const AUTOPREFIXER_BROWSERS = require('../browsers.config.js');

const noop = () => { };

module.exports = ({ file, options, env }) => {
  const browsers = options.browsers || AUTOPREFIXER_BROWSERS;
  const variables = typeof options.variables === 'function' ? options.variables() : options.variables || {};
  const media = typeof options.media === 'function' ? options.media() : options.media || noop;
  const mixins = typeof options.mixins === 'function' ? options.mixins() : options.mixins || noop;
  const config = {
    plugins: [
      postcssPresetEnv({
        features: {
          customProperties: { variables: variables },
          media: { extensions: media(variables) },
          mixins: { mixins: mixins(variables) },
        }
      }),
      lh({ lineHeight: parseInt(variables.d_lh) / 10, unit: 'vr' })
    ]
  };
  return config;
};
