import { createFileRoute } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import { getCategoriesWithTaskListCountQueryOptions } from "../../../features/category/services/get-categories-with-task-list-count.service";
import CategoriesPage from "../../../features/category/categories-page/CategoriesPage";

export const Route = createFileRoute("/_authenticated/categories/")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getCategoriesWithTaskListCountQueryOptions());
  },
  component: CategoriesRoute,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={130} />,
});

function CategoriesRoute() {
  const { data } = useSuspenseQuery(getCategoriesWithTaskListCountQueryOptions());
  return <CategoriesPage paginatedCategories={data} />;
}
