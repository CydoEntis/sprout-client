import { Flex, TextInput, Select, ActionIcon } from "@mantine/core";
import { Trash2 } from "lucide-react";
import React from "react";
import { Task } from "./shared/task.types";

type CreateNewTaskProps = {
  index: number;
  task: Task;
  handleTaskChange: (index: number, field: keyof Task, value: string) => void;
  handleRemoveTask: (index: number) => void;
};

function CreateNewTask({
  index,
  task,
  handleTaskChange,
  handleRemoveTask,
}: CreateNewTaskProps) {
  return (
    <Flex
      key={index}
      mt="sm"
      w="100%"
      gap="sm"
      align="flex-start"
      direction={{ base: "column", sm: "row" }}
      wrap="wrap"
    >
      <TextInput
        w={{ base: "100%", sm: "50%" }}
        placeholder="Task description"
        value={task.description}
        onChange={(e) => handleTaskChange(index, "description", e.target.value)}
      />
      <Flex w={{ base: "100%", sm: "45%" }} align="center" gap="sm">
        <Select
          placeholder="Select category"
          data={["Work", "Personal", "Urgent"]}
          value={task.category}
          onChange={(value) => handleTaskChange(index, "category", value || "")}
          w="100%"
        />
        <ActionIcon
          variant="light"
          color="red"
          size="lg"
          onClick={() => handleRemoveTask(index)}
        >
          <Trash2 size={16} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}

export default CreateNewTask;
