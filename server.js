// Transpile all code following this line with babel and use 'env' (aka ES6)
require('ts-node/register');
require('@babel/register')({
  extensions: ['.ts'],
  presets: ['@babel/preset-env'],
});

// Import the rest of our application.
require('./server/server');
