import React from 'react';
import { Box } from '@/components/common';
import { SessionCard } from './session-card';
import SessionLineChart from './session-line-chart';
import { Arrow } from '@/public/icons/arrow';
import { useQuery } from '@apollo/client';
import { GET_SESSION_ANALYSIS_QUERY } from '@/graphql';

export const SessionAnalysis = () => {
  const { data: dataRaw, loading } = useQuery(GET_SESSION_ANALYSIS_QUERY, {
    variables: {
      forexAccount: '66274530f04945c4e44e2509',
    },
  });
  if (loading) {
    return <Box>Loading ...</Box>;
  }
  return (
    <Box className="flex flex-col w-full">
      <SessionCard
        cardTitle={dataRaw.getSessionAnalysis.currentSessions}
        cardText={dataRaw.getSessionAnalysis.sessionType}
      />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow className="text-black" />
      </Box>
      <SessionLineChart data={dataRaw.getSessionAnalysis.statistics} />
    </Box>
  );
};
