import { Box, Text } from '..';
import { Dispatch, SetStateAction, useState } from 'react';
import { CloseIcon } from '@/public/icons/';

type AddPlanModalType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onCreate: (_v: string) => void;
};

export const AddPlanModal: React.FC<AddPlanModalType> = ({
  visible,
  setVisible,
  onCreate,
}) => {
  const [tradingPlanName, setTradingPlanName] = useState('');

  const handleClose = () => {
    setTimeout(() => {
      setVisible(false);
    }, 50);
  };
  const handleAdd = () => {
    onCreate(tradingPlanName);
    setTradingPlanName('');
    setVisible(false);
  };

  return (
    visible && (
      <Box className="absolute w-screen h-screen top-0 left-0 justify-center items-center bg-black/[.3] z-50">
        <Box className="bg-white rounded-xl p-6 flex-col w-96 gap-6">
          <Box className="w-full justify-between items-center">
            <Text className="font-semibold text-lg text-[#101828]">
              Create trading plan
            </Text>
            <button onClick={handleClose} className="p-2 cursor-pointer">
              <CloseIcon className="text-[#667085]" />
            </button>
          </Box>
          <Box className="flex-col">
            <label htmlFor="tradingPlanId" className="text-sm">
              Trading Plan Name
            </label>
            <input
              id="tradingPlanId"
              placeholder="New Trading Plan"
              className="p-4 py-2 mt-1 text-sm outline-none border border-[#D0D5DD] rounded-md"
              value={tradingPlanName}
              onChange={e => setTradingPlanName(e.target.value)}
            />
          </Box>
          <Box className="gap-3 *:rounded-lg *:p-2 *:font-semibold *:w-full *:transition-all">
            <button
              onClick={handleClose}
              className="border text-[#344054] border-[#D0D5DD] active:brightness-75 hover:brightness-90"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="font-semibold text-white bg-[#00DF16] active:brightness-75 hover:brightness-90"
            >
              Add
            </button>
          </Box>
        </Box>
      </Box>
    )
  );
};
