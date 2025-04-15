import { Paper, Stack, Title, Divider, Checkbox, Group, Text } from "@mantine/core";
import { motion } from "framer-motion";
import LazyHeader from "../../lazy-components/header/LazyHeader";
import LazyIcon from "../../lazy-components/icons/LazyIcon";
import LazyText from "../../lazy-components/text/LazyText";
import { ValidIconTags } from "../../util/types/valid-icon.types";
import { getIconByTag } from "../category/shared/category.helpers";
import { ItemsDuePerCategory } from "../task-list/shared/tasks.types";

type DueTodayProps = {
  category: ItemsDuePerCategory;
  onChange: (itemId: number, taskListId: number, isCompleted: boolean) => void;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function DueTodayCard({ category, onChange }: DueTodayProps) {
  return (
    <motion.div key={category.categoryId} variants={itemVariants}>
      <Paper
        shadow="md"
        bg="primary.9"
        p={16}
        radius="lg"
        pos="relative"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Stack gap={16} mb={32}>
          <Stack gap={16}>
            <LazyHeader
              leftSection={
                <LazyIcon
                  icon={getIconByTag(category.categoryTag as ValidIconTags)}
                  size="xl"
                  iconColor="white"
                  hasBackground
                  backgroundColor={category.categoryColor}
                />
              }
            >
              <Stack gap={0}>
                <Title>{category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}</Title>
                <LazyText
                  c="dimmed"
                  text={`You have ${category.dueCount} items due today`}
                  highlight={category.dueCount}
                  highlightColor={category.categoryColor}
                />
              </Stack>
            </LazyHeader>
            <Divider c="inverse" size="md" />
          </Stack>
          <Stack gap={8}>
            {category.items.map((item) => (
              <Group key={item.id}>
                <Checkbox
                  checked={item.isCompleted}
                  onChange={(event) => onChange(item.id, item.taskListId, event.currentTarget.checked)}
                  color="lime"
                  size="md"
                />
                <Text
                  size="lg"
                  style={{
                    textDecoration: item.isCompleted ? "line-through" : "none",
                  }}
                >
                  {item.description}
                </Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </motion.div>
  );
}

export default DueTodayCard;
