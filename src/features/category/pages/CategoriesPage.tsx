import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { Button, Pagination, Title, Stack, Paper, Flex, Box, Skeleton } from "@mantine/core";
import { Grid2X2, Plus } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Category } from "../shared/category.types";
import { useGetCategoriesWithTaskListCount } from "../services/get-categories-with-task-list-count.service";
import UpsertCategoryModal from "../components/upsert-category/UpsertCategoryModal";
import CategoryList from "../components/category-list/CategoryList";
import PageHeader from "../../../components/header/PageHeader";
import FilterSortControls from "../../auth/components/controls/FilterSortControls";
import LazyText from "../../../lazy-components/text/LazyText";
import LazyIcon from "../../../lazy-components/icons/LazyIcon";
import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";

function CategoriesPage() {
  const [isCategoryModalOpened, { open: onOpenCategoryModal, close: onCloseCategoryModal }] = useDisclosure(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const searchParams = useSearch({ from: "/_authenticated/categories/" });
  const navigate = useNavigate();
  const page = searchParams.page || 1;
  const isMobile = useMediaQuery("(max-width: 425px)");

  const { data: paginatedCategories, isLoading, isFetching } = useGetCategoriesWithTaskListCount(searchParams);

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
    <Box mih="calc(95vh - 65px)">
      <Flex direction="column" justify="space-between" h="100%">
        <Stack gap={16} style={{ flexGrow: 1 }}>
          <UpsertCategoryModal isOpen={isCategoryModalOpened} onClose={closeCategoryModalHandler} category={category} />

          <Paper bg="primary.9" p={16} radius="md">
            <PageHeader
              leftSection={<LazyIcon icon={<Grid2X2 />} size="xl" hasBackground backgroundColor="lime" />}
              wrap="wrap"
              mb={16}
              rightSection={
                <Button
                  fullWidth={isMobile}
                  onClick={openCategoryCreateModalHandler}
                  leftSection={<Plus size={20} />}
                  color="lime"
                >
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

          {isLoading || isFetching ? (
            <>
              <LoadingSkeleton numberOfSkeletons={16} height={190} />
              <Skeleton  height={64} />
            </>
          ) : (
            <CategoryList
              categories={paginatedCategories?.items || []}
              onOpen={openCategoryCreateModalHandler}
              onEdit={openCategoryEditModalHandler}
            />
          )}
        </Stack>

        {!isLoading && !isFetching && paginatedCategories?.totalPages && paginatedCategories.totalPages > 1 && (
          <Paper bg="primary.9" p={16} radius="md" mt={32}>
            <Flex justify="space-between" align="center">
              <LazyText
                text={`page ${page} of ${paginatedCategories?.totalPages}`}
                highlight={page}
                highlightColor="lime"
                c="gray"
              />

              <Pagination
                color="lime"
                value={page}
                onChange={handlePageChange}
                total={paginatedCategories?.totalPages || 1}
              />
            </Flex>
          </Paper>
        )}
      </Flex>
    </Box>
  );
}

export default CategoriesPage;
