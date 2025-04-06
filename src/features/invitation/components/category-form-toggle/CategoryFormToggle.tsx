import { Group, Text } from "@mantine/core";

type CategoryFormToggleProps = {
  text: string;
  clickableText: string;
  toggleCreateCategory: () => void;
};

const CategoryFormToggle = ({ text, clickableText, toggleCreateCategory }: CategoryFormToggleProps) => (
  <Group justify="center" gap={8} mt={16}>
    <Text ta="center" c="dimmed" size="sm">
      {text}
    </Text>
    <Text
      onClick={toggleCreateCategory}
      c="lime"
      td="underline"
      size="sm"
      style={{
        cursor: "pointer",
      }}
    >
      {clickableText}
    </Text>
  </Group>
);

export default CategoryFormToggle;
