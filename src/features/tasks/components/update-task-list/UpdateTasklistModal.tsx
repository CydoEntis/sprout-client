import { Modal } from "@mantine/core";
import UpdateTasklistForm from "./UpdateTasklistForm";
import { Tasklist } from "../../shared/tasks.types";

type UpdateTasklistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklist: Tasklist;
  categoryName: string;
};

function UpdateTasklistModal({ isOpen, onClose, tasklist, categoryName }: UpdateTasklistModalProps) {
  return (
    <Modal
      size="lg"
      classNames={{ body: "modal", header: "modal" }}
      opened={isOpen}
      onClose={onClose}
      title="Update Task List"
    >
      <UpdateTasklistForm onClose={onClose} tasklist={tasklist} categoryName={categoryName} />
    </Modal>
  );
}

export default UpdateTasklistModal;
