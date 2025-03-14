import { useState } from "react";
import { Category } from "../../category/shared/category.types";
import { Container, Stack } from "@mantine/core";
import CreateCategoryCard from "../../category/components/CreateCategoryCard";
import SelectCategory from "../../category/components/SelectCategory";

type AssignTaskListPageProps = {
  categories: Category[];
};

function AssignTaskListPage({ categories }: AssignTaskListPageProps) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const toggleCreateCategory = () => {
    setIsCreatingCategory((prev) => !prev);
  };

  if (!categories || categories.length === 0) {
    return <div>No categories available. Please create one first.</div>;
  }

  return (
    <Container maw={500}>
      <h2>{isCreatingCategory ? "Create a New Category" : "Select a Category for This Task List"}</h2>
      <Stack gap={8}>
        {!isCreatingCategory ? (
          <SelectCategory categories={categories} toggleCreateCategory={toggleCreateCategory} />
        ) : (
          <CreateCategoryCard toggleCreateCategory={toggleCreateCategory} />
        )}
      </Stack>
    </Container>
  );
}

export default AssignTaskListPage;
