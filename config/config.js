require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    //For Heroku, uncomment this:
    //dialectOptions: {
    //  ssl: {
    //    require: true,
    //    rejectUnauthorized: false,
    //  },
    //  keepAlive: true,
    //},
    //ssl: true
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
};
