export const getBadgeColor = (daysAway: number): string => {
  if (daysAway === 1) return "red";
  if (daysAway <= 3) return "orange";
  if (daysAway <= 5) return "yellow";
  return "green";
};
