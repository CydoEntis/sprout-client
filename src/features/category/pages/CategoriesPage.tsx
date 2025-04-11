import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";
import { Category, PaginatedCategoriesWithTaskListCount } from "../shared/category.types";
import UpsertCategoryModal from "../components/upsert-category/UpsertCategoryModal";
import CategoryList from "../components/category-list/CategoryList";
import PageHeader from "../../../components/header/PageHeader";
import { Button, Pagination, Title } from "@mantine/core";
import { Plus } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

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

  const searchParams = useSearch({ from: "/_authenticated/categories/" });
  const page = searchParams.page || 1;
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `/categories`,
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <>
      <UpsertCategoryModal isOpen={isCategoryModalOpended} onClose={closeCategoryModalHandler} category={category} />
      <PageHeader
        mb={16}
        rightSection={
          <Button onClick={onOpenCategoryModal} leftSection={<Plus size={20} />} color="lime">
            Category
          </Button>
        }
      >
        <Title>Categories</Title>
      </PageHeader>
      <CategoryList
        categories={paginatedCategories.items}
        onOpen={openCategoryCreateModalHandler}
        onEdit={openCategoryEditModalHandler}
      />
      {paginatedCategories.totalPages > 1 && (
        <Pagination
          color="lime"
          value={page}
          onChange={handlePageChange}
          total={paginatedCategories.totalPages}
          style={{ flexShrink: 0 }}
        />
      )}
    </>
  );
}

export default CategoriesPage;
