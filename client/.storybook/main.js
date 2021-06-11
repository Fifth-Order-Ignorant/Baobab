const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: {
    builder: "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader'],
    //   include: path.resolve(__dirname, '../'),
    // });

    // config.resolve.alias['baobab-common'] = path.resolve(__dirname, '../src/dtos');
    // config.resolve.symlinks = true;

    // config.resolve.fallback['stream'] = require.resolve('stream-browserify');

    // Return the altered config
    return {
      ...config,
      resolve: {
        ...config.resolve,
        //fallback: {
        //  ...config.resolve.fallback,
        //  "stream": require.resolve('stream-browserify'),
        //},
        alias: {
          ...config.resolve.alias,
          "baobab-common": path.resolve(__dirname, '../src/dtos')
        }
      },
      plugins: [
        ...config.plugins,
        new NodePolyfillPlugin()
      ]
    };
  },
}