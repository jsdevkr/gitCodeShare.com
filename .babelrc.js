const env = require('./env-config.js');

module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    ['transform-define', env],
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
};
