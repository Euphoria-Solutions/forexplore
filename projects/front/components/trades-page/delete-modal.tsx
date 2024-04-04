import { Box, Text } from '..';
import { Dispatch, SetStateAction } from 'react';
import { CloseIcon, TrashIcon } from '@/public/icons/';

type DeleteModalType = {
  onDelete: () => void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const DeleteModal: React.FC<DeleteModalType> = ({
  onDelete,
  visible,
  setVisible,
}) => {
  const handleClose = () => {
    setTimeout(() => {
      setVisible(false);
    }, 50);
  };

  return (
    visible && (
      <Box className="absolute w-screen h-screen top-0 left-0 justify-center items-center bg-black/[.3] z-50">
        <Box className="bg-white rounded-xl p-6 flex-col w-96">
          <Box className="w-full justify-between">
            <Box className="p-2 bg-[#FEE4E2]  rounded-full border-8 border-[#FEF3F2]">
              <TrashIcon className="text-[#D92D20]" />
            </Box>
            <button onClick={handleClose} className="p-2 cursor-pointer">
              <CloseIcon className="text-[#667085]" />
            </button>
          </Box>
          <Text className="font-semibold text-lg text-[#101828] mt-4">
            Delete trading plan
          </Text>
          <Text className="text-[#475467] text-sm mt-2">
            Are you sure you want to delete this plan? This action cannot be
            undone.
          </Text>
          <Box className="mt-8 gap-3 *:rounded-lg *:p-2 *:font-semibold *:w-full *:transition-all">
            <button
              onClick={handleClose}
              className="border text-[#344054] border-[#D0D5DD] active:brightness-75 hover:brightness-90"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="font-semibold text-white bg-[#D92D20] active:brightness-75 hover:brightness-90"
            >
              Delete
            </button>
          </Box>
        </Box>
      </Box>
    )
  );
};
