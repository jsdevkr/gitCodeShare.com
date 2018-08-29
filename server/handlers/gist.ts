import { Request, Response, NextFunction } from 'express';
import request from 'request';
import { name, version } from './../../package.json';

const getGists = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user);
  request.get(
    `https://api.github.com/users/${req.user.username}/gists`,
    {
      json: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': `${name}/${version}`,
      },
    },
    (err, response, body) => {
      if (err) {
        return next(err);
      }
      res.send(body);
    },
  );
};
const getGist = (req: Request, res: Response, next: NextFunction) => {
  request.get(
    `https://api.github.com/gists/${req.params.gist_id}`,
    {
      json: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': `${name}/${version}`,
      },
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.send(body);
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
      res.send(body);
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
      res.send(body);
    },
  );
};
const deleteGist = (req: Request, res: Response, next: NextFunction) => {
  request.delete(
    `https://api.github.com/gists/${req.params.gist_id}`,
    {
      json: true,
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
      res.send(body);
    },
  );
};

const exported = {
  getGists: getGists,
  getGist: getGist,
  patchGist: patchGist,
  postGist: postGist,
  deleteGist: deleteGist,
};

export default exported;
