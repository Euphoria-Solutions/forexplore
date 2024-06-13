'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { Box, Input, Text } from '../common';
import { getWeekRanges } from '@/helper';
import { useMutation } from '@apollo/client';
import { EDIT_NOTE_MUTATION } from '@/graphql';
import { AuthContext } from '@/providers';
import { useRouter } from 'next/navigation';

interface DayDetails {
  weekDay: string;
  day: string;
}

interface CalendarDataType {
  date: string;
  plans: {
    instrument: string;
    lot: string;
    status: string;
    type: string;
    _id: string;
    mentalStatement: string;
  }[];
  notes: {
    date: string;
    description: string;
    _id: string;
  }[];
}

const isToday = (dateStr: string) => {
  const today = new Date();
  const [month, day] = dateStr.split('.').map(Number);

  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  return currentMonth === month && currentDay === day;
};

const isFuture = (dateStr: string) => {
  const today = new Date();
  const [month, day] = dateStr.split('.').map(Number);

  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  return currentMonth < month || (currentDay < day && currentMonth == month);
};

export const PlanCalendar = ({
  data,
  refetch,
  addNote,
}: {
  data: CalendarDataType[];
  refetch: (_variables: Record<string, string>) => void;
  addNote: () => void;
}) => {
  const { forexAccount } = useContext(AuthContext);

  const [weekDays, setWeekDays] = useState<DayDetails[]>([]);
  const [nthPastWeek, setNthPastWeek] = useState(0);
  const [editing, setEditing] = useState('');
  const [editValue, setEditValue] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [EditNote] = useMutation(EDIT_NOTE_MUTATION);

  useEffect(() => {
    const { startDate } = getWeekRanges(nthPastWeek);
    const startOfWeek = new Date(startDate);

    const week: DayDetails[] = new Array(7).fill(null).map((_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);

      return {
        weekDay: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
          day
        ),
        day: `${(day.getMonth() + 1).toString().padStart(2, '0')}.${day.getDate().toString().padStart(2, '0')}`,
      };
    });

    setWeekDays(week);
  }, [nthPastWeek]);

  useEffect(() => {
    const rangeData = getWeekRanges(nthPastWeek);
    refetch({
      forexAccount: forexAccount._id || '',
      startDate: rangeData.startDate,
      endDate: rangeData.endDate,
    });
  }, [nthPastWeek, refetch]);

  useEffect(() => {
    const editNote = async () => {
      await EditNote({
        variables: {
          id: editing,
          description: editValue,
        },
      });
      const rangeData = getWeekRanges(nthPastWeek);
      refetch({
        forexAccount: forexAccount._id || '',
        startDate: rangeData.startDate,
        endDate: rangeData.endDate,
      });
      setEditing('');
      setEditValue('');
    };
    if (editing) {
      document.addEventListener('keypress', e => {
        if (e.key == 'Enter') {
          editNote();
        }
      });
    }
  }, [editing, EditNote, editValue, refetch, nthPastWeek]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current) {
        if (!ref.current.contains(event.target as Node)) {
          setEditing('');
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [editing]);

  const getDetails = (dayStr: string) => {
    const filteredData = (data || []).filter(day => day.date == dayStr);

    if (filteredData.length > 0) {
      return filteredData[0];
    }
    return {
      plans: [],
      notes: [],
    };
  };

  return (
    <Box className="w-full flex-col gap-y-8">
      <Box className="w-full justify-end mt-12">
        <Box
          onClick={addNote}
          className="h-[40px] w-[10%] rounded-3xl items-center justify-center bg-dark"
        >
          <Text className="text-white">Add a note</Text>
        </Box>
      </Box>
      <Box className="w-full items-center justify-between">
        <Box className="bg-dark rounded-3xl h-[36px] w-[15%] justify-center items-center">
          <Text className="text-white">
            {getWeekRanges(nthPastWeek).rangeString}
          </Text>
        </Box>
        <Box className="w-[15%] items-center justify-between">
          <Box
            onClick={() => setNthPastWeek(nthPastWeek + 1)}
            className="p-1 rounded-3xl h-[30px] w-[48%] justify-center items-center border-dashed border-dark border"
          >
            <Text className="text-dark">Previous</Text>
          </Box>
          <Box
            onClick={() => setNthPastWeek(0)}
            className="p-1 bg-dark rounded-3xl h-[30px] w-[48%] justify-center items-center"
          >
            <Text className="text-white">Present</Text>
          </Box>
        </Box>
      </Box>
      <Box className="w-full gap-x-3">
        {weekDays.map((day, i) => (
          <Box key={i} className="w-[13%] flex-col gap-y-5">
            <Box
              className={`flex-col ${isToday(day.day) ? 'bg-dark' : 'bg-white'} rounded-xl w-full h-11 items-center justify-center`}
            >
              <Text
                className={`${isToday(day.day) ? 'text-white' : 'text-[#757B88]'} ${isFuture(day.day) && 'opacity-10'}`}
              >
                {day.weekDay}
              </Text>
              <Text
                className={`font-medium text-sm ${isToday(day.day) ? 'text-white' : 'text-black'} ${isFuture(day.day) && 'opacity-10'}`}
              >
                {day.day}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="w-full gap-x-3 max-h-[400px] h-[400px] overflow-scroll">
        {weekDays.map((day, i) => (
          <Box key={i} className="w-[13%] flex-col gap-y-5">
            <Box className="w-full justify-center">
              <Box className="w-[95%] gap-y-2 flex-col">
                {getDetails(day.day).plans.map((plan, indx) => (
                  <Box
                    onClick={() =>
                      plan.status != 'finished' &&
                      router.push('/dashboard/trades2/update/' + plan._id)
                    }
                    key={indx}
                    className={`flex-col py-4 ${plan.status == 'finished' ? 'bg-white' : plan.type == 'buy' ? 'bg-[#5DAAEE]' : 'bg-[#F9837C]'} rounded-xl h-[140px] w-full items-center justify-center`}
                  >
                    <Text
                      className={`font-medium ${plan.status != 'finished' && 'text-white'}`}
                    >
                      {plan.instrument}
                    </Text>
                    <Text
                      className={`text-sm ${plan.status != 'finished' ? 'text-white' : 'text-[#757B88]'}`}
                    >
                      {plan.type}
                    </Text>
                    <Text
                      className={`font-semibold ${plan.status != 'finished' ? 'text-white' : 'text-[#757B88]'} text-sm text-center w-[150px]`}
                    >
                      {plan.mentalStatement.length > 20
                        ? plan.mentalStatement.slice(0, 20) + '...'
                        : plan.mentalStatement}
                    </Text>
                  </Box>
                ))}
                {getDetails(day.day).notes.map((note, indx) => (
                  <Box
                    key={indx}
                    className="flex-col py-4 bg-[#F3927D] rounded-xl h-[140px] w-full items-center justify-center"
                  >
                    <Text className="font-medium">Custom Note</Text>
                    {editing == note._id ? (
                      <Box ref={ref}>
                        <Input
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          className="bg-[#F3927D] w-[150px] text-center"
                        />
                      </Box>
                    ) : (
                      <Box
                        onDoubleClick={() => {
                          setEditing(note._id);
                          setEditValue(note.description);
                        }}
                      >
                        <Text className=" text-[#757B88] text-sm text-center w-[150px]">
                          {note.description.length > 20
                            ? note.description.slice(0, 20) + '...'
                            : note.description}
                        </Text>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="h-11" />
    </Box>
  );
};
