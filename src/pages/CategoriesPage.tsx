import NewListCategoryModal from "../features/categories/NewListCategoryModal";
import { useGetAllCategories } from "../features/list-category/shared/category.queries";
import CategoryList from "../features/categories/CategoryList";
import { useDisclosure } from "@mantine/hooks";

function CategoriesPage() {
  const { data: categories, isPending } = useGetAllCategories();

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
        categories={categories!}
        onOpenNewCategory={onOpenNewCategory}
      />
    </>
  );
}

export default CategoriesPage;
