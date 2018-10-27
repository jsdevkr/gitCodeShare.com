import 'isomorphic-unfetch';
import passport from 'passport';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import puppeteer from 'puppeteer';
import morgan from 'morgan';
import uuid from 'uuid/v4';
import path from 'path';
import { useStaticRendering } from 'mobx-react';
import { AuthHandler, GithubHandler, GistHandler, ImageHandler } from './handlers';

useStaticRendering(true);
process.on('SIGINT', () => process.exit());

const dev = process.env.NODE_ENV !== 'production';
const port = dev ? parseInt(process.env.BACKEND_PORT, 10) || 3030 : 3000;
const proxyContext = process.env.BACKEND_PROXY_CONTEXT || '/api';

const MemoryStore = require('memorystore')(session);

if (!dev) {
  const LOGS_ID = `${process.env.LOGS_SECRET_PREFIX}:${process.env.NOW_URL}`;
  require('now-logs')(LOGS_ID);
}

const puppeteerParams = dev
  ? {}
  : {
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
      // args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
    };

puppeteer.launch(puppeteerParams).then(async (browser: any) => {
  // set up
  const server = express();
  const imageHandler = ImageHandler(browser);

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

  server.use(`${proxyContext}/auth`, AuthHandler);
  server.use(`${proxyContext}/github`, GithubHandler);
  server.use(`${proxyContext}/gists`, GistHandler);
  server.use(`${proxyContext}/image`, imageHandler);
  // logout
  server.get(`${proxyContext}/logout`, (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        return next(err);
      }
    });
    req.logout();
    res.redirect('/');
  });

  // production with next
  if (!dev) {
    const next = require('next');
    const app = next({ dev });
    await app.prepare();
    const handle = app.getRequestHandler();

    const filePath = path.join(__dirname, '.next', 'service-worker.js');
    server.get('/service-worker.js', (req, res) => app.serveStatic(req, res, filePath));
    // to next.js
    server.get('*', handle as any);
  } else {
    // redirect to home
    server.get('/', (req, res) => {
      res.redirect(`${req.protocol}://${req.hostname}`);
    });
  }

  // error handler
  server.use((err, req, res, next) => {
    if (!res.headersSent) {
      if (typeof res.writeHead === 'function') {
        res.writeHead(500, { 'content-type': 'application/json' });
      }
    }
    const json = { error: 'api_error', reason: err.message };
    return res.status(500).end(JSON.stringify(json));
  });

  server.listen(port, '0.0.0.0', err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
