import { createFileRoute } from "@tanstack/react-router";
import CategoriesPage from "../../pages/CategoriesPage";
import { queryClient } from "../../main";
import { getAllCategoriesQueryOptions } from "../../features/categories/shared/category.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../components/loaders/LoadingSkeleton";

export const Route = createFileRoute("/categories/")({
  loader: async () => {
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
