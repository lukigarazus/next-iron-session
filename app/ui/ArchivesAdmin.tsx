'use client';

import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { ArchivesAdminResponse } from '../lib/apiUtils';
import { useMemo } from 'react';

export default function ArchivesAdmin() {
  const { data: archivesAdmin, isLoading } = useSWR<
    AxiosResponse<ArchivesAdminResponse> | 'error'
  >('/api/archivesAdmin', axios.get, {
    fallbackData: 'error',
  });

  const archivesAdminState = useMemo(() => {
    if (isLoading) return { kind: 'loading' };
    if (archivesAdmin === 'error') return { kind: 'error' };
    if (!archivesAdmin) return { kind: 'loading' };
    return { kind: 'success', data: archivesAdmin.data };
  }, [archivesAdmin, isLoading]);

  return (
    <div className="flex flex-col border-solid border-black">
      {archivesAdminState.kind === 'loading' && 'Loading...'}
      {archivesAdminState.kind === 'error' && 'Error'}
      {archivesAdminState.kind === 'success' &&
        (archivesAdminState.data?.length === 0 ? (
          'No archives'
        ) : (
          <div>
            {archivesAdminState.data?.map((archive) => (
              <div key={archive.id}>{archive.name}</div>
            ))}
          </div>
        ))}
    </div>
  );
}
