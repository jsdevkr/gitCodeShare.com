import 'isomorphic-unfetch';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import next from 'next';
import proxy from 'http-proxy-middleware';

const port = parseInt(process.env.FRONT_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const proxyContext = process.env.BACKEND_PROXY_CONTEXT || '/api';

const app = next({ dev });
const handle = app.getRequestHandler();

process.on('SIGINT', () => process.exit());

if (!dev) {
  const LOGS_ID = `${process.env.LOGS_SECRET_PREFIX}:${process.env.NOW_URL}`;
  require('now-logs')(LOGS_ID);
}

app.prepare().then(() => {
  const server = express();

  if (dev) {
    server.use(morgan('tiny'));
  }

  server.use(
    `${proxyContext}`,
    proxy({
      target: `http://localhost:${process.env.BACKEND_PORT || 3030}`,
      onError: (err, req, res) => {
        if (!res.headersSent) {
          if (typeof res.writeHead === 'function') {
            res.writeHead(500, { 'content-type': 'application/json' });
          }
        }
        const json = { error: 'proxy_error', reason: err.message };
        res.end(JSON.stringify(json));
      },
    }),
  );

  const filePath = path.join(__dirname, '.next', 'service-worker.js');
  server.use(
    `${proxyContext}`,
    proxy({ target: `http://localhost:${parseInt(process.env.BACKEND_PORT, 10) || 3030}` }),
  );
  server.get('/service-worker.js', (req, res) => app.serveStatic(req, res, filePath));

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, '0.0.0.0', err => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line
    console.log(`> Ready on http://localhost:${port}`);
  });
});
