import { Logo } from '@/public/sign-inup/logo';
import { Box } from '..';

export const Navbar = () => {
  return (
    <Box
      className="flex-col w-screen py-4 pl-16"
      style={{ backgroundColor: 'rgb(18,19,46)' }}
    >
      <Logo />
    </Box>
  );
};
