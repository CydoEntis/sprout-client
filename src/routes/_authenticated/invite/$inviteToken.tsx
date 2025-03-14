import { createFileRoute } from "@tanstack/react-router";
import InvitePage from "../../../features/invitation/pages/InvitePage";
import { getAllCategoriesQueryOptions } from "../../../features/category/services/get-all-categories.service";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/invite/$inviteToken")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllCategoriesQueryOptions());
  },
  component: InviteUserRouter,
});

function InviteUserRouter() {
  const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions());

  return <InvitePage categories={categories} />;
}
