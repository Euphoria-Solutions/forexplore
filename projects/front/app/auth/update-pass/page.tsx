'use client';

import { Box, Text } from '@/components';
import React, { useContext, useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import HideButton from '@/components/sign-inup/hide-button';
import { AuthContext } from '@/providers';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD_MUTATION } from '@/graphql';
import { checkPasswordStrength, notifUpdater } from '@/helper';
import { toast } from 'react-toastify';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const UpdatePass = () => {
  const { authDetails } = useContext(AuthContext);
  const router = useRouter();
  const [UpdatePass] = useMutation(UPDATE_PASSWORD_MUTATION);
  const [passwordDetails, setPasswordDetails] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: '',
    color: '',
  });
  const [loading, setLoading] = useState(false);

  const updatePass = async () => {
    if (passwordDetails.password != passwordDetails.confirmPassword) {
      toast.error('Confirm password is incorrect');
      return;
    }

    if (passwordStrength.strength == 'Weak') {
      toast.error('Password is too weak');
    }
    setLoading(true);

    const id = toast.loading('Please Wait ...');
    localStorage.setItem('token', authDetails.otpToken || '');
    try {
      await UpdatePass({
        variables: {
          password: passwordDetails.password,
          email: authDetails.email,
        },
      });

      await notifUpdater(id, 'Password Changed Successfully', 'success');
      router.push('/auth/sign-in');
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authDetails.otpToken == '') {
      router.push('/auth/forgot-pass');
    }
  }, [authDetails]);

  useEffect(() => {
    if (passwordDetails.password != '') {
      setPasswordStrength(checkPasswordStrength(passwordDetails.password));
    } else {
      setPasswordStrength({ strength: '', color: '' });
    }
  }, [passwordDetails.password]);

  return (
    <Box className={poppins.className}>
      <Box
        className="h-full w-screen flex flex-row items-start"
        style={{ backgroundColor: 'rgb(18,19,46)' }}
      >
        <Box className="bg-white w-[50%] h-full"></Box>
        <Box
          className="flex-1 justify-center items-center flex-col pt-32"
          style={{ maxWidth: 'calc(50% + 10px)' }}
        >
          <Box className="space-y-8 flex-col w-96">
            <Box className="space-y-6 flex-col text-right">
              <Box className="flex-col justify-start items-start space-y-4 mb-4">
                <Text className="text-white font-bold text-4xl">
                  Set Password
                </Text>
                <Text className="text-white text-sm text-start">
                  Your previous password has been reseted. Please set a new
                  password for your account.
                </Text>
              </Box>
              <Box className="flex-col space-y-6 items-center">
                <Box className="flex-col items-start space-y-2">
                  <HideButton
                    value={passwordDetails.password}
                    onChange={e =>
                      setPasswordDetails({
                        ...passwordDetails,
                        password: e.target.value,
                      })
                    }
                    placeholder="New Password"
                  />
                  {passwordStrength.strength != '' && (
                    <Text className={`${passwordStrength.color} text-sm `}>
                      Status: {passwordStrength.strength}
                    </Text>
                  )}
                </Box>
                <HideButton
                  value={passwordDetails.confirmPassword}
                  onChange={e =>
                    setPasswordDetails({
                      ...passwordDetails,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Repeat New Password"
                ></HideButton>
              </Box>
            </Box>
            <Box
              blocked={loading}
              onClick={updatePass}
              className={`bg-[#4461F2] ${loading && 'opacity-50'} w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base`}
            >
              Set password
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdatePass;
