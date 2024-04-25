export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getCurrentWeek = () => {
  const today = new Date();
  const currentDayOfMonth = today.getDate();
  return Math.ceil(currentDayOfMonth / 7) == 5
    ? 4
    : Math.ceil(currentDayOfMonth / 7);
};

export const getWeekFromDate = (dateString: string) => {
  const date = new Date(dateString.replace(/\./g, '-'));

  const currentDayOfMonth = date.getDate();

  return Math.ceil(currentDayOfMonth / 7) == 5
    ? 4
    : Math.ceil(currentDayOfMonth / 7);
};
