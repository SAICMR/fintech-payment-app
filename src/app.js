import bodyParser from 'body-parser';
import express from 'express';
import { rootRouter } from './routes';
import { ApplicationError } from './utils';

export function createApp() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(rootRouter);
  app.use(notFoundHandler)
  app.use(errorHandler);
  return app;
}

// 404
function notFoundHandler(req, res, next) {
  return res.status(404).send({ code: 'ERR_ROUTE_NOT_FOUND', message: 'Route' + req.url + ' Not found.' });
}

// 500 - Any server error
function errorHandler(err, req, res, next) {
  if (err instanceof ApplicationError) {
    res.status(err.status).send({ code: err.code, message: err.message });
  } else if (err.detail) {
    res.status(500).send({ code: 'ERR_INTERNAL_SERVER', message: err.detail });
  } else {
    next(err);
  }
}