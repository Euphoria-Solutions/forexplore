import Link from 'next/link';
import { Box, DropdownButton, Text } from '../common';
import { FourCube } from '@/public/icons/4cube';
import { useContext, useEffect, useState } from 'react';
import { notifUpdater } from '@/helper';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FOREX_ACCOUNT, GET_FOREX_ACCOUNTS } from '@/graphql';
import { ChartModal } from '../common/chart-modal';
import { AuthContext } from '@/providers';

import { usePathname } from 'next/navigation';
export const Header = ({ userId }: { userId: string }) => {
  const path = usePathname();
  const [modal, setModal] = useState<boolean>(false);

  const [menuList, setMenuList] = useState([]);
  const [selected, setSelected] = useState({ name: 'select a value', _id: '' });

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
  const { setForexAccount } = useContext(AuthContext);

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
        (account: { name: string; _id: string }) => {
          return {
            name: account.name,
            _id: account._id,
          };
        }
      );
      setMenuList(formattedMenuList);
    }
  }, [loading, forexAccountsData]);

  useEffect(() => {
    if (selected._id != '') {
      setForexAccount({ _id: selected._id });
    }
  }, [selected]);

  if (loading) {
    return <Text>loading...</Text>;
  }
  return (
    <Box>
      {path.startsWith('/dashboard/trades') ||
      path.startsWith('/dashboard/users') ||
      path.startsWith('/settings') ? (
        ''
      ) : (
        <Box className="w-full">
          <Box className="w-full flex-row justify-between p-5 z-30 items-center">
            <DropdownButton
              className="p-4 text-black bg-white shadow-md rounded-lg inline-flex items-center w-full justify-between"
              width={'[17vw]'}
              menuList={menuList}
              addItem={addNewForexAccount}
              setSelected={setSelected}
              selected={selected}
            />
            <Box className="flex-row justify-between px-5">
              <Box className="space-x-2">
                <Link href="/settings?section=import">
                  <Box className="h-12 w-max px-10 rounded-lg text-white bg-black items-center justify-center">
                    Import
                  </Box>
                </Link>
                {path.startsWith('/dashboard/analytics') ? (
                  <Box
                    onClick={() => setModal(true)}
                    className="h-full w-max p-2 rounded-lg text-white bg-black"
                  >
                    <FourCube />
                  </Box>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>
          <Box className="absolute z-30">
            <ChartModal modal={modal} setModal={setModal} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
