import { Box, Text } from '@/components';

const Page = () => {
  return (
    <Box>
      <Text>
        FRONTEND ENVIRONMENT:{' '}
        {process.env.CURRENT_ENV == 'PROD' ? 'PROD' : 'DEV'}
      </Text>
    </Box>
  );
};

export default Page;
