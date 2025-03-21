import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";
import { Category, CategoryResponse } from "../shared/category.types";
import UpsertCategoryModal from "../components/UpsertCategoryModal";
import CategoryList from "../components/CategoryList";

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
      <UpsertCategoryModal isOpen={isCategoryModalOpended} onClose={closeCategoryModalHandler} category={category} />
      <CategoryList
        categories={categories}
        // onOpen={openCategoryCreateModalHandler}
        onEdit={openCategoryEditModalHandler}
      />
    </>
  );
}

export default CategoriesPage;
