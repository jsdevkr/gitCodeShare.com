import passport from 'passport';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import puppeteer from 'puppeteer';
import morgan from 'morgan';

import ImageHandler from './handlers/image';
import gistRouter from './handlers/gist';
import authRouter from './handlers/auth';

import { CacheProvider } from '../providers';
import uuid from 'uuid/v4';

const MemoryStore = require('memorystore')(session);

const port = parseInt(process.env.BACKEND_PORT, 10) || 3030;
const dev = process.env.NODE_ENV !== 'production';
const proxyContext = process.env.BACKEND_PROXY_CONTEXT || '/api';

process.on('SIGINT', () => process.exit());

function wrap(handler: any) {
  return (req, res) =>
    handler(req, res).catch(err => {
      console.log('ERR:', err);
      res.status(400).end();
    });
}

const puppeteerParams = dev
  ? {}
  : {
      executablePath: '/usr/bin/chromium-browser',
      // TODO args: ['--no-sandbox', '--disable-setuid-sandbox']
      // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
      args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
    };

puppeteer.launch(puppeteerParams).then((browser: any) => {
  // set up
  const server = express();
  const imageHandler = ImageHandler(browser);
  CacheProvider.start(null);

  if (dev) {
    server.use(morgan('tiny'));
  }

  server.use(cookieParser(process.env.COOKIE_SECRET || 'gitCodeShare'));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    session({
      genid: function() {
        return uuid();
      },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      secret: process.env.COOKIE_SECRET || 'gitCodeShare',
      saveUninitialized: false, // don't create session until something stored,
      resave: false, // don't save session if unmodified
      cookie: {
        signed: true,
        maxAge: 1000 * 60 * 60 * 4,
        httpOnly: true,
        secure: false,
      },
    }),
  );

  server.use(passport.initialize());
  server.use(passport.session());
  server.use(`${proxyContext}`, authRouter);
  server.use(`${proxyContext}/gists`, gistRouter);

  // redirect to home
  server.get('/', (req, res) => {
    res.redirect(`${req.protocol}://${req.hostname}:${process.env.FRONT_PORT}`);
  });

  // api endpoints
  server.post(`${proxyContext}/image`, bodyParser.json({ limit: '5mb' }), wrap(imageHandler));

  // error handler
  server.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send();
  });

  server.listen(port, '0.0.0.0', err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
