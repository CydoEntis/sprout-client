import LazyModal from "../../../../lazy-components/modals/LazyModal";
import CreateCategoryForm from "./CreateCategoryForm";
import { ModalProps } from "@mantine/core";

type CreateCategoryModalProps = {
  onClose: () => void;
} & ModalProps;

function CreateCategoryModal({ onClose, ...rest }: CreateCategoryModalProps) {
  return (
    <LazyModal onClose={onClose} {...rest}>
      <CreateCategoryForm onClose={onClose} />
    </LazyModal>
  );
}

export default CreateCategoryModal;
