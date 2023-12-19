import { SessionOptions } from 'iron-session';
import config from './config';

export const oauthStateSessionOptions: SessionOptions = {
  password: config.SECRET_OAUTH_STATE_COOKIE_PASSWORD,
  cookieName: config.SECRET_OAUTH_STATE_COOKIE_NAME,
  cookieOptions: {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  },
};

export type OauthStateSessionData = {
  state?: string;
};

export const defaultOauthStateSession: OauthStateSessionData = {
  state: undefined,
};
