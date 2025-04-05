import { Modal } from "@mantine/core";
import UpdateTaskListForm from "./UpdateTaskListForm";
import { TaskList } from "../../shared/tasks.types";

type UpdateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklist: TaskList;
  categoryName: string;
};

function UpdateTaskListModal({ isOpen, onClose, tasklist, categoryName }: UpdateTaskListModalProps) {
  return (
    <Modal
      size="lg"
      classNames={{ body: "modal", header: "modal" }}
      opened={isOpen}
      onClose={onClose}
      title="Update Task List"
    >
      <UpdateTaskListForm onClose={onClose} tasklist={tasklist} categoryName={categoryName} />
    </Modal>
  );
}

export default UpdateTaskListModal;
