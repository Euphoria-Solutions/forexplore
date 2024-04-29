import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@/components/common';
import { SessionCard } from './session-card';
import SessionLineChart from './session-line-chart';
import { Arrow } from '@/public/icons/arrow';
import { useQuery } from '@apollo/client';
import { GET_SESSION_ANALYSIS_QUERY } from '@/graphql';
import { AuthContext } from '@/providers';

const dummyData: SessionTypeAnalysisDataType = {
  currentSessions: ['No Data Available'],
  sessionType: 'Unknown',
  statistics: [
    {
      month: 'Unknown',
      Sydney: 0,
      London: 0,
      NewYork: 0,
      Tokyo: 0,
    },
  ],
};

interface SessionTypeAnalysisDataType {
  currentSessions: [string] | [];
  sessionType: string;
  statistics: [
    {
      month: string;
      Sydney: number;
      London: number;
      NewYork: number;
      Tokyo: number;
    },
  ];
}

export const SessionAnalysis = () => {
  const { forexAccount } = useContext(AuthContext);
  const {
    data: dataRaw,
    loading,
    refetch,
  } = useQuery(GET_SESSION_ANALYSIS_QUERY, {
    variables: {
      forexAccount: forexAccount._id,
    },
  });

  const [data, setData] = useState<SessionTypeAnalysisDataType>(dummyData);

  useEffect(() => {
    if (!loading && dataRaw) {
      setData(dataRaw.getSessionAnalysis);
    } else {
      setData(dummyData);
    }
  }, [loading, dataRaw]);

  useEffect(() => {
    refetch({
      forexAccount: forexAccount._id,
    });
  }, [forexAccount]);

  if (loading) {
    return <Box>Loading ...</Box>;
  }
  return (
    <Box className="flex flex-col w-full">
      <SessionCard
        cardTitle={data.currentSessions}
        cardText={data.sessionType}
      />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow className="text-black" />
      </Box>
      <SessionLineChart data={data.statistics} />
    </Box>
  );
};
