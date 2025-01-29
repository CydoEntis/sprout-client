import { createFileRoute, useParams } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "../../features/task-list/CreateTaskListModal";

import useLoadingManagerStore from "../../stores/useLoadingManagerStore";
import GridList from "../../components/GridList";
import InProgressTaskListCard from "../../features/task-list/InProgressTaskListCard";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getAllTaskListsByCategory } from "../../api/services/task-list.services";
import { queryClient } from "../../main";

const getAllCategoriesQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ["categories", category],
    queryFn: () => getAllTaskListsByCategory(category),
    enabled: !!category,
  });

export const Route = createFileRoute("/categories/$categoryName")({
  loader: async ({ params }) => {
    return queryClient.ensureQueryData(
      getAllCategoriesQueryOptions(params.categoryName)
    );
  },
  component: () => <TaskListPage />,
  pendingComponent: () => <div>Loading...</div>,
});

function TaskListPage() {
  const { categoryName } = useParams({ from: "/categories/$categoryName" });
  const { data: taskLists } = useSuspenseQuery(
    getAllCategoriesQueryOptions(categoryName)
  );

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  const { skeletonCounts } = useLoadingManagerStore();

  console.log(skeletonCounts);

  return (
    <>
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
