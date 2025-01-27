import { Button, Group, Stack, Title } from "@mantine/core";
import TaskListTabs from "./features/task-list-tabs/TaskListTabs";

import useAuthStore from "./stores/useAuthStore";
import FarmProgress from "./features/farm/FarmProgress";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "./features/task-list/CreateTaskListModal";
import { Plus } from "lucide-react";
import NewListCategoryModal from "./features/list-category/NewListCategoryModal";
import { useGetAllCategories } from "./features/list-category/shared/category.queries";
import CategoryCard from "./features/list-category/CategoryCard";
import TaskListGrid from "./features/task-list/TaskListGrid";
import { refreshTokens } from "./api/services/auth.services";
import localStorageService from "./services/localStorage.service";

function App() {
  const { user } = useAuthStore();
  const { data: categories, isPending } = useGetAllCategories();

  const [
    isNewCategoryOpened,
    { open: onOpenNewCategory, close: onCloseNewCategory },
  ] = useDisclosure(false);

  const refreshTokenHandler = async () => {
    const { accessToken } = await refreshTokens();
    console.log("Tokens Refreshed: ");

    localStorageService.updateItem("taskgarden", { accessToken });

    useAuthStore.getState().setAccessToken(accessToken);
  };

  if (!user && isPending) return <div>Loading...</div>;
  if (isPending) return <div>Loading...</div>;

  return (
    <>
      <NewListCategoryModal
        isNewCategoryOpened={isNewCategoryOpened}
        onCloseNewCategory={onCloseNewCategory}
      />

      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user!.username}</Title>
        <FarmProgress />
      </Stack>
      <Group justify="end">
        <Button
          variant="light"
          leftSection={<Plus size={20} />}
          color="lime"
          onClick={refreshTokenHandler}
        >
          Refresh Tokens
        </Button>
        <Button
          variant="light"
          leftSection={<Plus size={20} />}
          color="lime"
          onClick={onOpenNewCategory}
        >
          Category
        </Button>
      </Group>

      <TaskListGrid>
        {categories?.map((category) => <CategoryCard category={category} />)}
      </TaskListGrid>
      {/* <TaskListTabs onOpenNewList={onOpenNewList} /> */}
    </>
  );
}

export default App;
