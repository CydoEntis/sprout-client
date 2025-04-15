import { createFileRoute } from "@tanstack/react-router";
import { PaginationParams } from "../../../util/types/shared.types";
import ComingUpPage from "../../../features/coming-up/ComingUpPage";

export const Route = createFileRoute("/_authenticated/task-list/coming-up")({
  validateSearch: (params: Record<string, string | number>): PaginationParams => {
    return {
      page: params.page ? parseInt(params.page as string) : 1,
      search: typeof params.search === "string" ? params.search : "",
      sortBy: (params.sortBy as string) || "date",
      sortDirection: (params.sortDirection as string) || "asc",
    };
  },
  component: ComingUpPage,
});
