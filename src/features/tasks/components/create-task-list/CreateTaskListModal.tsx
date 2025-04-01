import { Modal } from "@mantine/core";
import {} from "@mantine/form";
import CreateTasklistForm from "./CreateTasklistForm";

type CreateTasklistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTasklistModal({ isOpen, onClose }: CreateTasklistModalProps) {

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
      <CreateTasklistForm onClose={handleClose} categoryName={"test"} />
    </Modal>
  );
}

export default CreateTasklistModal;
