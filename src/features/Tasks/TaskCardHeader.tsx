import { Stack } from "@mantine/core";
import React from "react";

type Props = {};

function TaskCardHeader({}: Props) {
  return (
    <Stack gap={4} onClick={onToggle} style={{ cursor: "pointer" }}></Stack>
  );
}

export default TaskCardHeader;
