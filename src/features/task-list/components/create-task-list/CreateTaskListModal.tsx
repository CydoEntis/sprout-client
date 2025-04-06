import LazyModal from "../../../../lazy-components/modals/LazyModal";
import CreateTaskListForm from "./CreateTaskListForm";

type CreateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpen, onClose }: CreateTaskListModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <LazyModal size="lg" opened={isOpen} onClose={handleClose} title="Create a New Task List">
      <CreateTaskListForm onClose={handleClose} categoryName={"test"} />
    </LazyModal>
  );
}

export default CreateTaskListModal;
