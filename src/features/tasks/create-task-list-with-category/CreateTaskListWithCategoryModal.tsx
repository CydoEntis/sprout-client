import {} from "@mantine/form";
import { useEffect } from "react";
import LazyModal from "../../../lazy-components/modals/LazyModal";
import { useGetAllCategories } from "../../category/services/get-all-categories.service";
import CreateTaskListWithCategoryForm from "./CreateTaskListWithCategoryForm";

type CreateTaskListWithCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTaskListWithCategoryModal({ isOpen, onClose }: CreateTaskListWithCategoryModalProps) {
  const { data: categories, refetch } = useGetAllCategories();

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  const handleClose = () => {
    onClose();
  };

  return (
    <LazyModal size="lg" opened={isOpen} onClose={handleClose} title="Create a New Task List">
      <CreateTaskListWithCategoryForm onClose={handleClose} categories={categories || []} />
    </LazyModal>
  );
}

export default CreateTaskListWithCategoryModal;
