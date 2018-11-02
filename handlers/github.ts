import { Request, Response, NextFunction, Router } from 'express';
import request from 'request';
import { name, version } from '../package.json';
import fs from 'fs';
import { IContributor } from '../model/contributors';
import { cache } from './';
import axios from 'axios';

const router: Router = Router();
const ttl = 60 * 60;

const headers: { Authorization?: string } = {};
const PERSONAL_ACCESS_TOKEN: string = process.env.PERSONAL_ACCESS_TOKEN;
if (PERSONAL_ACCESS_TOKEN) {
  headers.Authorization = `token ${PERSONAL_ACCESS_TOKEN}`;
}

const apiBaseUrl = 'https://api.github.com';

router.get('/repos', (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `${apiBaseUrl}/repos/kosslab-kr/gitCodeShare.com`,
    {
      json: true,
      headers: {
        ...headers,
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': `${name}/${version}`,
      },
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      return res.status(200).json(body);
    },
  );
});

router.get('/contributors', async (req: Request, res: Response, next: NextFunction) => {
  const body = await cache.wrap(
    'github/contributors',
    async () => {
      const getDetails = async login => {
        const { data } = await axios(`${apiBaseUrl}/users/${login}`, {
          headers: {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': `${name}/${version}`,
          },
        });
        return data as IContributor;
      };

      let promises = [];
      let contributors = await readContributorFile();
      contributors.forEach(i => {
        promises.push(
          getDetails(i.login)
            .then(data => data)
            .catch(err => {
              console.log(err);
              return err;
            }),
        );
      });

      return await Promise.all(promises).then(values => {
        values = values.filter(value => !(value instanceof Error));
        return values as IContributor[];
      });
    },
    { ttl },
  );

  return res.status(200).json(body);

  function readContributorFile(): Promise<IContributor[]> {
    return new Promise(resolve => {
      fs.readFile('.all-contributorsrc', (err, data) => {
        if (err) {
          throw err;
        }

        const contributors = JSON.parse(data as any).contributors;
        resolve(contributors);
      });
    });
  }
});

export default router;
