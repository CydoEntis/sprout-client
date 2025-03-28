import { createFileRoute } from "@tanstack/react-router";
import { getAllCategoriesQueryOptions } from "../../../../features/category/services/get-all-categories.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import AssignTasklistPage from "../../../../features/tasks/pages/AssignTaskListPage";

export const Route = createFileRoute("/_authenticated/assign/task-list/$taskListId")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllCategoriesQueryOptions());
  },
  component: AssignTasklistRoute,
});

function AssignTasklistRoute() {
  const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions());

  return <AssignTasklistPage categories={categories} />;
}
