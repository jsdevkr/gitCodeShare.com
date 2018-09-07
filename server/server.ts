import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import next from 'next';
import puppeteer from 'puppeteer';
import morgan from 'morgan';

import ImageHandler from './handlers/image';
import unsplashHandler from './handlers/unsplash';
import gistHandler from './handlers/gist';

import redis from 'redis';
import connectRedis from 'connect-redis';
import uuid from 'uuid/v4';
import * as passportConfig from './handlers/passport';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const RedisStore = connectRedis(session);
const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
};
const client = redis.createClient(redisConfig);

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

app
  .prepare()
  .then(puppeteer.launch.bind(puppeteer, puppeteerParams))
  .then((browser: any) => {
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
        store: new RedisStore({
          client: client,
          logErrors: true,
        }),
        secret: process.env.SESSION_SECRET || 'gitCodeShare',
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
    server.use('/_next', (req, res, _next) => {
      passport.session()(req, res, _next);
    });
    server.use('/static', (req, res, _next) => {
      passport.session()(req, res, _next);
    });

    // api endpoints
    server.post('/image', bodyParser.json({ limit: '5mb' }), wrap(imageHandler));
    server.get('/unsplash/random', wrap(unsplashHandler.randomImages));
    server.get('/unsplash/download/:imageId', wrap(unsplashHandler.downloadImage));

    server.get('/auth/github', passport.authenticate('github'));
    server.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
      req.login(req.user, err => {
        if (err) {
          console.log(err);
          return next(err);
        }
        req.session.save(() => {
          res.redirect('/');
        });
      });
    });

    server.get('/logout', (req, res, _next) => {
      req.session.destroy(err => {
        if (err) {
          console.log(err);
          return _next(err);
        }
      });
      req.logout();
      res.redirect('/');
    });

    server.get('/gists/starred', gistHandler.getStarred);

    server.get('/gists', passportConfig.isAuthenticated, gistHandler.getGists);
    server.get('/gists/:gist_id', passportConfig.isAuthenticated, gistHandler.getGist);
    server.patch('/gists/:gist_id', passportConfig.isAuthenticated, gistHandler.patchGist);
    server.post('/gists', passportConfig.isAuthenticated, gistHandler.postGist);
    server.delete('/gists/:gist_id', passportConfig.isAuthenticated, gistHandler.deleteGist);

    // if root, render webpage from next
    server.get('/*', (req, res) => app.render(req, res, '/', req.query));

    // otherwise, try and get gist
    server.get('*', handle as any);

    server.listen(port, '0.0.0.0', err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
