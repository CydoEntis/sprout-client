import InviteUserForm from "./InviteUserForm";
import LazyModal from "../../../../lazy-components/modals/LazyModal";

type InviteUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklistId: number;
};

const InviteUserModal = ({ isOpen, onClose, tasklistId }: InviteUserModalProps) => {
  return (
    <LazyModal size="lg" opened={isOpen} onClose={onClose} title="Invite a User">
      <InviteUserForm onClose={onClose} tasklistId={tasklistId} />
    </LazyModal>
  );
};

export default InviteUserModal;
