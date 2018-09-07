import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import request from 'request';
import { name, version } from './../../package.json';

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
const getStarred = (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `https://api.github.com/gists/starred`,
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
};
const getGists = (req: Request, res: Response, next: NextFunction) => {
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
};
const getGist = (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `https://api.github.com/gists/${req.params.gist_id}`,
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
};
const patchGist = (req: Request, res: Response, next: NextFunction) => {
  request.patch(
    `https://api.github.com/gists/${req.params.gist_id}`,
    {
      json: true,
      body: req.body,
      headers: {
        Authorization: `token ${req.user.accessToken}`,
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
};
const postGist = (req: Request, res: Response, next: NextFunction) => {
  request.post(
    `https://api.github.com/gists`,
    {
      json: true,
      body: req.body,
      headers: {
        Authorization: `token ${req.user.accessToken}`,
        'Content-Type': 'application/json; charset=utf-8',
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
};
const deleteGist = (req: Request, res: Response, next: NextFunction) => {
  request.delete(
    `https://api.github.com/gists/${req.params.gist_id}`,
    {
      json: true,
      headers: {
        Authorization: `token ${req.session.user.accessToken}`,
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
};

const exported = {
  getGists: getGists,
  getGist: getGist,
  getStarred: getStarred,
  patchGist: patchGist,
  postGist: postGist,
  deleteGist: deleteGist,
};

export default exported;
