import { useMutation } from '@apollo/client';
import { Box, Input, Text } from '../common';
import { CHANGE_PASSWORD_MUTATION } from '@/graphql';
import { useContext, useEffect, useState } from 'react';
import { checkPasswordStrength, notifUpdater } from '@/helper';
import { toast } from 'react-toastify';
import { AuthContext } from '@/providers';

export const LoginSecurity = () => {
  const [passwordStrength, setPasswordStrength] = useState({
    strength: '',
    color: '',
  });
  const { user } = useContext(AuthContext);

  const [ChangePass] = useMutation(CHANGE_PASSWORD_MUTATION);
  const [details, setDetails] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (details.newPassword != '') {
      setPasswordStrength(checkPasswordStrength(details.newPassword));
    } else {
      setPasswordStrength({ strength: '', color: '' });
    }
  }, [details.newPassword]);

  const updatePass = async () => {
    if (details.newPassword != details.confirmPassword) {
      toast.error('Confirm password is incorrect');
      return;
    }

    if (passwordStrength.strength == 'Weak') {
      toast.error('Password is too weak');
    }
    const id = toast.loading('Loading ...');
    try {
      const { data } = await ChangePass({
        variables: {
          id: user._id,
          oldPassword: details.oldPassword,
          newPassword: details.newPassword,
        },
      });
      if (data?.changePass) {
        await notifUpdater(id, 'Password Changed Successfully', 'success');
        return;
      }
      await notifUpdater(id, 'your password is incorrect', 'error');
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
  };

  return (
    <Box className="h-full w-full">
      <Box className="w-full flex-col space-y-6">
        <Text className="text-xl font-medium">Change Password</Text>
        <Box className="flex-col space-y-2 w-[50%]">
          <Text className="font-medium text-[#4C535F]">Old Password</Text>
          <Input
            value={details.oldPassword}
            onChange={e =>
              setDetails({ ...details, oldPassword: e.target.value })
            }
            className="bg-[#EDF2F6] border border-[#E0E4EC] p-4 rounded-md w-[80%] text-[#4C535F]"
            type="password"
            placeholder="Please enter your old password"
          />
        </Box>
        <Box className="space-x-6">
          <Box className="flex-col space-y-2 w-[50%]">
            <Text className="font-medium text-[#4C535F]">New Password</Text>
            <Box className="flex-col items-start space-y-2">
              <Input
                value={details.newPassword}
                onChange={e =>
                  setDetails({ ...details, newPassword: e.target.value })
                }
                type="password"
                className="bg-[#EDF2F6] border border-[#E0E4EC] p-4 rounded-md w-[80%] text-[#4C535F]"
                placeholder="Please enter your new password"
              />
              {passwordStrength.strength != '' && (
                <Text className={`${passwordStrength.color} text-sm `}>
                  Status: {passwordStrength.strength}
                </Text>
              )}
            </Box>
          </Box>
          <Box className="flex-col space-y-2 w-[50%]">
            <Text className="font-medium text-[#4C535F]">Confirm Password</Text>
            <Input
              value={details.confirmPassword}
              onChange={e =>
                setDetails({ ...details, confirmPassword: e.target.value })
              }
              type="password"
              className="bg-[#EDF2F6] border border-[#E0E4EC] p-4 rounded-md w-[80%] text-[#4C535F]"
              placeholder="Please enter your confirm password"
            />
          </Box>
        </Box>
        <Box
          onClick={updatePass}
          className="w-[15%] h-[46px] cursor-pointer bg-[black] items-center justify-center rounded-md"
        >
          <Text className="text-[white] text-lg font-medium">Change</Text>
        </Box>
      </Box>
    </Box>
  );
};
