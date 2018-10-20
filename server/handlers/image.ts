import puppeteer from 'puppeteer';
import { Request, Response, NextFunction } from 'express';

export default function(browser: puppeteer.Browser) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = await browser.newPage();

    const { state } = req.query;
    if (!state) {
      res.status(400).send();
    }

    try {
      await page.goto(`http://localhost:3000/?state=${state}`);

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
      const buffer = await screenshotDOMElement('div.CodeMirror');
      await page.close();

      res.set('Content-Type', 'image/png');
      res.write(buffer, 'binary');
      res.end(null, 'binary');
    } catch (e) {
      console.error('error ! ', e);
      res.status(500).send();
    } finally {
      await page.close();
    }
  };
}
