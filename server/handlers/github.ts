import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction, Router } from 'express';
import request from 'request';
import { name, version } from './../../package.json';
import fs from 'fs';
import fetch from 'node-fetch';
import { IAuthor } from 'model/contributors.js';

const router: Router = Router();

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
  function readContributorFile(): Promise<IAuthor[]> {
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

  const getDetails = async login => {
    const response = await fetch(`${apiBaseUrl}/users/${login}`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': `${name}/${version}`,
      },
    });
    const data = await response.json();
    return data as IAuthor;
  };

  let promises = [];

  let gitCodeShareContributors = await readContributorFile();
  gitCodeShareContributors.forEach(i => {
    promises.push(getDetails(i.login));
  });

  Promise.all(promises)
    .then(values => {
      return res.status(200).json(values);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

export default router;
