import LazySidebarLayout from "../../lazy-components/layouts/sidebar-layout/LazySidebarLayout";
import { useDisclosure } from "@mantine/hooks";
import SidebarFooter from "../side-bar/SidebarFooter";
import { useGetAllCategories } from "../category/services/get-all-categories.service";
import { getIconByTag } from "../category/shared/category.helpers";
import CreateCategoryModal from "../category/components/create-category.tsx/CreateCategoryModal";

function ProtectedLayout() {
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const [isCreateTaskListModalOpened, { open: onOpenCreateTaskListModal, close: onCloseCreateTaskListModal }] =
    useDisclosure(false);

  const { data: categories, isLoading } = useGetAllCategories();

  console.log(categories);

  const links =
    categories?.map((category) => ({
      label: category.name,
      to: `/category/${category.name.toLocaleLowerCase()}`,
      // routePattern: "/category/$categoryName",
      icon: getIconByTag(category.tag),
      iconColor: category.color,
      childLinks: category.recentTaskLists.map((taskList) => ({
        label: taskList.taskListName, 
        to: `/category/${category.name.toLocaleLowerCase()}/${taskList.taskListId}`,
        routePattern: "/category/$categoryName/$taskListId",
      })),
    })) || [];

  return (
    <>
      <CreateCategoryModal opened={isCreateTaskListModalOpened} onClose={onCloseCreateTaskListModal} />
      <LazySidebarLayout
        isSidebarOpened={isSidebarOpened}
        onToggle={toggleSidebar}
        footer={<SidebarFooter onOpen={onOpenCreateTaskListModal} />}
        links={links}
        isLoading={isLoading}
        navLinkColor="gray"
      />
    </>
  );
}

export default ProtectedLayout;
