'use client';

import {
  Box,
  DropdownButton,
  EnterAndExitCondition,
  ImageUploader,
  Input,
  Text,
  TradingConditions,
} from '@/components';
import { ADD_PLAN_MUTATION, GET_PLAN_CALENDAR_QUERY } from '@/graphql';
import { getWeekRanges, notifUpdater } from '@/helper';
import { AuthContext } from '@/providers';
import { useMutation, useQuery } from '@apollo/client';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

interface PlanDetailsType {
  forexAccount: string;
  mentalStatement: string;
  entryWhen: string[];
  exitWhen: string[];
}

const forexInstruments = [
  { name: 'EUR/USD', _id: 'eurusd' },
  { name: 'USD/JPY', _id: 'usdjpy' },
  { name: 'GBP/USD', _id: 'gbpusd' },
  { name: 'USD/CHF', _id: 'usdchf' },
  { name: 'AUD/USD', _id: 'audusd' },
  { name: 'USD/CAD', _id: 'usdcad' },
  { name: 'NZD/USD', _id: 'nzdusd' },
  { name: 'EUR/GBP', _id: 'eurgbp' },
  { name: 'EUR/JPY', _id: 'eurjpy' },
  { name: 'GBP/JPY', _id: 'gbpjpy' },
  { name: 'EUR/CHF', _id: 'eurchf' },
  { name: 'GBP/CHF', _id: 'gbpchf' },
  { name: 'AUD/JPY', _id: 'audjpy' },
  { name: 'NZD/JPY', _id: 'nzdjpy' },
  { name: 'AUD/CHF', _id: 'audchf' },
  { name: 'CAD/JPY', _id: 'cadjpy' },
  { name: 'CHF/JPY', _id: 'chfjpy' },
  { name: 'EUR/AUD', _id: 'euraud' },
  { name: 'EUR/CAD', _id: 'eurcad' },
  { name: 'EUR/NZD', _id: 'eurnzd' },
  { name: 'GBP/AUD', _id: 'gbpaud' },
  { name: 'GBP/CAD', _id: 'gbpcad' },
  { name: 'GBP/NZD', _id: 'gbpnzd' },
  { name: 'AUD/CAD', _id: 'audcad' },
  { name: 'NZD/CAD', _id: 'nzdcad' },
  { name: 'XAU/USD', _id: 'xauusd' },
  { name: 'XAG/USD', _id: 'xagusd' },
];

