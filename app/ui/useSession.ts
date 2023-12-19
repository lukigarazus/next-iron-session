import useSWR from 'swr';

import {
  SESSION_API_ROUTE,
  PublicSessionData,
  defaultPublicSession,
} from '@/app/lib/publicSessionOptions';

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ...init,
  }).then((res) => res.json());
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(
    SESSION_API_ROUTE,
    fetchJson<PublicSessionData>,
    {
      fallbackData: defaultPublicSession,
    },
  );

  return { session, isLoading };
}
