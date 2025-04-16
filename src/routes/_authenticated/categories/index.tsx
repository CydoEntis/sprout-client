import { createFileRoute } from "@tanstack/react-router";

import CategoriesPage from "../../../features/category/pages/CategoriesPage";
import { PaginationParams } from "../../../util/types/shared.types";

export const Route = createFileRoute("/_authenticated/categories/")({
  validateSearch: (search: Record<string, string | number>): PaginationParams => {
    return {
      page: search.page ? parseInt(search.page as string) : 1,
      search: typeof search.search === "string" ? search.search : "",
      sortBy: (search.sortBy as string) || "createdAt",
      sortDirection: (search.sortDirection as string) || "desc",
    };
  },

  component: CategoriesRoute,
});

function CategoriesRoute() {
  return <CategoriesPage />;
}
