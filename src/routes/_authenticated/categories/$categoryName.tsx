import { createFileRoute, useParams } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import { getAllTasklistsForCategoryQueryOptions } from "../../../features/category/services/get-all-task-lists-for-category.service";
import CategoryTasklistPage from "../../../pages/CategoryTasklistPage";

export const Route = createFileRoute("/_authenticated/categories/$categoryName")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllTasklistsForCategoryQueryOptions(params.categoryName));
  },
  component: () => <TasklistsPreviewRoute />,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={235} />,
});

function TasklistsPreviewRoute() {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });
  const { data: categoryTasklists } = useSuspenseQuery(getAllTasklistsForCategoryQueryOptions(categoryName));

  return <CategoryTasklistPage categoryTasklists={categoryTasklists} />;
}
