import { createFileRoute } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllCategoriesQueryOptions } from "../../../features/categories/shared/category.queries";
import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import CategoriesPage from "../../../pages/CategoriesPage";

export const Route = createFileRoute("/_authenticated/categories/")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllCategoriesQueryOptions());
  },
  component: CategoriesRoute,
  pendingComponent: () => (
    <LoadingSkeleton numberOfSkeletons={36} height={130} />
  ),
});

function CategoriesRoute() {
  const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions());

  return <CategoriesPage categories={categories} />;
}
