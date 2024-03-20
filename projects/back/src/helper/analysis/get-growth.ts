export const getGrowth = (value: number, prevValue: number) => {
  const percent = (value / prevValue) * 100 - 100;

  return percent.toFixed(1);
};
