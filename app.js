/* eslint-disable import/first */
import dotenv from 'dotenv';
// eslint-disable-next-line no-use-before-define
dotenv.config();

import { resolve } from 'path';
import './src/database';

import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

// const routes = require('./routes');
const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(morgan('tiny'));
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/usuarios', usuarioRoutes);
    this.app.use('/login', tokenRoutes);
  }
}

export default new App().app;
