const config = {
  CLIENT_ID: process.env.CLIENT_ID as string,
  CLIENT_SECRET: process.env.CLIENT_SECRET as string,
  OAUTH_URL: process.env.OAUTH_URL as string,
  BASE_URL: process.env.BASE_URL as string,
  SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD as string,
  SECRET_COOKIE_NAME: process.env.SECRET_COOKIE_NAME as string,
  NODE_ENV: process.env.NODE_ENV as 'dev' | 'production',
  SECRET_OAUTH_STATE_COOKIE_PASSWORD: process.env
    .SECRET_OAUTH_STATE_COOKIE_PASSWORD as string,
  SECRET_OAUTH_STATE_COOKIE_NAME: process.env
    .SECRET_OAUTH_STATE_COOKIE_NAME as string,
  GRANT_TYPE: process.env.GRANT_TYPE as 'password' | 'authorization_code',
  SERVER_URL: process.env.SERVER_URL as string,
};
export default config;
