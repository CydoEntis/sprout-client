import { Button, Group, Stack, Title } from "@mantine/core";
import TaskListTabs from "./features/task-list-tabs/TaskListTabs";

import useAuthStore from "./stores/useAuthStore";
import FarmProgress from "./features/farm/FarmProgress";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "./features/task-list/CreateTaskListModal";
import { Plus } from "lucide-react";
import NewListCategoryModal from "./features/categories/NewListCategoryModal";
import { useGetAllCategories } from "./features/list-category/shared/category.queries";
import CategoryCard from "./features/categories/CategoryCard";
import GridList from "./components/GridList";
import { refreshTokens } from "./api/services/auth.services";
import localStorageService from "./services/localStorage.service";

function App() {
  const { user } = useAuthStore();




  if (!user && isPending) return <div>Loading...</div>;
  if (isPending) return <div>Loading...</div>;

  return (
    <>


      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user?.username}</Title>
        <FarmProgress />
      </Stack>

      {/* <TaskListTabs onOpenNewList={onOpenNewList} /> */}
    </>
  );
}

export default App;
