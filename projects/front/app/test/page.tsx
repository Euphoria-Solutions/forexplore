'use client';

import { Box } from '@/components';
import { storage } from '@/firebase/init';
import { uploadString, ref, getDownloadURL } from '@firebase/storage';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Page = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState('');

  const save = () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target?.result) {
          const base64Data = evt.target.result as string;

          const base64ContentArray = base64Data.split(',');
          if (base64ContentArray.length === 2) {
            const base64ActualData = base64ContentArray[1]; // This is the actual base64 data, without the prefix

            const id = uuidv4();
            const imagesRef = ref(storage, `articles/${id}`);

            uploadString(imagesRef, base64ActualData, 'base64').then(
              async () => {
                const downloadUrl = await getDownloadURL(imagesRef);
                console.log(downloadUrl);
                setUrl(downloadUrl);
              }
            );
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <input type="file" ref={fileRef} />
      <Box onClick={save}>Submit</Box>
      <img src={url} alt={'aa'} />
    </Box>
  );
};

export default Page;
