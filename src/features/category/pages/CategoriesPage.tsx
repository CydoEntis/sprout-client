import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";
import { Category, CategoryWithTaskListCount, PaginatedCategoriesWithTaskListCount } from "../shared/category.types";
// import UpsertCategoryModal from "../components/UpsertCategoryModal";
import CategoryList from "../components/CategoryList";

type CategoriesPageProps = {
  paginatedCategories: PaginatedCategoriesWithTaskListCount;
};

function CategoriesPage({ paginatedCategories }: CategoriesPageProps) {
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
    <CategoryList
      categories={paginatedCategories.items}
      onOpen={openCategoryCreateModalHandler}
      onEdit={openCategoryEditModalHandler}
    />
  );
}

export default CategoriesPage;
