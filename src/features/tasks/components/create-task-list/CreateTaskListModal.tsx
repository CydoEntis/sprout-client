import { Modal } from "@mantine/core";
import {} from "@mantine/form";
import { useParams } from "@tanstack/react-router";
import CreateTaskListForm from "./CreateTaskListForm";

type CreateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpen, onClose }: CreateTaskListModalProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      classNames={{
        body: "modal",
        header: "modal",
      }}
      opened={isOpen}
      onClose={handleClose}
      title="Create a New Task List"
    >
      <CreateTaskListForm onClose={handleClose} categoryName={categoryName} />
    </Modal>
  );
}

export default CreateTaskListModal;
