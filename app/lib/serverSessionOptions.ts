import { SessionOptions } from 'iron-session';
import config from './config';

export const sessionOptions: SessionOptions = {
  password: config.SECRET_COOKIE_PASSWORD as string,
  cookieName: config.SECRET_COOKIE_NAME as string,
  cookieOptions: {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  },
};

export type ServerSessionData = {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
};

export const defaultServerSession: ServerSessionData = {
  access_token: undefined,
  refresh_token: undefined,
  token_type: undefined,
};
