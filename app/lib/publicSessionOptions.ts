export type PublicSessionData = {
  username: string;
  isLoggedIn: boolean;
};

export const defaultPublicSession: PublicSessionData = {
  username: '',
  isLoggedIn: false,
};

export const SESSION_API_ROUTE = '/api/session';
