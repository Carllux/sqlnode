/* eslint-disable import/first */
import dotenv from 'dotenv';
// eslint-disable-next-line no-use-before-define
dotenv.config();

import { resolve } from 'path';
import './src/database';

// import multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import pedidoRoutes from './src/routes/pedidoRoutes';

// Versão um da API
const v1Url = `${process.env.V1_URL}`;
// const routes = require('./routes');
const whiteList = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
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
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(morgan('tiny'));
    this.app.use('/public/', express.static(resolve(__dirname, 'public')));
    this.app.use(express.json());
    // this.app.use(multer().any());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(`${v1Url}/usuarios`, usuarioRoutes);
    this.app.use(`${v1Url}/login`, tokenRoutes);
    this.app.use(`${v1Url}/pedidos`, pedidoRoutes);
  }
}

export default new App().app;
