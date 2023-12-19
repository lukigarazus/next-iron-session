import Link from 'next/link';
import { getPublicSession } from './lib/sessionUtils';
import ClientSideComponentOnlyForLoggedInPeople from './ui/ClientSideComponentOnlyForLoggedInPeople';
import ArchivesAdmin from './ui/ArchivesAdmin';
import RevokeTokenForm from './ui/RevokeTokenForm';
import ExpireTokenForm from './ui/ExpireTokenForm';

const Page = async () => {
  const publicSession = await getPublicSession();

  if (!publicSession.isLoggedIn)
    return (
      <div className="flex flex-col">
        <span>Not logged in</span>
        <Link href="/login">Go to login</Link>
        <ArchivesAdmin />
      </div>
    );

  return (
    <div className="flex flex-col">
      <span>Home page, only for the logged in people</span>
      <Link href="/logout">Go to logout</Link>
      <RevokeTokenForm />
      <ExpireTokenForm />
      <ClientSideComponentOnlyForLoggedInPeople />
      <ArchivesAdmin />
    </div>
  );
};

export default Page;
