import puppeteer from 'puppeteer';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { cache } from './';

const ttl = 60 * 5;
const PORT = parseInt(process.env.FRONT_PORT, 10) || 3000;

export default function(browser: puppeteer.Browser) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { state, id } = req.query;
    if (!state && !id) {
      res.status(400).send();
    }

    try {
      const buffer = await cache.wrap(
        state
          ? `image/code/${crypto
              .createHash('sha1')
              .update(state)
              .digest('hex')}`
          : `image/id/${id}`,
        async () => {
          let url: string = `http://localhost:${PORT}`;
          switch (!!state) {
            case true:
              url += `/editor?state=${state}`;
              break;
            case false:
              url += `/?${id}`;
              break;
            default:
              res.status(400).send();
              break;
          }
          console.log(url);

          const page = await browser.newPage();
          try {
            await page.goto(url);

            const selector = 'div.CodeMirror';
            await page.waitFor(selector);

            const rect = await page.evaluate(_selector => {
              const element = document.querySelector(_selector);

              const { width: beforeWidth } = element.getBoundingClientRect();
              const adjustHeight = (beforeWidth / 3) * 2;
              element.style.height = `${adjustHeight}px`;

              const { x, y, width, height } = element.getBoundingClientRect();
              return { left: x, top: y, width, height, id: element.id };
            }, selector);

            return await page.screenshot({
              clip: {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
              },
            });
          } catch (error) {
            throw error;
          } finally {
            page.close();
          }
        },
        { ttl },
      );

      res.set('Content-Type', 'image/png');
      res.write(buffer, 'binary');
      res.end(null, 'binary');
    } catch (e) {
      console.log('error', e);
      res.status(500).send();
    }
  };
}
