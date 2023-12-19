import '@/app/ui/global.css';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col p-6">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
