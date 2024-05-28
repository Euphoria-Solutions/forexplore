export const getWeekDay = (dateStr: string): number => {
  const date = new Date(dateStr.replace(/\./g, '-'));

  const dayOfWeek = date.getDay();

  return dayOfWeek;
};
