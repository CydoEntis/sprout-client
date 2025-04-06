import LazyModal from "../../../lazy-components/modals/LazyModal";
import { TaskList } from "../shared/tasks.types";
import UpdateTaskListForm from "./UpdateTasklistForm";

type UpdateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklist: TaskList;
  categoryName: string;
};

function UpdateTaskListModal({ isOpen, onClose, tasklist, categoryName }: UpdateTaskListModalProps) {
  return (
    <LazyModal size="lg" opened={isOpen} onClose={onClose} title="Update Task List">
      <UpdateTaskListForm onClose={onClose} tasklist={tasklist} categoryName={categoryName} />
    </LazyModal>
  );
}

export default UpdateTaskListModal;
