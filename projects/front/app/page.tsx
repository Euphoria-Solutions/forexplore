'use client';
import { Box, Text } from '@/components';
import Navbar from '@/components/landing-page/nav-bar';
import UpdateInfo from '@/components/landing-page/update-info';
import MidScroll from '@/components/landing-page/partner-mid-scroll';
import path from '@/public/background/landing-background.svg';
import WhyItWorks from '@/components/landing-page/why-it-works';
import GetStarted from '@/components/landing-page/get-started';
import Footer from '@/components/landing-page/footer';
import { useContext, useEffect, useRef } from 'react';
import { DataContext } from '@/providers/data-provider';
import { useRouter } from 'next/navigation';

const Page = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useContext(DataContext);
  const router = useRouter();

  const goSignUp = () => router.push('/auth/sign-up');
  const goSignIn = () => router.push('/auth/sign-in');

  useEffect(() => {
    if (data.section === 'home' && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);
  return (
    <Box
      className="h-max bg-black flex-col overflow-x-hidden pb-14"
      ref={ref}
      id="home"
    >
      <Box
        style={{
          backgroundImage: `url(${path.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
        className={`h-screen w-screen justify-center py-11`}
      >
        <Box className="flex-col">
          <Navbar />
          <Box className="flex-col space-y-24">
            <Box className="flex-col space-y-8">
              <Text className="text-white text-5xl">
                Make your<br></br> trading easier<br></br> with
                <span className="font-semibold"> Forexplore</span>
              </Text>
              <Box className="space-x-8">
                <Box
                  onClick={goSignUp}
                  className="w-32 h-12 rounded-2xl bg-white justify-center items-center text-black font-bold text-lg"
                >
                  <Text>Join</Text>
                </Box>
                <Box
                  onClick={goSignIn}
                  className="w-32 h-12 rounded-2xl border-2 bg-black bg-opacity-75 border-white justify-center items-center text-white font-bold text-lg"
                >
                  <Text>Sign in</Text>
                </Box>
              </Box>
            </Box>
            <Box className="space-x-60">
              <UpdateInfo
                progress={100}
                title={'Current version'}
                features={['Trading Journal', 'Analyse']}
              />
              <UpdateInfo
                progress={10}
                title={'Upcoming update'}
                features={['Back testing']}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="space-y-36 flex-col items-center">
        <Box className="flex-col space-y-44 items-center">
          <MidScroll></MidScroll>
          <WhyItWorks></WhyItWorks>
        </Box>
        <Box className="flex-col space-y-16 items-center">
          <GetStarted></GetStarted>
          <Footer></Footer>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
