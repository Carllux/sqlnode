/* eslint-disable import/first */
import dotenv from 'dotenv';
// eslint-disable-next-line no-use-before-define
dotenv.config();

import './src/database';

import morgan from 'morgan';
import express from 'express';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

// const routes = require('./routes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('tiny'));
  }

  routes() {
    this.app.use('/usuarios', usuarioRoutes);
    this.app.use('/tokens', tokenRoutes);
  }
}

export default new App().app;
