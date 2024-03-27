import { Id, toast, TypeOptions } from 'react-toastify';
import { delay } from '.';

export const notifUpdater = async (
  id: Id,
  message: string,
  type: TypeOptions
) => {
  toast.update(id, { render: message, type: type, isLoading: false });
  await delay(2000);
  toast.dismiss(id);
};
