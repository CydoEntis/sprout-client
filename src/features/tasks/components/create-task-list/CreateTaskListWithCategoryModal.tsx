import { Modal } from "@mantine/core";
import {} from "@mantine/form";
import CreateTaskListWithCategoryForm from "./CreateTaskListWithCategoryForm";
import { useGetAllCategories } from "../../../category/services/get-all-categories.service";

type CreateTaskListWithCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTaskListWithCategoryModal({ isOpen, onClose }: CreateTaskListWithCategoryModalProps) {
  const { data: categories } = useGetAllCategories();
  console.log(categories);

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
      <CreateTaskListWithCategoryForm onClose={handleClose} categories={categories || []} />
    </Modal>
  );
}

export default CreateTaskListWithCategoryModal;
