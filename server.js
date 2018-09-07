require('dotenv').config();

// Transpile all code following this line with babel and use 'env' (aka ES6)
require('ts-node/register');
require('@babel/register')({
  extensions: ['.ts'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
});

// Import the rest of our application.
require('./server/server');
