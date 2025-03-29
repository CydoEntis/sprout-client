import { Modal } from "@mantine/core";
import {} from "@mantine/form";
import UpsertTasklistForm from "./UpsertTasklistForm";
import { Tasklist } from "../../shared/tasks.types";

type UpsertTasklistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklist?: Tasklist;
};

function UpsertTasklistModal({ isOpen, onClose, tasklist }: UpsertTasklistModalProps) {
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
      title="Create a New Task List"
    >
      <UpsertTasklistForm onClose={handleClose} isOpen={isOpen} tasklist={tasklist} />
    </Modal>
  );
}

export default UpsertTasklistModal;
