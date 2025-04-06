import LazyModal from "../../../../lazy-components/modals/LazyModal";
import { TaskList } from "../../shared/tasks.types";
import UpdateTaskListForm from "./UpdateTasklistForm";

type UpdateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskList: TaskList;
  categoryName: string;
};

function UpdateTaskListModal({ isOpen, onClose, taskList, categoryName }: UpdateTaskListModalProps) {
  return (
    <LazyModal size="lg" opened={isOpen} onClose={onClose} title="Update Task List">
      <UpdateTaskListForm onClose={onClose} taskList={taskList} categoryName={categoryName} />
    </LazyModal>
  );
}

export default UpdateTaskListModal;
