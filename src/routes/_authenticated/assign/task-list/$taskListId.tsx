import { createFileRoute } from "@tanstack/react-router";
import { getAllCategoriesQueryOptions } from "../../../../features/category/services/get-all-categories.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Select, Button, Card, Container, Group, Stack, Text } from "@mantine/core";
import CreateCategoryForm from "../../../../features/category/components/CreateCategoryForm";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/assign/task-list/$taskListId")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllCategoriesQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions());
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  if (!categories || categories.length === 0) {
    return <div>No categories available. Please create one first.</div>;
  }

  const toggleCreateCategory = () => {
    setIsCreatingCategory((prev) => !prev);
  };

  return (
    <Container maw={500}>
      <h2>{isCreatingCategory ? "Create a New Category" : "Select a Category for This Task List"}</h2>
      <Stack gap={8}>
        {!isCreatingCategory ? (
          <>
            <motion.div
              key="select-category"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card withBorder radius="md" shadow="md" bg="card">
                <Stack gap={12} align="end" w="100%">
                  <Select
                    classNames={{
                      input: "input",
                    }}
                    label="Select Category"
                    placeholder="Choose a category"
                    data={categories.map((category) => ({
                      value: String(category.id),
                      label: category.name,
                    }))}
                    required
                    w="100%"
                  />
                  <Button variant="light" color="lime" w="100%">
                    Assign
                  </Button>
                </Stack>
                <Group justify="center" gap={8} mt={16}>
                  <Text ta="center" c="dimmed" size="sm">
                    Don't see a the category you need?
                  </Text>
                  <Text
                    onClick={toggleCreateCategory}
                    c="lime"
                    td="underline"
                    size="sm"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Create One!
                  </Text>
                </Group>
              </Card>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              key="create-category-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card withBorder radius="md" shadow="md">
                <CreateCategoryForm />
                <Group justify="center" gap={8} mt={16}>
                  <Text ta="center" c="dimmed" size="sm">
                    Changed your mind?
                  </Text>
                  <Text
                    onClick={toggleCreateCategory}
                    c="lime"
                    td="underline"
                    size="sm"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Select a Category!
                  </Text>
                </Group>
              </Card>
            </motion.div>
          </>
        )}
      </Stack>
    </Container>
  );
}
