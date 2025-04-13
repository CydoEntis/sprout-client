import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Button, Pagination, Title, Stack, Paper, Flex, Box } from "@mantine/core";
import { Plus } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Category, PaginatedCategoriesWithTaskListCount } from "../shared/category.types";
import UpsertCategoryModal from "../components/upsert-category/UpsertCategoryModal";
import CategoryList from "../components/category-list/CategoryList";
import PageHeader from "../../../components/header/PageHeader";
import FilterSortControls from "../../auth/components/controls/FilterSortControls";
import LazyText from "../../../lazy-components/text/LazyText";

type CategoriesPageProps = {
  paginatedCategories: PaginatedCategoriesWithTaskListCount;
};

function CategoriesPage({ paginatedCategories }: CategoriesPageProps) {
  const [isCategoryModalOpened, { open: onOpenCategoryModal, close: onCloseCategoryModal }] = useDisclosure(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const searchParams = useSearch({ from: "/_authenticated/categories/" });
  const navigate = useNavigate();
  const page = searchParams.page || 1;

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

  const handlePageChange = (newPage: number) => {
    navigate({
      to: "/categories",
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <Box h="95vh">
      <Flex direction="column" justify="space-between" h="100%">
        <Stack gap={16} style={{ flexGrow: 1 }}>
          <UpsertCategoryModal isOpen={isCategoryModalOpened} onClose={closeCategoryModalHandler} category={category} />

          <Paper bg="primary.9" p={16} radius="md">
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
              <FilterSortControls
                route="/categories"
                searchParams={searchParams}
                sortByOptions={[
                  { value: "createdAt", label: "Created At" },
                  { value: "name", label: "Name" },
                ]}
              />
            </Stack>
          </Paper>

          <CategoryList
            categories={paginatedCategories.items}
            onOpen={openCategoryCreateModalHandler}
            onEdit={openCategoryEditModalHandler}
          />
        </Stack>

        {paginatedCategories.totalPages > 1 && (
          <Paper bg="primary.9" p={16} radius="md">
            <Flex justify="space-between" align="center">
              <LazyText
                text={`page ${page} of ${paginatedCategories.totalPages}`}
                highlight={page}
                highlightColor="lime"
                c="gray"
              />

              <Pagination
                color="lime"
                value={page}
                onChange={handlePageChange}
                total={paginatedCategories.totalPages}
              />
            </Flex>
          </Paper>
        )}
      </Flex>
    </Box>
  );
}

export default CategoriesPage;
