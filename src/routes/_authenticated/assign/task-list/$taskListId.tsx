import { createFileRoute } from "@tanstack/react-router";
import { getAllCategoriesQueryOptions } from "../../../../features/category/services/get-all-categories.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Select, Button } from "@mantine/core"; // Import Mantine's Select component for the dropdown

export const Route = createFileRoute("/_authenticated/assign/task-list/$taskListId")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllCategoriesQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions());

  // If categories exist, render the Select component
  if (!categories || categories.length === 0) {
    return <div>No categories available. Please create one first.</div>;
  }

  return (
    <div>
      <h2>Select a category for this task list</h2>
      <Select
        label="Select Category"
        placeholder="Choose a category"
        data={categories.map((category) => ({
          value: String(category.id),
          label: category.name,
        }))}
        required
      />
      <Button mt="md">Assign Task List</Button>
    </div>
  );
}
