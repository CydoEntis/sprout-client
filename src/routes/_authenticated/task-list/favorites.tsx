import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import { getFavoritedTaskListsQueryOptions } from "../../../features/task-list/services/task-list/get-favorite-task-list.service";
import FavoritedTaskListsPage from "../../../features/task-list/components/favorite-task-list/FavoritedTaskListsPage";
import { PaginationParams } from "../../../util/types/shared.types";

export const Route = createFileRoute("/_authenticated/task-list/favorites")({
  loaderDeps: ({ search: { page, search, sortBy, sortDirection } }) => ({
    page,
    search,
    sortBy,
    sortDirection,
  }),
  loader: async ({ context, deps }) => {
    const { queryClient } = context;

    await queryClient.ensureQueryData(getFavoritedTaskListsQueryOptions(deps));
  },
  validateSearch: (search: Record<string, string | number>): PaginationParams => {
    return {
      page: search.page ? parseInt(search.page as string) : 1,
      search: typeof search.search === "string" ? search.search : "",
      sortBy: (search.sortBy as string) || "createdAt",
      sortDirection: (search.sortDirection as string) || "desc",
    };
  },
  component: () => <FavoritedTaskListsRoute />,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={235} />,
});

function FavoritedTaskListsRoute() {
  const searchParams = useSearch({ from: "/_authenticated/task-list/favorites" });
  const { data: taskLists } = useSuspenseQuery(getFavoritedTaskListsQueryOptions(searchParams));
  return <FavoritedTaskListsPage favoritedTaskLists={taskLists} />;
}
