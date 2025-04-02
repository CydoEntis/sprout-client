import LazyModal from "../../../../lazy-components/modals/LazyModal";
import { TaskListRole } from "../../shared/invite.schemas";
import InviteUserForm from "../invite-user/InviteUserForm";
import ManageMembers from "../manage-members/ManageMembers";

type MembersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklistId: number;
  currentUserRole: TaskListRole;
};

const MembersModal = ({ isOpen, onClose, tasklistId, currentUserRole }: MembersModalProps) => {
  return (
    <LazyModal size="lg" opened={isOpen} onClose={onClose} title="Members">
      <InviteUserForm onClose={onClose} tasklistId={tasklistId} />
      <ManageMembers tasklistId={tasklistId} currentUserRole={currentUserRole} />
    </LazyModal>
  );
};

export default MembersModal;
