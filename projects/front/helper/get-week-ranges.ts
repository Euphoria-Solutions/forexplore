interface WeekRange {
  startDate: string;
  endDate: string;
  rangeString: string;
}

export const getWeekRanges = (weekOffset: number = 0): WeekRange => {
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7; // Adjust so Monday is the first day of the week (0)

  // Calculate the start of the week (Monday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek - weekOffset * 7);

  // Calculate the end of the week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date: Date, format: 'MM.DD' | 'YYYY-MM-DD'): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return format === 'MM.DD' ? `${month}.${day}` : `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(startOfWeek, 'YYYY-MM-DD'),
    endDate: formatDate(endOfWeek, 'YYYY-MM-DD'),
    rangeString: `${formatDate(startOfWeek, 'MM.DD')} - ${formatDate(endOfWeek, 'MM.DD')}`,
  };
};
