'use client';
import { Box, Text } from '@/components';
import { UploadAnimation } from '@/components/settings-page';
import * as XLSX from 'xlsx';
import React, { ChangeEvent, useEffect, useState } from 'react';

const Page = () => {
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState<File>();
  const [json, setJson] = useState('');

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target != null) {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setJson(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(file);
    }
  }, [file, json]);
  const handleTabChange = (number: number) => {
    setTab(number);
  };
  const handleUpload = (el: ChangeEvent<HTMLInputElement>) => {
    if (el.target.files) setFile(el.target.files[0]);
  };
  const getColor = (number: number) => {
    if (number == tab) {
      return 'black';
    } else {
      return 'gray';
    }
  };

  return (
    <Box className="py-12 px-7 flex-col gap-6 w-screen">
      <Box className="flex h-fit gap-3">
        <button onClick={() => handleTabChange(0)} className="flex flex-col">
          <Text className={`px-3 font-medium text-xl text-${getColor(0)}`}>
            Account Setting
          </Text>
          <Box className={`w-full h-[2px] rounded-full bg-${getColor(0)}`} />
        </button>
        <button onClick={() => handleTabChange(1)} className="flex flex-col">
          <Text className={`px-3 font-medium text-xl text-${getColor(1)}`}>
            Login & Security
          </Text>
          <Box className={`w-full h-[2px] rounded-full bg-${getColor(1)}`} />
        </button>
        <button onClick={() => handleTabChange(2)} className="flex flex-col">
          <Text className={`px-3 font-medium text-xl text-${getColor(2)}`}>
            Import
          </Text>
          <Box className={`w-full h-[2px] rounded-full bg-${getColor(2)}`} />
        </button>
      </Box>
      {tab == 2 && (
        <>
          <Box className="rounded-3xl bg-white shadow-md w-full h-full flex-col">
            <Text className="py-6 px-9 w-full">New import</Text>
            <Box className="h-px w-full bg-[#EBEFF2]" />
            <label
              htmlFor="fileInput"
              className="flex relative rounded-3xl cursor-pointer flex-col justify-center items-center h-full border-2 border-dashed border-[#E2E6EA] m-8"
            >
              <UploadAnimation />
              <Text className="text-[3242634] whitespace-pre text-center select-none">
                {'Click to browse or \n drag and drop your files\n'}
                {file && file.name}
              </Text>
              <input
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="absolute w-full h-full z-50 opacity-0 cursor-pointer"
                onChange={handleUpload}
                id="fileInput"
                type="file"
              />
            </label>
          </Box>
          <button className="bg-dark text-white py-4 px-20 w-fit rounded-lg font-bold">
            Confirm
          </button>
        </>
      )}
    </Box>
  );
};

export default Page;
