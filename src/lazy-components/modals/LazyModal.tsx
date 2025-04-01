import { Modal, ModalProps } from "@mantine/core";

function LazyModal({ onClose, title, children, ...rest }: ModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      classNames={{
        body: "modal",
        header: "modal",
      }}
      overlayProps={{
        backgroundOpacity: 0.65,
        blur: 3,
      }}
      onClose={handleClose}
      title={title}
      {...rest}
    >
      {children}
    </Modal>
  );
}

export default LazyModal;
