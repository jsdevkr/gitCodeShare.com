import puppeteer from 'puppeteer';
import { Request, Response, NextFunction } from 'express';

export default function(browser: puppeteer.Browser) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = await browser.newPage();
    const { state } = req.body;

    if (!state) {
      res.status(400).send();
    }

    try {
      await page.goto(`http://localhost:3000/?state=${state}`);

      async function screenshot(selector) {
        if (!selector) {
          throw Error('Please provide a selector');
        }

        const rect = await page.evaluate(selector => {
          const element = document.querySelector(selector);
          if (!element) {
            return null;
          }
          const { x, y, width, height } = element.getBoundingClientRect();
          return { left: x, top: y, width, height, id: element.id };
        }, selector);

        return await page.screenshot({
          encoding: 'base64',
          omitBackground: true,
          clip: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          },
        });
      }

      const data = await screenshot('div.react-codemirror2');

      res.writeHead(200, {
        'content-length': data.length,
        'content-type': 'image/png',
        'Content-Disposition': 'attachment; filename=code.png',
      });

      res.end(new Buffer(data, 'base64'));
    } catch (e) {
      console.error(e);
      res.status(500).send();
    } finally {
      await page.close();
    }
  };
}
