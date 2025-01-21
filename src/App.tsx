import { useState } from "react";
import {
  Anchor,
  Avatar,
  Box,
  Container,
  Flex,
  Group,
  Modal,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import TaskCard from "./features/Tasks2/TaskCard";
import { useDisclosure } from "@mantine/hooks";
import { taskLists } from "./features/Tasks2/data";
import { Calendar, Divide } from "lucide-react";
import ThemeToggle from "./components/theme/ThemeToggle";
import InProgressTaskListCard from "./features/task-list/InProgressTaskListCard";
import CompletedTaskListCard from "./features/task-list/CompletedTaskListCard";
import TaskListTabs from "./features/task-list-tabs/TaskListTabs";

import useAuthStore from "./stores/useAuthStore";
import FarmProgress from "./features/farm/FarmProgress";

function App() {
  const { user } = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleToggleCard = (cardId: number) => {
    setOpenCard((prev) => (prev === cardId ? null : cardId));
  };


  return (
    <>
      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user!.username}</Title>
        <FarmProgress />
      </Stack>

      <TaskListTabs />
    </>
  );
}

export default App;
