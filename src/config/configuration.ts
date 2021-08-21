import dbConfig from './database.config';
import cacheConfig from './cache.config';

export default () => ({
  port: process.env.PORT,
  database: dbConfig,
  cache: cacheConfig,
  email: process.env.EMAIL,
  email_password: process.env.EMAIL_PWD,
});
