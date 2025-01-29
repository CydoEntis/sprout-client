import NewListCategoryModal from "../features/categories/NewListCategoryModal";
import CategoryList from "../features/categories/CategoryList";
import { useDisclosure } from "@mantine/hooks";
import { CategoryResponse } from "../features/categories/shared/category.types";
import WelcomeHeader from "../components/headers/WelcomeHeader";
import FarmProgress from "../features/farm/FarmProgress";
import useAuthStore from "../stores/useAuthStore";

type CategoriesPageProps = {
  categories: CategoryResponse[];
};

function CategoriesPage({ categories }: CategoriesPageProps) {
  const [
    isNewCategoryOpened,
    { open: onOpenNewCategory, close: onCloseNewCategory },
  ] = useDisclosure(false);
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <NewListCategoryModal
        isNewCategoryOpened={isNewCategoryOpened}
        onCloseNewCategory={onCloseNewCategory}
      />
      <WelcomeHeader username={user!.username} />
      <FarmProgress />
      <CategoryList
        categories={categories}
        onOpenNewCategory={onOpenNewCategory}
      />
    </>
  );
}

export default CategoriesPage;
