import { NextRequest } from 'next/server';
import { checkStateParam, saveSession } from '@/app/lib/sessionUtils';
import config from '@/app/lib/config';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');
  if (!code) return Response.error();

  const stateOk = await checkStateParam(searchParams);
  if (!stateOk) return Response.error();

  const formData = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code as string,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
  });

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await fetch(`${config.OAUTH_URL}/token`, options);
    const json = await response.json();
    const { access_token, refresh_token, token_type, expires_in } = json;

    await saveSession({
      expires_in,
      access_token,
      refresh_token,
      token_type,
    });

    return Response.redirect(config.BASE_URL);
  } catch (err) {
    console.log('error fetching token');
    throw err;
  }
};
