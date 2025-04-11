import { Group, GroupProps, Text, TextProps } from "@mantine/core";

// Helper function to format date
const formatDate = (date: Date | string, format: "us" | "eu") => {
  const dateObj = new Date(date);

  const month = dateObj.toLocaleString("default", { month: "short", timeZone: "UTC" });
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  if (format === "us") {
    return `${month} ${day}${getDaySuffix(day)}, ${year}`;
  }

  if (format === "eu") {
    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
  }

  return dateObj.toUTCString();
};

type LazyDateProps = {
  date: Date;
  format?: "us" | "eu";
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
} & TextProps &
  GroupProps;

function LazyDate({ date, format = "us", leftSection, rightSection, ...props }: LazyDateProps) {
  const formattedDate = formatDate(date, format);

  return (
    <Group {...props} gap={4} align="center">
      {leftSection}
      <Text {...props}>{formattedDate}</Text>
      {rightSection}
    </Group>
  );
}

export default LazyDate;
