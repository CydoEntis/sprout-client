import { createFileRoute } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import CategoriesPage from "../../../features/category/pages/CategoriesPage";
import { getAllCategoriesQueryOptions } from "../../../features/category/services/get-all-categories.service";

export const Route = createFileRoute("/_authenticated/categories/")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllCategoriesQueryOptions());
  },
  component: CategoriesRoute,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={130} />,
});

function CategoriesRoute() {
  const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions());
  console.log(categories);
  return <CategoriesPage categories={categories} />;
}
