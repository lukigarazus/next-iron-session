import axios from 'axios';
import config from '@/app/lib/config';

type AccessTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
};

export const acquireAccessTokenPasswordGrantType = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const params = new URLSearchParams({
    grant_type: 'password',
    username,
    password,
  });

  const response = await axios.post<AccessTokenResponse>(
    `${config.OAUTH_URL}/token/`,
    params,
    {
      headers: {
        Authorization:
          'Basic ' + btoa(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`),
      },
    },
  );

  return response.data;
};

export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
  });

  const response = await axios.post<AccessTokenResponse>(
    `${config.OAUTH_URL}/token/`,
    params,
    {},
  );

  return response.data;
};
