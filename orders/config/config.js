module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PSWD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    password:  process.env.DEV_DB_PWD,
    dialect: "postgres"
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PSWD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    password:  process.env.TEST_DB_PWD,
    dialect: "postgres"
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PSWD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    password:  process.env.PROD_DB_PWD,
    dialect: "postgres"
  }
}
