import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import { getCategoriesWithTaskListCountQueryOptions } from "../../../features/category/services/get-categories-with-task-list-count.service";
import CategoriesPage from "../../../features/category/pages/CategoriesPage";
import { PaginationParams } from "../../../util/types/shared.types";

export const Route = createFileRoute("/_authenticated/categories/")({
  loaderDeps: ({ search: { page, pageSize, search, sortBy, sortDirection } }) => ({
    page,
    pageSize,
    search,
    sortBy,
    sortDirection,
  }),
  validateSearch: (search: Record<string, string | number>): PaginationParams => {
    return {
      page: search.page ? parseInt(search.page as string) : 1,
      pageSize: search.pageSize ? parseInt(search.pageSize as string) : 1,
      search: typeof search.search === "string" ? search.search : "",
      sortBy: (search.sortBy as string) || "createdAt",
      sortDirection: (search.sortDirection as string) || "desc",
    };
  },
  loader: async ({ context, deps }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getCategoriesWithTaskListCountQueryOptions(deps));
  },
  component: CategoriesRoute,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={130} />,
});

function CategoriesRoute() {
  const searchParams = useSearch({ from: "/_authenticated/categories/" });

  const { data } = useSuspenseQuery(getCategoriesWithTaskListCountQueryOptions(searchParams));
  console.log(data);


  return <CategoriesPage paginatedCategories={data} />;
}
