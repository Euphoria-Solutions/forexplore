'use client';

import { useContext, useEffect, useState } from 'react';
import { Box, DropdownButton, Input, Text } from '../common';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_FOREX_ACCOUNTS,
  GET_USERS_QUERY,
  REMOVE_FOREX_ACCOUNT_MUTATION,
  UPDATE_USER_DETAILS_MUTATION,
} from '@/graphql';
import { AuthContext } from '@/providers';

export const AccountSettings = () => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
  });
  const [selectedForexAccount, setSelectedForexAccount] = useState({
    name: 'select a value',
    _id: '',
  });
  const [UpdateUserDetails] = useMutation(UPDATE_USER_DETAILS_MUTATION);
  const [RemoveForexAccount] = useMutation(REMOVE_FOREX_ACCOUNT_MUTATION);

  const { user } = useContext(AuthContext);
  const { data, loading } = useQuery(GET_USERS_QUERY, {
    variables: { id: user._id },
  });
  const [menuList, setMenuList] = useState([]);
  const {
    data: forexAccountsData,
    loading: forexAccountsDataLoading,
    refetch: refecthForexAccounts,
  } = useQuery(GET_FOREX_ACCOUNTS, {
    variables: {
      user: user._id,
    },
  });

  useEffect(() => {
    if (!loading) {
      setDetails(data.getUsers[0]);
    }
  }, [loading, data]);

  useEffect(() => {
    if (
      !forexAccountsDataLoading &&
      forexAccountsData &&
      forexAccountsData.getForexAccounts
    ) {
      const formattedMenuList = forexAccountsData.getForexAccounts.map(
        (account: { name: string; _id: string }) => {
          return {
            name: account.name,
            _id: account._id,
          };
        }
      );
      setMenuList(formattedMenuList);
    }
  }, [forexAccountsDataLoading, forexAccountsData]);

  const updateDetails = async () => {
    const id = toast.loading('Loading ...');
    try {
      await UpdateUserDetails({
        variables: {
          ...details,
          id: user._id,
        },
      });
      await notifUpdater(id, 'User Details Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
  };

  const removeForexAccount = async () => {
    if (selectedForexAccount._id === '') {
      toast.error('Please select a Forex Account');
      return;
    }
    const notifId = toast.loading('Loading ...');
    try {
      await RemoveForexAccount({
        variables: {
          id: selectedForexAccount._id,
        },
      });
      refecthForexAccounts();
      setSelectedForexAccount({
        name: 'select a value',
        _id: '',
      });
      await notifUpdater(notifId, 'Removed Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
  };

  if (loading) {
    return (
      <Box className="w-full h-full items-center justify-center">
        <Text className="font-medium text-xl">Loading ...</Text>
      </Box>
    );
  }

  return (
    <Box className={`w-full`}>
      <Box className="flex-col w-[50%] h-full  space-y-6">
        <Box className="flex-col space-y-2">
          <Text className="font-medium text-[#4C535F]">First name</Text>
          <Input
            value={details.firstName}
            onChange={e =>
              setDetails({ ...details, firstName: e.target.value })
            }
            className="bg-[#EDF2F6] border border-[#E0E4EC] p-4 rounded-md w-[80%] text-[#4C535F]"
            placeholder="Please enter your first name"
          />
        </Box>
        <Box className="flex-col space-y-2">
          <Text className="font-medium text-[#4C535F]">Last name</Text>
          <Input
            value={details.lastName}
            onChange={e => setDetails({ ...details, lastName: e.target.value })}
            className="bg-[#EDF2F6] border border-[#E0E4EC] p-4 rounded-md w-[80%] text-[#4C535F]"
            placeholder="Please enter your last name"
          />
        </Box>
        <Text className="text-xl font-medium">Trading data settings</Text>
        <Box className="flex-col space-y-2">
          <Text className="font-medium text-[#4C535F]">Accounts</Text>
          <DropdownButton
            width={'[80%]'}
            className="bg-[#EDF2F6] border border-[#E0E4EC] p-4 rounded-md w-full text-[#4C535F] items-center justify-between"
            menuList={menuList}
            setSelected={setSelectedForexAccount}
            selected={selectedForexAccount}
          />
        </Box>
        <Box
          onClick={removeForexAccount}
          className="w-[20%] h-[36px] cursor-pointer bg-[#FA4B3C] items-center justify-center rounded-md"
        >
          <Text className="text-[white] text-lg font-medium">Remove</Text>
        </Box>
      </Box>
      <Box className="flex-col w-[50%] h-full space-y-6">
        <Box className="flex-col space-y-2">
          <Text className="font-medium text-[#4C535F]">Username</Text>
          <Input
            value={details.username}
            onChange={e => setDetails({ ...details, username: e.target.value })}
            className="bg-[#EDF2F6] border border-[#E0E4EC] p-4 rounded-md w-[80%] text-[#4C535F]"
            placeholder="Please enter your username"
          />
        </Box>
        <Box className="flex-col space-y-2">
          <Text className="font-medium text-[#4C535F]">Phone number</Text>
          <Box className="bg-[#EDF2F6] p-4 border border-[#E0E4EC] w-[80%] rounded-md space-x-2">
            <Box className="w-[5%] h-full items-center justify-center">
              <Text className="text-[#8D98AA] font-medium text-sm">+1</Text>
            </Box>
            <Box className="w-[1px] bg-[#E0E4EC]" />
            <Input
              value={details.phone}
              onChange={e => setDetails({ ...details, phone: e.target.value })}
              className="bg-[#EDF2F6] w-[90%] text-[#4C535F]"
              placeholder="Please enter your last name"
            />
          </Box>
        </Box>
        <Box className="w-[20%] h-[36px] cursor-pointer bg-[#FA4B3C] items-center justify-center rounded-md">
          <Text className="text-[white] text-lg font-medium">Remove</Text>
        </Box>
      </Box>
      <Box
        onClick={updateDetails}
        className="fixed bottom-10 w-[240px] h-[50px] bg-[#272727] justify-center items-center cursor-pointer rounded-md"
      >
        <Text className="text-[white] text-lg font-bold">Update Settings</Text>
      </Box>
    </Box>
  );
};
