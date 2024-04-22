export const getGrowth = (value: number, prevValue: number) => {
  if (prevValue === 0) {
    return 0;
  }
  const percent = (value / prevValue) * 100 - 100;
  return percent.toFixed(1);
};
