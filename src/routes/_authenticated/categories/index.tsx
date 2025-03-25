import { createFileRoute } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import { getAllCategoriesQueryOptions } from "../../../features/category/services/get-all-categories.service";
import CategoriesPage from "../../../features/category/pages/CategoriesPage";
import { getCategoriesWithTasklistCountQueryOptions } from "../../../features/category/services/get-categories-with-task-list-count.service";

export const Route = createFileRoute("/_authenticated/categories/")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getCategoriesWithTasklistCountQueryOptions());
  },
  component: CategoriesRoute,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={130} />,
});

function CategoriesRoute() {
  const { data } = useSuspenseQuery(getAllCategoriesQueryOptions());
  console.log(data);
  return <CategoriesPage categories={data.items} />;
  // return <p>Test</p>;
}
