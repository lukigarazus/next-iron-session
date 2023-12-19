import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

import { PublicSessionData } from './publicSessionOptions';
import { ServerSessionData, sessionOptions } from './serverSessionOptions';
import {
  OauthStateSessionData,
  oauthStateSessionOptions,
} from './oauthStateSessionOptions';

function serverSessionToPublicSession(
  serverSession: ServerSessionData,
): PublicSessionData {
  return {
    isLoggedIn: serverSession.access_token !== undefined,
    username: 'Dunno',
  };
}

/**
 * This function works only on the server
 */
export async function getSession() {
  const session = await getIronSession<ServerSessionData>(
    cookies(),
    sessionOptions,
  );

  return session;
}

/**
 * This function works only on the server
 */
export async function getPublicSession() {
  const session = await getSession();
  return serverSessionToPublicSession(session);
}

/**
 * This function works only on the server
 */
export async function destroySession() {
  const session = await getSession();
  session.destroy();
}

/**
 * This function works only on the server
 */
export async function saveSession({
  expires_in,
  access_token,
  refresh_token,
  token_type,
}: {
  expires_in: number;
  access_token: string;
  refresh_token: string;
  token_type: string;
}) {
  const session = await getIronSession<ServerSessionData>(cookies(), {
    ...sessionOptions,
    cookieOptions: {
      ...(sessionOptions.cookieOptions || {}),
      ttl: expires_in,
    },
  });

  session.access_token = access_token;
  session.refresh_token = refresh_token;
  session.token_type = token_type;

  await session.save();
}

/**
 * This function works only on the server
 */
export async function checkStateParam(searchParams: URLSearchParams) {
  const stateSession = await getIronSession<OauthStateSessionData>(
    cookies(),
    oauthStateSessionOptions,
  );

  const state = stateSession.state;

  stateSession.destroy();

  if (!state) return false;

  const stateParam = searchParams.get('state');

  if (!stateParam) return false;

  if (state !== stateParam) return false;

  return true;
}
