import { nanoid } from 'nanoid';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import {
  oauthStateSessionOptions,
  OauthStateSessionData,
} from '@/app/lib/oauthStateSessionOptions';
import config from '@/app/lib/config';
import { saveSession } from '@/app/lib/sessionUtils';
import { acquireAccessTokenPasswordGrantType } from '@/app/lib/oauthUtils';

export async function POST(request: NextRequest) {
  if (config.GRANT_TYPE === 'authorization_code') {
    const state = nanoid(15);

    const stateSession = await getIronSession<OauthStateSessionData>(
      cookies(),
      oauthStateSessionOptions,
    );

    stateSession.state = state;

    await stateSession.save();

    const params = new URLSearchParams({
      redirect_uri: `${config.BASE_URL}/api/oauthCallback`,
      response_type: 'code',
      client_id: config.CLIENT_ID,
      state,
    });

    const oauthUrl = `${config.OAUTH_URL}/authorize?${params}`;

    return Response.redirect(oauthUrl);
  } else {
    const formData = await request.formData();

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password)
      return new Response('Missing username or password', { status: 400 });

    const accessTokenResponse = await acquireAccessTokenPasswordGrantType({
      username,
      password,
    });

    await saveSession(accessTokenResponse);

    return Response.redirect(config.BASE_URL);
  }
}
