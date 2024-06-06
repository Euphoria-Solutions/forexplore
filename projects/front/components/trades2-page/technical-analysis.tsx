'use client';

import Image from 'next/image';
import { Box } from '../common';
import { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { storage } from '@/firebase/init';

export const TechnicalAnalysis = ({
  setUrlTo,
  setMentalStatementTo,
  url: defUrl,
  mentalStatement: defmentalStatement,
}: {
  setUrlTo: (_url: string) => void;
  setMentalStatementTo: (_mentalStatement: string) => void;
  url: string;
  mentalStatement: string;
}) => {
  const [dragFile, setDragFile] = useState(false);
  const [url, setUrl] = useState(defUrl);
  const [mentalStatement, setMentalStatement] = useState(defmentalStatement);

  useEffect(() => {
    setUrlTo(url);
  }, [url, setUrlTo]);

  useEffect(() => {
    setMentalStatementTo(mentalStatement);
  }, [mentalStatement]);

  useEffect(() => {
    setUrl(defUrl);
  }, [defUrl]);

  const DropHandler = (ev: DragEvent<HTMLDivElement>) => {
    setDragFile(false);
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach(async item => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          file && save(file);
        }
      });
    }
  };
  const dragOverHandler = (ev: DragEvent<HTMLDivElement>) => {
    setDragFile(true);
    ev.preventDefault();
  };
  const StopDragOver = () => {
    setDragFile(false);
  };
  const getFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      save(files[0]);
    }
  };
  const save = (file: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target?.result) {
          const base64Data = evt.target.result as string;

          const base64ContentArray = base64Data.split(',');
          if (base64ContentArray.length === 2) {
            const base64ActualData = base64ContentArray[1]; // This is the actual base64 data, without the prefix
            const id = uuidv4();
            const imagesRef = ref(storage, `plans/${id}`);

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
    <Box
      className={`h-full rounded-xl bg-white w-[44%] items-center px-4 justify-between`}
    >
      <Box className={`flex-col gap-y-2`}>
        <Box className="text-[#1F1F20] font-semibold">Mental State</Box>
        <textarea
          value={defmentalStatement}
          onChange={e => setMentalStatement(e.target.value)}
          className={`h-24 w-72 text-start rounded-lg px-4 pt-2 border-[#D0D5DD] border text-sm font-semibold resize-none outline-none`}
          placeholder="Write your mental statement here so you can learn from your own mental statement"
        />
      </Box>
      <Box className={`flex-col gap-y-2`}>
        <Box className="text-[#1F1F20] font-semibold">Technical Analytics</Box>
        {url != '' ? (
          <Image
            onClick={() => setUrl('')}
            src={url}
            alt={'aa'}
            width={40}
            height={40}
            className="w-60 h-24"
          />
        ) : (
          <div
            id="fileDrop"
            onDrop={e => DropHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDragLeave={() => StopDragOver()}
            className="flex flex-col justify-center items-center gap-6 w-60 h-24 border-[#D0D5DD] border rounded-lg relative"
          >
            {dragFile == true ? (
              <Box className="h-full w-full absolute bg-second_gray">
                <Box className="items-center justify-center h-full w-full text-[#7F7F7F] text-sm font-semibold">
                  DROP HERE
                </Box>
              </Box>
            ) : (
              <Box>
                <Box className="gap-1">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-[#7F7F7F] text-sm font-semibold"
                  >
                    Upload an embed link
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    placeholder="Choose file"
                    style={{ display: 'none' }}
                    onChange={e => getFile(e)}
                  ></input>
                </Box>
              </Box>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};
