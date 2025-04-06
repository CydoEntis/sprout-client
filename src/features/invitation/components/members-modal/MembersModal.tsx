import LazyModal from "../../../../lazy-components/modals/LazyModal";
import { TaskListRole } from "../../shared/invite.schemas";
import InviteUserForm from "../invite-user/InviteUserForm";
import ManageMembers from "../manage-members/ManageMembers";

type MembersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskListId: number;
  currentUserRole: TaskListRole;
};

const MembersModal = ({ isOpen, onClose, taskListId, currentUserRole }: MembersModalProps) => {
  return (
    <LazyModal size="lg" opened={isOpen} onClose={onClose} title="Members">
      <InviteUserForm onClose={onClose} taskListId={taskListId} />
      <ManageMembers taskListId={taskListId} currentUserRole={currentUserRole} />
    </LazyModal>
  );
};

export default MembersModal;
