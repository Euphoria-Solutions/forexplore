export const isDateInRange = (
  dateStr: string,
  startStr: string | null,
  endStr: string | null
): string | null => {
  const today = new Date();
  const currentWeekStart = new Date(
    today.setDate(today.getDate() - today.getDay())
  );
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

  const date = new Date(dateStr);
  const startDate = startStr ? new Date(startStr) : currentWeekStart;
  const endDate = endStr ? new Date(endStr) : currentWeekEnd;

  endDate.setHours(23, 59, 59, 999);

  if (date >= startDate && date <= endDate) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}.${day}`;
  }
  return null;
};
