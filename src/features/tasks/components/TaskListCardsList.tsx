import { Button, Group } from "@mantine/core";
import GridList from "../../../components/GridList";

import { Plus } from "lucide-react";
import { Tasklist } from "../shared/tasks.types";
import InProgressTasklistCard from "./InProgressTasklistCard";

type TasklistCardsListProps = {
  onOpen: () => void;
  Tasklists: Tasklist[];
};

function TasklistCardsList({ onOpen, Tasklists }: TasklistCardsListProps) {
  return (
    <>
      <Group justify="end" py={16}>
        <Button variant="light" leftSection={<Plus size={20} />} color="lime" onClick={onOpen}>
          Task List
        </Button>
      </Group>
      <GridList>
        {Tasklists.map((Tasklist) => (
          <InProgressTasklistCard key={Tasklist.id} Tasklist={Tasklist} />
        ))}
      </GridList>
    </>
  );
}

export default TasklistCardsList;
