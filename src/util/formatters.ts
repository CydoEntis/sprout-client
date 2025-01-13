export const formatTime = (date: Date): { time: string; period: string } => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [time, period] = formatter.format(date).split(" ");
  return { time, period };
};

// Reusable function to format date (e.g., "Sat, Dec 11")
export const formatDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return formatter.format(date);
};

export const calculateDaysAway = (date: Date): number => {
    const currentDate = new Date(); 
    currentDate.setHours(0, 0, 0, 0); 
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); 
  
    const diffTime = targetDate.getTime() - currentDate.getTime(); 
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };
  