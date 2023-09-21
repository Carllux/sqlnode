import dotenv from 'dotenv';
dotenv.config()

const dbConfig = {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    options: {
      encrypt: false,
      enableArithAbort: false,
      timezone: 'America/Sao_Paulo',
    },
  },
  timezone: 'America/Sao_Paulo',
};

export default dbConfig;