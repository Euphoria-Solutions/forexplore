export const getCurrentWeekDay = (
  year: number,
  month: string,
  day: number
): number => {
  try {
    const dateStr: string = `${year}-${month}-${day}`;
    const dateObj: Date = new Date(dateStr);

    const dayOfWeekNumber: number = dateObj.getDay();
    return dayOfWeekNumber;
  } catch (error) {
    throw new Error('Invalid date');
  }
};
