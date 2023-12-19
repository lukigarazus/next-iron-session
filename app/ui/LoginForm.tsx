import config from '../lib/config';

export default function LoginForm() {
  return (
    <form action="/api/login" method="POST">
      {config.GRANT_TYPE === 'password' && (
        <>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
        </>
      )}
      <button type="submit">Login</button>
    </form>
  );
}
