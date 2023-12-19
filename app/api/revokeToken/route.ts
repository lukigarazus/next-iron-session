import config from '@/app/lib/config';
import { getSession, saveSession } from '@/app/lib/sessionUtils';

export const POST = async () => {
  const session = await getSession();

  await saveSession({
    refresh_token: session.refresh_token as string,
    token_type: session.token_type as string,
    expires_in: 0,
    access_token: 'invalid_token',
  });

  return Response.redirect(config.BASE_URL);
};
