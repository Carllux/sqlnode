import express from 'express';
import dotenv from 'dotenv';
import './src/database';

import homeRoutes from './src/routes/homeRoutes';

dotenv.config();

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
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app;
