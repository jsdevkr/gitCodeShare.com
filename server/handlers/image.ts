import puppeteer from 'puppeteer';
import { SourceType } from '../../model/image';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { cache } from './';

const ttl = 60 * 5;
const port = parseInt(process.env.FRONT_PORT, 10) || 3000;

export default function(browser: puppeteer.Browser) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { state, source } = req.query;
    if (!state) {
      res.status(400).send();
    }

    let page: puppeteer.Page;
    try {
      page = await browser.newPage();
      const buffer = await cache.wrap(
        `image/${source}/${
          source === SourceType.CODE
            ? crypto
                .createHash('sha1')
                .update(state)
                .digest('hex')
            : state
        }`,
        async () => {
          let url: string = `${req.protocol}://${req.hostname}:${port}`;
          switch (source) {
            case SourceType.CODE:
              url += `/?state=${state}`;
              break;
            case SourceType.GIST:
              url += `/?${state}`;
              break;
            default:
              res.status(400).send();
              break;
          }

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
        },
        { ttl },
      );

      res.set('Content-Type', 'image/png');
      res.write(buffer, 'binary');
      res.end(null, 'binary');
      page.close();
    } catch (e) {
      console.log('error', e);
      res.status(500).send();
      if (page) {
        page.close();
      }
    }
  };
}
