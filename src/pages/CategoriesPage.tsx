import NewListCategoryModal from "../features/categories/NewListCategoryModal";
import CategoryList from "../features/categories/CategoryList";
import { useDisclosure } from "@mantine/hooks";
import { CategoryResponse } from "../features/categories/shared/category.types";

type CategoriesPageProps = {
  categories: CategoryResponse[];
};

function CategoriesPage({ categories }: CategoriesPageProps) {
  const [
    isNewCategoryOpened,
    { open: onOpenNewCategory, close: onCloseNewCategory },
  ] = useDisclosure(false);

  return (
    <>
      <NewListCategoryModal
        isNewCategoryOpened={isNewCategoryOpened}
        onCloseNewCategory={onCloseNewCategory}
      />
      <CategoryList
        categories={categories}
        onOpenNewCategory={onOpenNewCategory}
      />
    </>
  );
}

export default CategoriesPage;
