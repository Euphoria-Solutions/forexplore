import Link from 'next/link';
import { Box, DropdownButton, Text } from '../common';
import { FourCube } from '@/public/icons/4cube';
import { useEffect, useState } from 'react';
import { notifUpdater } from '@/helper';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FOREX_ACCOUNT, GET_FOREX_ACCOUNTS } from '@/graphql';
import { ChartModal } from '../common/chart-modal';

export const Header = ({ userId }: { userId: string }) => {
  const [modal, setModal] = useState<boolean>(false);

  const [menuList, setMenuList] = useState([]);

  const {
    data: forexAccountsData,
    loading,
    refetch: refecthForexAccounts,
  } = useQuery(GET_FOREX_ACCOUNTS, {
    variables: {
      user: userId,
    },
  });
  const [AddForexAccount] = useMutation(ADD_FOREX_ACCOUNT);

  const addNewForexAccount = async (account: string) => {
    const notifId = toast.loading('Loading ...');
    try {
      await AddForexAccount({
        variables: {
          user: userId,
          name: account,
        },
      });
      refecthForexAccounts();

      await notifUpdater(notifId, 'Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
  };
  useEffect(() => {
    if (!loading && forexAccountsData && forexAccountsData.getForexAccounts) {
      const formattedMenuList = forexAccountsData.getForexAccounts.map(
        (account: { name: string }) => {
          return {
            name: account.name,
          };
        }
      );
      setMenuList(formattedMenuList);
    }
  }, [loading, forexAccountsData]);

  if (loading) {
    return <Text>loading...</Text>;
  }
  return (
    <Box className="w-full">
      <Box className="w-full flex-row justify-between p-5 z-30 items-center">
        <DropdownButton
          placeholder="click on me"
          menuList={menuList}
          addItem={addNewForexAccount}
        />
        <Box className="flex-row justify-between px-5">
          <Box className="space-x-2">
            <Link href="/settings">
              <Box className="h-full w-max px-10 rounded-lg text-white bg-black items-center justify-center">
                Import
              </Box>
            </Link>
            <Box
              onClick={() => setModal(true)}
              className="h-full w-max p-2 rounded-lg text-white bg-black"
            >
              <FourCube />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="absolute z-30">
        <ChartModal modal={modal} setModal={setModal} />
      </Box>
    </Box>
  );
};
