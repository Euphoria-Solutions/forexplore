export const getWeekRange = (monthName: string, week: number): string => {
  const monthNamesToNumbers: { [key: string]: number } = {
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

  const month = monthNamesToNumbers[monthName];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const currentYear = new Date().getFullYear();
  const daysInMonth = getDaysInMonth(month, currentYear);

  const weekStart = 1 + (week - 1) * 7;
  let weekEnd = weekStart + 6;

  if (weekEnd > daysInMonth) {
    weekEnd = daysInMonth;
  } else if (week === 4 && daysInMonth - weekEnd < 7) {
    weekEnd = daysInMonth;
  }

  return `${monthName} ${weekStart} - ${monthName} ${weekEnd}`;
};
