import { createFileRoute } from "@tanstack/react-router";

import { PaginationParams } from "../../../util/types/shared.types";
import DueTodayPage from "../../../features/today/DueTodayPage";

export const Route = createFileRoute("/_authenticated/task-list/today")({
  validateSearch: (search: Record<string, string | number>): PaginationParams => {
    return {
      page: search.page ? parseInt(search.page as string) : 1,
      search: typeof search.search === "string" ? search.search : "",
      sortBy: (search.sortBy as string) || "duedate",
      sortDirection: (search.sortDirection as string) || "desc",
    };
  },
  component: DueTodayPage,
});
