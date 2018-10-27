import { Request, Response, NextFunction, Router } from 'express';
import request from 'request';
import { name, version } from '../package.json';
import { isAuthenticated } from './passport';
import { cache } from './';

const router: Router = Router();

const headers: { Authorization?: string } = {};
const PERSONAL_ACCESS_TOKEN: string = process.env.PERSONAL_ACCESS_TOKEN;
if (PERSONAL_ACCESS_TOKEN) {
  headers.Authorization = `token ${PERSONAL_ACCESS_TOKEN}`;
}

const putStar = (gistId: string): void => {
  request.put(
    `https://api.github.com/gists/${gistId}/star`,
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
      }
    },
  );
};
router.get('/starred', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = await cache.wrap('gist/starred', async () => {
      const result = await fetch(`https://api.github.com/gists/starred`, {
        method: 'GET',
        headers: {
          ...headers,
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': `${name}/${version}`,
        },
      });
      return result.json();
    });
    return res.status(200).json(body);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `https://api.github.com/users/${req.user.username}/gists`,
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

router.get('/:gist_id', (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `https://api.github.com/gists/${req.params.gist_id}`,
    {
      json: true,
      headers: {
        ...headers,
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

router.patch('/:gist_id', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  request.patch(
    `https://api.github.com/gists/${req.params.gist_id}`,
    {
      json: true,
      body: req.body,
      headers: {
        Authorization: `token ${req.user.accessToken}`,
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

router.post('/', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  request.post(
    `https://api.github.com/gists`,
    {
      json: true,
      body: req.body,
      headers: {
        Authorization: `token ${req.user.accessToken}`,
        'User-Agent': `${name}/${version}`,
      },
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      putStar(body.id);
      return res.status(200).json(body);
    },
  );
});

router.delete('/:gist_id', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  request.delete(
    `https://api.github.com/gists/${req.params.gist_id}`,
    {
      json: true,
      headers: {
        Authorization: `token ${req.session.user.accessToken}`,
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
