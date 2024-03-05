import { Poppins } from 'next/font/google';
import '../styles/globals.css';
import '../styles/output.css';
import { MainLayout } from '@/components';
import { UserProvider } from '@/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <UserProvider>
          <MainLayout>{children}</MainLayout>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
