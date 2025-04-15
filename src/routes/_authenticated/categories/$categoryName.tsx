import { createFileRoute, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getCategoryQueryOptions } from "../../../features/category/services/get-category.service";
import { PaginationParams } from "../../../util/types/shared.types";
import CategoryTaskListPage from "../../../pages/CategoryTasklistPage";

export const Route = createFileRoute("/_authenticated/categories/$categoryName")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    const categoryName = params.categoryName;

    await Promise.all([queryClient.ensureQueryData(getCategoryQueryOptions(categoryName))]);
  },
  validateSearch: (search: Record<string, string | number>): PaginationParams => {
    return {
      page: search.page ? parseInt(search.page as string) : 1,
      search: typeof search.search === "string" ? search.search : "",
      sortBy: (search.sortBy as string) || "createdAt",
      sortDirection: (search.sortDirection as string) || "desc",
    };
  },
  component: () => <TaskListsPreviewRoute />,
});

function TaskListsPreviewRoute() {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });

  const { data: category } = useSuspenseQuery(getCategoryQueryOptions(categoryName));

  return <CategoryTaskListPage category={category} />;
}
