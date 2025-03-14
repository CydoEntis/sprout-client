import { Group, Text } from "@mantine/core";

type CategoryAssignmnetToggleProps = {
  text: string;
  clickableText: string;
  toggleCreateCategory: () => void;
};

const CategoryAssignmnetToggle = ({ text, clickableText, toggleCreateCategory }: CategoryAssignmnetToggleProps) => (
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

export default CategoryAssignmnetToggle;
