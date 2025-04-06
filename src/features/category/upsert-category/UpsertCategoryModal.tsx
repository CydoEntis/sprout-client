import LazyModal from "../../../lazy-components/modals/LazyModal";
import { Category } from "../shared/category.types";
import UpsertCategoryForm from "./UpsertCategoryForm";

type UpsertCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
};

function UpsertCategoryModal({ isOpen, onClose, category }: UpsertCategoryModalProps) {
  return (
    <LazyModal size="lg" opened={isOpen} onClose={onClose} title={category ? "Update Category" : "Add a New Category"}>
      <UpsertCategoryForm onClose={onClose} category={category} />
    </LazyModal>
  );
}

export default UpsertCategoryModal;
