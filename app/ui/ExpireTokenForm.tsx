export default function ExpireTokenForm() {
  return (
    <form action="/api/expireToken" method="POST">
      <button type="submit">Expire token</button>
    </form>
  );
}
