'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
require('dotenv').config()
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || '8080',
  cors: {
    origin: process.env.NODE_ENV !== 'production'
      ? '*'
      : process.env.CORS_ORIGIN || '*'
  },
  dbUser: process.env.DB_USER || 'db_hellobuild',
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME || 'hellobuild_db',
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  urlClient: process.env.URL_CLIENT || 'http://localhost:3001'
}
exports.default = config
