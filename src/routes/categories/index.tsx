import { createFileRoute } from "@tanstack/react-router";
import CategoriesPage from "../../pages/CategoriesPage";
import { queryClient } from "../../main";
import { getAllCategoriesQueryOptions } from "../../features/categories/shared/category.queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/categories/")({
  loader: async () => {
    return queryClient.ensureQueryData(getAllCategoriesQueryOptions());
  },
  component: CategoriesRoute,
  pendingComponent: () => <div>Loading...</div>,
});

function CategoriesRoute() {
  const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions());

  return <CategoriesPage categories={categories} />;
}
