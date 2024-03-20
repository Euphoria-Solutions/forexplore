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
  return Math.ceil(currentDayOfMonth / 7);
};
