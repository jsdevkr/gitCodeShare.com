import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction, Router } from 'express';
import request from 'request';
import { name, version } from './../../package.json';

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

router.get('/contributors', (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `${apiBaseUrl}/repos/kosslab-kr/gitCodeShare.com/stats/contributors`,
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

router.get('/users/:user_id', (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `${apiBaseUrl}/users/${req.params.user_id}`,
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

export default router;