const Page = ({ params }: { params: { id: string } }) => {
  console.log(params);
  const { forexAccount } = useContext(AuthContext);

  const [SavePlan] = useMutation(ADD_PLAN_MUTATION);

  const rangeData = getWeekRanges();
  const { refetch } = useQuery(GET_PLAN_CALENDAR_QUERY, {
    variables: {
      forexAccount: forexAccount._id || '',
      startDate: rangeData.startDate,
      endDate: rangeData.endDate,
    },
  });

  const [tradeEntryDetails, setTradeEntryDetails] = useState({
    entryPrice: 0,
    targetProfit: 0,
    stopLoss: 0,
  });
  const [planDetails, setPlanDetails] = useState<PlanDetailsType>({
    forexAccount: forexAccount._id || '',
    mentalStatement: '',
    entryWhen: [],
    exitWhen: [],
  });
  const [selected, setSelected] = useState({
    _id: '',
    name: 'Choose a symbol',
  });

  const [type, setType] = useState('buy');
  const [lot, setLot] = useState(0);
  const [url, setUrl] = useState('');

  const savePlan = async () => {
    if (selected._id == '') return;
    const notifId = toast.loading('Loading ...');
    try {
      await SavePlan({
        variables: {
          instrument: selected.name,
          ...planDetails,
          ...tradeEntryDetails,
          technicalAnalysis: url,
          lot,
          type,
        },
      });
      refetch();

      await notifUpdater(notifId, 'Saved Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
  };

  const reset = () => {
    setPlanDetails({
      forexAccount: forexAccount._id || '',
      mentalStatement: '',
      entryWhen: [],
      exitWhen: [],
    });
    setLot(0);
    setSelected({
      _id: '',
      name: 'Choose a symbol',
    });
    setType('buy');
    setUrl('');
  };

  return (
    <Box className="flex-col ml-5 gap-y-5">
      <Text className="font-semibold text-2xl">Update Trading Plan</Text>
      <Box className="w-[87vw] justify-between">
        <Box className="flex-col w-[54%] h-max gap-y-5 rounded-xl">
          <Box
            className={`h-full rounded-xl bg-white w-full flex-col gap-y-3 py-4 px-5`}
          >
            <Box className="justify-between">
              <Box className={`flex-col gap-y-2`}>
                <Box className={`font-semibold text-[#1F1F20]`}>
                  Search Instrument
                </Box>
                <Box>
                  <DropdownButton
                    className="p-4 bg-white rounded-lg text-[#344054] font-semibold text-sm inline-flex items-center w-80 justify-between h-5 border-[#D0D5DD] border"
                    width={'[17vw]'}
                    menuList={forexInstruments}
                    setSelected={setSelected}
                    selected={selected}
                  ></DropdownButton>
                </Box>
              </Box>
              <Box>
                <Box className={`flex-col gap-y-2`}>
                  <Box className={`font-semibold text-[#1F1F20]`}>
                    Position size
                  </Box>
                  <Input
                    value={lot.toString()}
                    onChange={e => setLot(Number(e.target.value))}
                    className={`h-5 w-80 rounded-lg p-4 border-[#D0D5DD] border text-sm font-semibold`}
                    placeholder="Lot size"
                    type="number"
                  />
                </Box>
              </Box>
            </Box>
            <Box className={`flex-col`}>
              <Box className="text-[#1F1F20] font-semibold">Position</Box>
              <Box
                className={`w-32 h-10  rounded-lg items-center justify-between p-2 custom-border`}
              >
                <Box
                  onClick={() => setType('buy')}
                  className={`text-[#7F7F7F] ${type == 'buy' && 'border-[#D0D5DD] border rounded-lg'} font-semibold text-sm w-14 h-max py-1 items-center justify-center cursor-pointer`}
                >
                  Buy
                </Box>
                <Box
                  onClick={() => setType('sell')}
                  className={`text-[#7F7F7F] ${type == 'sell' && 'border-[#D0D5DD] border rounded-lg'} font-semibold w-14 h-max items-center py-1 text-sm justify-center cursor-pointer`}
                >
                  Sell
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className={`h-full bg-white rounded-xl w-full flex-col gap-y-3 py-4 px-5`}
          >
            <Box className={`flex-col gap-y-2`}>
              <Box className="text-[#1F1F20] font-semibold">Mental State</Box>
              <textarea
                className={`h-32 w-full text-start rounded-lg px-4 pt-2 border-[#D0D5DD] border text-sm font-semibold resize-none outline-none`}
                placeholder="Was drunk or something blah blah blah"
              />
            </Box>
          </Box>
        </Box>
        <Box className={`h-max p-5 rounded-xl bg-white w-[44%] px-4`}>
          <ImageUploader
            url={url}
            mentalStatement={planDetails.mentalStatement}
            setUrlTo={setUrl}
            setMentalStatementTo={mentalStatement =>
              setPlanDetails({ ...planDetails, mentalStatement })
            }
          ></ImageUploader>
        </Box>
      </Box>
      <Box className="flex-col gap-y-9 ml-5">
        <EnterAndExitCondition
          tags={planDetails.entryWhen.map((tag, indx) => ({
            id: indx.toString(),
            entryAndExitWhen: tag,
          }))}
          sendDataTo={data =>
            setPlanDetails({
              ...planDetails,
              entryWhen: data.map(tag => tag.entryAndExitWhen),
            })
          }
          type={'Entry'}
        />
        <EnterAndExitCondition
          tags={planDetails.exitWhen.map((tag, indx) => ({
            id: indx.toString(),
            entryAndExitWhen: tag,
          }))}
          sendDataTo={data =>
            setPlanDetails({
              ...planDetails,
              exitWhen: data.map(tag => tag.entryAndExitWhen),
            })
          }
          type={'Exit'}
        />
      </Box>
      <TradingConditions
        type="update"
        reset={reset}
        savePlan={savePlan}
        setTradeEntryDetailsTo={setTradeEntryDetails}
      />
    </Box>
  );
};

export default Page;
