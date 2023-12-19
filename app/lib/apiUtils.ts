import axios, { AxiosError } from 'axios';
import config from './config';
import { getSession, saveSession } from './sessionUtils';
import { refreshAccessToken } from './oauthUtils';

/*
 * This function works only on the server
 */
export const apiClient = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const WithAPI =
  <T extends Array<any>>(endpoint: (...args: T) => Promise<Response>) =>
  async (...args: T) => {
    try {
      const result = await endpoint(...args);
      return result;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          const session = await getSession();
          if (session.refresh_token) {
            const response = await refreshAccessToken({
              refreshToken: session.refresh_token,
            });

            await saveSession(response);

            // Re-run the original request that was intercepted
            const result = await endpoint(...args);
            return result;
          }
        }
        return new Response(JSON.stringify(error.response.data), {
          status: error.response.status,
          statusText: error.response.statusText,
        });
      }
      throw error;
    }
  };

export type ArchivesAdminResponse = {
  id: string;
  status_label: string;
  status_name: string;
  share_status: string;
  owner: string;
  items_count: string;
  archive_size: string;
  trustee_archive_req: {
    status_label: string;
    status_name: string;
    user: string;
    email: string;
  }[];
  recipient_archive_req: {
    status_label: string;
    status_name: string;
    user: string;
    email: string;
  }[];
  created: string;
  modified: string;
  name: string;
  thumbnail: string;
  deadline: string;
  size: number;
  status: number;
  confirmed_date: string;
  release_date: string;
  delete_date: string;
  next: string;
  counter: number;
}[];

export const getArchivesAdmin = () =>
  apiClient.get<ArchivesAdminResponse>('/archives-admin/');
