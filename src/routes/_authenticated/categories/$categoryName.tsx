import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import { getAllTaskListsForCategoryQueryOptions } from "../../../features/category/services/get-all-task-lists-for-category.service";
import { getCategoryQueryOptions } from "../../../features/category/services/get-category.service";
import CategoryTaskListPage from "../../../pages/CategoryTaskListPage";
import { PaginationParams } from "../../../util/types/shared.types";

export const Route = createFileRoute("/_authenticated/categories/$categoryName")({
  loaderDeps: ({ search: { page, pageSize, search, sortBy, sortDirection } }) => ({
    page,
    pageSize,
    search,
    sortBy,
    sortDirection,
  }),
  loader: async ({ context, params, deps }) => {
    const { queryClient } = context;
    const categoryName = params.categoryName;

    await Promise.all([
      queryClient.ensureQueryData(getAllTaskListsForCategoryQueryOptions(categoryName, deps)),
      queryClient.ensureQueryData(getCategoryQueryOptions(categoryName)),
    ]);
  },
  validateSearch: (search: Record<string, string | number>): PaginationParams => {
    return {
      page: search.page ? parseInt(search.page as string) : 1,
      pageSize: search.pageSize ? parseInt(search.pageSize as string) : 1,
      search: typeof search.search === "string" ? search.search : "",
      sortBy: (search.sortBy as string) || "createdAt",
      sortDirection: (search.sortDirection as string) || "desc",
    };
  },
  component: () => <TaskListsPreviewRoute />,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={235} />,
});

function TaskListsPreviewRoute() {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });

  const searchParams = useSearch({ from: "/_authenticated/categories/$categoryName" });

  const { data: taskLists } = useSuspenseQuery(getAllTaskListsForCategoryQueryOptions(categoryName, searchParams));
  const { data: category } = useSuspenseQuery(getCategoryQueryOptions(categoryName));

  console.log(taskLists);

  return <CategoryTaskListPage taskLists={taskLists} category={category} />;
}
