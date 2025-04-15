import { Stack } from "@mantine/core";
import { motion } from "framer-motion";
import { ItemsDuePerCategory } from "../task-list/shared/tasks.types";
import DueTodayCard from "./DueTodayCard";

type DueTodayProps = {
  items: ItemsDuePerCategory[];
  onChange: (itemId: number, taskListId: number, isCompleted: boolean) => void;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function DueTodayList({ items, onChange }: DueTodayProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <Stack gap={16}>
        {items.map((item: ItemsDuePerCategory) => (
          <DueTodayCard category={item} onChange={onChange} />
        ))}
      </Stack>
    </motion.div>
  );
}

export default DueTodayList;
