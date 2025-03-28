import { Modal } from "@mantine/core";
import {} from "@mantine/form";
import { useGetAllCategories } from "../../../category/services/get-all-categories.service";
import { useEffect } from "react";
import CreateTasklistWithCategoryForm from "./CreateTasklistWithCategoryForm";

type CreateTasklistWithCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTasklistWithCategoryModal({ isOpen, onClose }: CreateTasklistWithCategoryModalProps) {
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
    <Modal
      size="lg"
      classNames={{
        body: "modal",
        header: "modal",
      }}
      opened={isOpen}
      onClose={handleClose}
      title="Create a New Task List"
    >
      <CreateTasklistWithCategoryForm onClose={handleClose} categories={categories || []} />
    </Modal>
  );
}

export default CreateTasklistWithCategoryModal;
