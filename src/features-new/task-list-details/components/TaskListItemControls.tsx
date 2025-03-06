import { Button, Group } from "@mantine/core";

function TaskListItemControls() {
  return (
    <Group gap={8}>
      <Button size="xs" variant="light" color="lime">
        Details
      </Button>
      <Button size="xs" variant="subtle" color="inverse">
        Comments
      </Button>
      <Button size="xs" variant="subtle" color="inverse">
        Attachments
      </Button>
    </Group>
  );
}

export default TaskListItemControls;
