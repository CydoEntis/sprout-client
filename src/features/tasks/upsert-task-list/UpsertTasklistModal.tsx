import { Modal } from "@mantine/core";
import {} from "@mantine/form";
import { TaskList } from "../shared/tasks.types";
import UpsertTaskListForm from "./UpsertTasklistForm";

type UpsertTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklist?: TaskList;
};

function UpsertTaskListModal({ isOpen, onClose, tasklist }: UpsertTaskListModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      size="lg"
      classNames={{
        body: "modal",
        header: "modal",
      }}
      opened={isOpen}
      onClose={handleClose}
      title={tasklist ? "Update Task List" : "Create Task List"}
    >
      <UpsertTaskListForm onClose={handleClose} isOpen={isOpen} tasklist={tasklist} />
    </Modal>
  );
}

export default UpsertTaskListModal;
