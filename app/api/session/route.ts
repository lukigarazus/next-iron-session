import { getPublicSession } from '@/app/lib/sessionUtils';

export async function GET() {
  return Response.json(await getPublicSession());
}
