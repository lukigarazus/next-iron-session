import { WithAPI, getArchivesAdmin } from '@/app/lib/apiUtils';

export const GET = WithAPI(async () => {
  const result = await getArchivesAdmin();
  return Response.json(result.data);
});
