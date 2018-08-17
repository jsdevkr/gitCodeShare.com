import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import next from 'next';
import puppeteer from 'puppeteer';

import ImageHandler from './handlers/image';
import unsplashHandler from './handlers/unsplash';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

process.on('SIGINT', () => process.exit());

if (!dev) {
  const LOGS_ID = `${process.env.LOGS_SECRET_PREFIX}:${process.env.NOW_URL}`;
  require('now-logs')(LOGS_ID);
}

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
      args: [
        '--no-sandbox',
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
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

    // api endpoints
    server.post(
      '/image',
      bodyParser.json({ limit: '5mb' }),
      wrap(imageHandler),
    );
    server.get('/unsplash/random', wrap(unsplashHandler.randomImages));
    server.get(
      '/unsplash/download/:imageId',
      wrap(unsplashHandler.downloadImage),
    );

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
