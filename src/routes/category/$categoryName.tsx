import { createFileRoute } from '@tanstack/react-router'
import TaskListTabs from '../../features/task-list-tabs/TaskListTabs'
import { useDisclosure } from '@mantine/hooks'
import CreateTaskListModal from '../../features/task-list/CreateTaskListModal'

export const Route = createFileRoute('/category/$categoryName')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false)

  return (
    <>
      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      <TaskListTabs onOpenNewList={onOpenNewList} />
    </>
  )
}
