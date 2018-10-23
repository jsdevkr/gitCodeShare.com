import puppeteer from 'puppeteer';
import { SourceType } from '../../model/image';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { cache } from './';

const ARBITRARY_WAIT_TIME = 1000 * 1.5;
const ttl = 60 * 5;
const port = parseInt(process.env.FRONT_PORT, 10) || 3000;

export default function(browser: puppeteer.Browser) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = await browser.newPage();
    const { state, source } = req.query;

    if (!state) {
      res.status(400).send();
    }

    try {
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
          await delay(ARBITRARY_WAIT_TIME);

          async function screenshotDOMElement(selector) {
            if (!selector) {
              throw Error('Please provide a selector');
            }

            const rect = await page.evaluate(selector => {
              const element = document.querySelector(selector);
              if (!element) {
                return null;
              }

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
          }

          return await screenshotDOMElement('div.CodeMirror');
        },
        { ttl },
      );

      await page.close();

      res.set('Content-Type', 'image/png');
      res.write(buffer, 'binary');
      res.end(null, 'binary');
    } catch (e) {
      console.error('error', e);
      res.status(500).send();
    } finally {
      await page.close();
    }
  };
}

// private
function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
