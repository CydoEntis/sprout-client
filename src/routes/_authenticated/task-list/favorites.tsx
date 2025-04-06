import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getFavoritedTaskListsQueryOptions } from "../../../features/tasks/services/task-list/get-favorite-task-list.service";
import FavoritedTaskListsPage from "../../../features/tasks/favorite-task-list/FavoritedTaskListsPage";

export const Route = createFileRoute("/_authenticated/task-list/favorites")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getFavoritedTaskListsQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: favoritedTaskLists } = useSuspenseQuery(getFavoritedTaskListsQueryOptions());

  console.log(favoritedTaskLists);

  return <FavoritedTaskListsPage favoritedTaskLists={favoritedTaskLists} />;
}
