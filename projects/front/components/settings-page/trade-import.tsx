'use client';

import * as XLSX from 'xlsx';
import { PDFIcon, TrashIcon } from '@/public/icons';
import { Box, Text } from '../common';
import { UploadAnimation } from './upload-animation';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { IMPORT_TRADE_HISTORY_MUTATION } from '@/graphql';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';
import { AuthContext } from '@/providers';

interface Trade {
  closePrice: number;
  closeTime: string;
  commission: number;
  forexAccount: string;
  openPrice: number;
  openTime: string;
  positionId: string;
  profit: number;
  sl: number;
  swap: number;
  symbol: string;
  volume: number;
  type: string;
  tp: number;
}

export const TradeImport = () => {
  const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);
  const [tradeUploaded, setTradeUploaded] = useState(false);
  const [ImportTradeHistory] = useMutation(IMPORT_TRADE_HISTORY_MUTATION);
  const { forexAccount } = useContext(AuthContext);

  const [additionalInfo, setAdditionalInfo] = useState({
    broker: '',
    balance: -1,
    forexAccountId: '',
  });
  const [uploadTime, setUploadTime] = useState(0);
  const [file, setFile] = useState<File>();
  const [json, setJson] = useState<Record<string, unknown>[] | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target != null) {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json: Record<string, unknown>[] =
            XLSX.utils.sheet_to_json(worksheet);
          setJson(json);
        }
      };
      reader.readAsBinaryString(file);
    }
  }, [file, json]);

  useEffect(() => {
    if (file) {
      const interval = setInterval(() => {
        setUploadTime(prev => prev + 1);
      }, 59999);

      return () => clearInterval(interval);
    }
  }, [file]);

  const handleUpload = (el: ChangeEvent<HTMLInputElement>) => {
    if (el.target.files) {
      setFile(el.target.files[0]);
    }
  };

  const deleteFile = () => {
    setFile(undefined);
    setUploadTime(0);
  };

  const checkJson = async () => {
    const id = toast.loading('Loading ...');
    try {
      if (!json) {
        await notifUpdater(id, 'No File Uploaded', 'error');
        setTradeUploaded(false);
        return;
      }
      if (json[4][`Trade History Report`] != 'Positions') {
        await notifUpdater(id, 'Invalid File', 'error');
        setTradeUploaded(false);
        return;
      }
      let balance = -1;
      const broker = json[2][`__EMPTY_2`] as string;

      json.map(data => {
        if (data[`Trade History Report`] == 'Balance:') {
          balance = Number(data[`__EMPTY_2`]);
        }
      });

      let ordersIndx = -1;
      const tradeHistoryData = json
        .filter((data, indx) => {
          if (data[`Trade History Report`] == 'Orders') {
            ordersIndx = indx;
          }
          if (indx >= 6 && (ordersIndx > indx || ordersIndx == -1)) {
            return true;
          }
          return false;
        })
        .map(
          data =>
            ({
              closePrice: data[`__EMPTY_8`],
              closeTime: data[`__EMPTY_7`],
              commission: data[`__EMPTY_9`],
              forexAccount: forexAccount._id,
              openPrice: data[`__EMPTY_4`],
              openTime: data[`Trade History Report`],
              positionId: (data[`__EMPTY`] as number).toString(),
              profit: data[`__EMPTY_11`],
              sl: data[`__EMPTY_5`] || 0,
              swap: data[`__EMPTY_10`],
              symbol: data[`__EMPTY_1`],
              volume: Number(data[`__EMPTY_3`]),
              type: data[`__EMPTY_2`],
              tp: data[`__EMPTY_6`] || 0,
            }) as Trade
        );
      setTradeHistory(tradeHistoryData);
      setAdditionalInfo({
        forexAccountId: forexAccount._id || '',
        broker,
        balance,
      });
      setTradeUploaded(true);
      await notifUpdater(id, 'Correct File', 'success');
    } catch (err) {
      setTradeUploaded(false);
      await notifUpdater(id, 'Unexpected Error, Try Again', 'error');
    }
  };

  const importHistory = async () => {
    const id = toast.loading('Loading ...');
    try {
      await ImportTradeHistory({
        variables: {
          ...additionalInfo,
          trades: tradeHistory,
        },
      });
      await notifUpdater(id, 'Trade History Imported Successfully', 'success');
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
  };

  return (
    <>
      <Box
        className={`rounded-3xl bg-white shadow-md w-full h-${file ? 'fit' : 'full'} flex-col`}
      >
        <Text className="py-6 px-9 font-semibold text-xl w-full">
          New import
        </Text>
        <Box className="w-full bg-[#EBEFF2]" />
        {!file ? (
          <label
            htmlFor="fileInput"
            className="flex relative rounded-3xl cursor-pointer flex-col justify-center items-center h-full border-2 border-dashed border-[#E2E6EA] m-8"
          >
            <UploadAnimation />
            <Text className="text-[3242634] whitespace-pre text-center select-none">
              {'Click to browse or \n drag and drop your files\n'}
            </Text>
            <input
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className="absolute w-full h-full z-50 opacity-0 cursor-pointer"
              onChange={handleUpload}
              id="fileInput"
              type="file"
            />
          </label>
        ) : (
          <Box className="rounded-3xl items-center justify-between border-dashed border-2 border-[#E2E6EA] p-8 m-8">
            <Box className="gap-4">
              <PDFIcon className="text-[#4353FF]" />
              <Box className="flex-col">
                <Text className="font-medium text-sm">{file.name}</Text>
                <Text className="text-xs text-[#242634]">
                  {uploadTime}m ago
                </Text>
              </Box>
            </Box>
            <Box className="gap-3 items-center">
              <Box className="border rounded-sm py-1 px-2 text-sm font-semibold h-fit border-[#CDD3D8]">
                {Math.round(file.size / 1024)}KB
              </Box>
              <button onClick={deleteFile}>
                <TrashIcon className="text-[#D92D20] h-6 w-6" />
              </button>
              {/* TODO:DROPDOWN HERE */}
              <Box>Dropdown placeholder</Box>
            </Box>
          </Box>
        )}
      </Box>
      {tradeUploaded ? (
        <Box
          onClick={importHistory}
          className="bg-green text-white py-4 px-20 w-fit rounded-lg font-bold"
        >
          Import
        </Box>
      ) : (
        <Box
          onClick={checkJson}
          className="bg-dark text-white py-4 px-20 w-fit rounded-lg font-bold"
        >
          Confirm
        </Box>
      )}
    </>
  );
};
