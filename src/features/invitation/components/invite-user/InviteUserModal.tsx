import { Modal } from "@mantine/core";
import InviteUserForm from "./InviteUserForm";

type InviteUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklistId: number;
};

const InviteUserModal = ({ isOpen, onClose, tasklistId }: InviteUserModalProps) => {
  return (
    <Modal size="lg" opened={isOpen} onClose={onClose} title="Invite a User">
      <InviteUserForm onClose={onClose} tasklistId={tasklistId} />
    </Modal>
  );
};

export default InviteUserModal;
