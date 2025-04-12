import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Button, Pagination, Select, TextInput, Title, Group, Stack } from "@mantine/core";
import { Plus, Search } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Category, PaginatedCategoriesWithTaskListCount } from "../shared/category.types";
import UpsertCategoryModal from "../components/upsert-category/UpsertCategoryModal";
import CategoryList from "../components/category-list/CategoryList";
import PageHeader from "../../../components/header/PageHeader";

type CategoriesPageProps = {
  paginatedCategories: PaginatedCategoriesWithTaskListCount;
};

function CategoriesPage({ paginatedCategories }: CategoriesPageProps) {
  const [isCategoryModalOpened, { open: onOpenCategoryModal, close: onCloseCategoryModal }] = useDisclosure(false);
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
  const search = searchParams.search || "";
  const sortBy = searchParams.sortBy || "createdAt";
  const sortDirection = searchParams.sortDirection || "desc";

  const navigate = useNavigate();

  const updateSearchParams = (updates: Partial<typeof searchParams>) => {
    navigate({
      to: "/categories",
      search: { ...searchParams, ...updates },
    });
  };

  const handlePageChange = (newPage: number) => updateSearchParams({ page: newPage });

  const handleSearchChange = (value: string) => updateSearchParams({ search: value, page: 1 });

  const handleSortByChange = (value: string | null) => {
    if (value) updateSearchParams({ sortBy: value, page: 1 });
  };

  const handleSortDirectionChange = (value: string | null) => {
    if (value) updateSearchParams({ sortDirection: value, page: 1 });
  };

  return (
    <>
      <UpsertCategoryModal isOpen={isCategoryModalOpened} onClose={closeCategoryModalHandler} category={category} />

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

      <Stack mb="md" gap="8">
        <Group grow>
          <TextInput
            placeholder="Search categories..."
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => handleSearchChange(e.currentTarget.value)}
          />
          <Select
            data={[
              { value: "createdAt", label: "Created At" },
              { value: "name", label: "Name" },
            ]}
            value={sortBy}
            onChange={handleSortByChange}
            label="Sort by"
          />
          <Select
            data={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
            value={sortDirection}
            onChange={handleSortDirectionChange}
            label="Direction"
          />
        </Group>
      </Stack>

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
