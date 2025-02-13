import CategoryList from "../features/categories/CategoryList";
import { useDisclosure } from "@mantine/hooks";
import { Category, CategoryResponse } from "../features/categories/shared/category.types";
import UpsertCategoryModal from "../features/categories/UpsertCategoryModal";
import { useState } from "react";

type CategoriesPageProps = {
  categories: CategoryResponse[];
};

function CategoriesPage({ categories }: CategoriesPageProps) {
  const [isCategoryModalOpended, { open: onOpenCategoryModal, close: onCloseCategoryModal }] = useDisclosure(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const openCategoryCreateModalHandler = () => {
    setCategory(undefined);
    onOpenCategoryModal();
  };

  const openCategoryEditModalHandler = (category: Category) => {
    setCategory(category);
    onOpenCategoryModal();
  };

  const closeCategoryModalHandler = () => {
    setCategory(undefined);
    onCloseCategoryModal();
  };

  return (
    <>
      <UpsertCategoryModal isOpen={isCategoryModalOpended} onClose={closeCategoryModalHandler} category={category}/>
      <CategoryList
        categories={categories}
        onOpen={openCategoryCreateModalHandler}
        onEdit={openCategoryEditModalHandler}
      />
    </>
  );
}

export default CategoriesPage;
