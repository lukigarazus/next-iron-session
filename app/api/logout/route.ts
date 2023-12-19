import { destroySession } from '@/app/lib/sessionUtils';
import config from '@/app/lib/config';

export async function GET() {
  await destroySession();
  return Response.redirect(config.BASE_URL);
}
