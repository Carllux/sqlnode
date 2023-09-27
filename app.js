/* eslint-disable import/first */
import dotenv from 'dotenv';
// eslint-disable-next-line no-use-before-define
dotenv.config();

import { resolve } from 'path';
import './src/database/index.js';

// import multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import AppError from './src/utils/appError.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import tokenRoutes from './src/routes/tokenRoutes.js';
import pedidoRoutes from './src/routes/pedidoRoutes.js';
import path from 'path';
import url from 'url';
import globalErrorHandler from './src/controllers/errorController.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
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
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    // analisar 
    this.app.use('/public/', express.static(resolve(__dirname, 'public')));
    this.app.use(express.json());
    // this.app.use(multer().any());
    this.app.use(express.urlencoded({ extended: true }));
    // Para tratamento de rotas não planejadas
  }

  routes() {
    this.app.use(`${v1Url}/usuarios`, usuarioRoutes);
    this.app.use(`${v1Url}/login`, tokenRoutes);
    this.app.use(`${v1Url}/pedidos`, pedidoRoutes);
    this.app.all('*', (req, res, next) => {
      next(new AppError(`Não foi possível encontrar a seguinte rota ${req.originalUrl} neste servidor.`, 404))
    })

    this.app.use(globalErrorHandler)
  }
}

export default new App().app;
