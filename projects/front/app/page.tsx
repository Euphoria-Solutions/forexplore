import { Box, Text } from '@/components';
import Navbar from '@/components/landing-page/nav-bar';
import UpdateInfo from '@/components/landing-page/update-info';
import MidScroll from '@/components/landing-page/partner-mid-scroll';
import path from '@/public/background/landing-background.svg';
import WhyItWorks from '@/components/landing-page/why-it-works';
import GetStarted from '@/components/landing-page/get-started';
import Footer from '@/components/landing-page/footer';
import Link from 'next/link';

const Page = () => {
  return (
    <Box className="h-[624vh] bg-black flex-col w-screen">
      <Box
        style={{
          backgroundImage: `url(${path.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
        className={`h-screen w-screen justify-center py-[44px]`}
      >
        <Box className="flex-col">
          <Navbar></Navbar>
          <Box className="flex flex-col space-y-[88px]">
            <Box className="flex-col space-y-[32px]">
              <Text className="text-white text-4xl">
                Make your<br></br> trading easier<br></br> with
                <span className="font-bold"> Forexplore</span>
              </Text>
              <Box className="flex-row space-x-[32px]">
                <Box className="w-[120px] h-[48px] rounded-2xl bg-white justify-center items-center text-black font-bold text-lg">
                  <Link href={'/sign-up'}>Join</Link>
                </Box>
                <Box className="w-[120px] h-[48px] rounded-2xl border-2 bg-black bg-opacity-75 border-white justify-center items-center text-white font-bold text-lg">
                  <Link href={'/sign-in'}>Sign in</Link>
                </Box>
              </Box>
            </Box>
            <Box className="space-x-[247px]">
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
      <Box className="space-y-[146px] flex-col items-center">
        <Box className="flex-col space-y-[181px] items-center">
          <MidScroll></MidScroll>
          <WhyItWorks></WhyItWorks>
        </Box>
        <Box className="flex-col space-y-[62px]">
          <GetStarted></GetStarted>
          <Footer></Footer>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
