'use client';

import useSession from './useSession';

export default function ClientSideComponentOnlyForLoggedInPeople() {
  const session = useSession();

  if (session.isLoading) return <div>Loading...</div>;

  if (!session.session.isLoggedIn) return <div>Forbidden</div>;

  return (
    <div>
      Client side component, very secret data {Math.random()}, check me in
      multiple tabs!
    </div>
  );
}
