import { Id, toast, TypeOptions } from 'react-toastify';
import { delay } from '.';

export const notifUpdater = async (
  id: Id,
  message: string,
  type: TypeOptions,
  delayTime: number = 1500
) => {
  toast.update(id, { render: message, type: type, isLoading: false });
  await delay(delayTime);
  toast.dismiss(id);
};
