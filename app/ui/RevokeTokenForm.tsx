export default function RevokeTokenForm() {
  return (
    <form action="/api/revokeToken" method="POST">
      <button type="submit">Revoke token</button>
    </form>
  );
}
