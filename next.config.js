const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
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
        if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());

        // Add entry point for chrome extention TODO: What about HTML?
        // const entryFactory = config.entry;
        // config.entry = () =>
        //   entryFactory().then(entry => {
        //     entry['main.js'] = ['./chrome-extension/src/index.ts', ...entry['main.js']];
        //     return entry;
        //   });

        return config;
      },
    },
  ],
  [
    withLess,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
    },
  ],
  [withSass],
  [
    withCSS,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
  ],
]);
