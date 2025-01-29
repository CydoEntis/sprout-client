import { createFileRoute, useParams } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "../../features/task-list/CreateTaskListModal";

import useLoadingManagerStore from "../../stores/useLoadingManagerStore";
import GridList from "../../components/GridList";
import InProgressTaskListCard from "../../features/task-list/InProgressTaskListCard";
import { useSuspenseQuery } from "@tanstack/react-query";

import { queryClient } from "../../main";
import { getAllTaskListsInCategoryQueryOptions } from "../../features/task-list/shared/task-list.queries";
import WelcomeHeader from "../../components/headers/WelcomeHeader";
import FarmProgress from "../../features/farm/FarmProgress";
import useAuthStore from "../../stores/useAuthStore";

export const Route = createFileRoute("/categories/$categoryName")({
  loader: async ({ params }) => {
    return queryClient.ensureQueryData(
      getAllTaskListsInCategoryQueryOptions(params.categoryName)
    );
  },
  component: () => <TaskListPage />,
  pendingComponent: () => <div>Loading...</div>,
});

function TaskListPage() {
  const { categoryName } = useParams({ from: "/categories/$categoryName" });
  const { data: taskLists } = useSuspenseQuery(
    getAllTaskListsInCategoryQueryOptions(categoryName)
  );
  const user = useAuthStore((state) => state.user);

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  const { skeletonCounts } = useLoadingManagerStore();

  console.log(skeletonCounts);

  return (
    <>
      <WelcomeHeader username={user!.username} />
      <FarmProgress />
      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      <GridList>
        {taskLists.map((taskList) => (
          <InProgressTaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </GridList>

      {/* <TaskListTabs onOpenNewList={onOpenNewList} taskLists={taskLists} /> */}
    </>
  );
}
