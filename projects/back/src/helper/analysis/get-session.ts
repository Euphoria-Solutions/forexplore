const sessionTime = [
  {
    title: 'Sydney',
    open: '04:00:00',
    close: '13:00:00',
  },
  {
    title: 'Tokyo',
    open: '07:00:00',
    close: '16:00:00',
  },
  {
    title: 'London',
    open: '15:00:00',
    close: '23:59:59',
  },
  {
    title: 'New York',
    open: '21:30:00',
    close: '04:40:00', // Note: Next day
  },
];

const parseTime = (timeStr: string) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return { hours, minutes, seconds };
};

const isTimeBetween = (
  startTime: { hours: number; minutes: number; seconds: number },
  endTime: { hours: number; minutes: number; seconds: number },
  currentTime: Date
) => {
  const currentDate = new Date(currentTime);
  const startDateTime = new Date(currentDate);
  startDateTime.setHours(startTime.hours, startTime.minutes, startTime.seconds);
  const endDateTime = new Date(currentDate);
  endDateTime.setHours(endTime.hours, endTime.minutes, endTime.seconds);
  if (
    endTime.hours < startTime.hours ||
    (endTime.hours === startTime.hours && endTime.minutes < startTime.minutes)
  ) {
    endDateTime.setDate(endDateTime.getDate() + 1);
  }

  return currentTime >= startDateTime && currentTime <= endDateTime;
};

export const getSession = (dateStr: string) => {
  const matchingSessions = [];
  const currentTime = new Date(dateStr);
  for (const session of sessionTime) {
    const { open, close, title } = session;
    const startTime = parseTime(open);
    const endTime = parseTime(close);

    if (isTimeBetween(startTime, endTime, currentTime)) {
      matchingSessions.push(title);
    }
  }
  return matchingSessions.length > 0 ? matchingSessions : ['No active session'];
};
