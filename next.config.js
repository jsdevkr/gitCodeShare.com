const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withPlugins([
  [
    withTypescript,
    {
      webpack(config, options) {
        // Do not run type checking twice:
        if (options.isServer)
          config.plugins.push(new ForkTsCheckerWebpackPlugin());

        return config;
      },
    },
  ],
  [withSass],
  [
    withLess,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
    },
  ],
]);
