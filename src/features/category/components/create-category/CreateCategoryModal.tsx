import LazyModal from "../../../../lazy-components/modals/LazyModal";
import CreateCategoryForm from "./CreateCategoryForm";
import { ModalProps } from "@mantine/core";

type CreateCategoryModalProps = {
  onClose: () => void;
} & ModalProps;

function CreateCategoryModal({ onClose, ...rest }: CreateCategoryModalProps) {
  return (
    <LazyModal title="Create Category" size="lg" onClose={onClose} {...rest} bg="primary">
      <CreateCategoryForm onClose={onClose} />
    </LazyModal>
  );
}

export default CreateCategoryModal;
