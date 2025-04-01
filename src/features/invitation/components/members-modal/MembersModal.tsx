import LazyModal from "../../../../lazy-components/modals/LazyModal";
import InviteUserForm from "../invite-user/InviteUserForm";

type MembersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklistId: number;
};

const MembersModal = ({ isOpen, onClose, tasklistId }: MembersModalProps) => {
  return (
    <LazyModal size="lg" opened={isOpen} onClose={onClose} title="Members">
      <InviteUserForm onClose={onClose} tasklistId={tasklistId} />
    </LazyModal>
  );
};

export default MembersModal;
