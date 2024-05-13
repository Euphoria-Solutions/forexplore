export const getLatestDateOfMonth = (month: string, year: number): number => {
  const monthMap: { [key: string]: number } = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const monthNum: number = monthMap[month];
  if (!monthNum) {
    throw new Error('Invalid month abbreviation');
  }

  const nextMonthDate: Date = new Date(year, monthNum, 1);
  const lastDateOfMonth: Date = new Date(nextMonthDate.getTime() - 1);

  return lastDateOfMonth.getDate();
};
