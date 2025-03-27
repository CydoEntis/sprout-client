import LazySidebarLayout from "../../lazy-components/layouts/sidebar-layout/LazySidebarLayout";
import { useDisclosure } from "@mantine/hooks";
import SidebarFooter from "../side-bar/SidebarFooter";
import { getIconByTag } from "../category/shared/category.helpers";
import CreateCategoryModal from "../category/components/create-category.tsx/CreateCategoryModal";
import { Title } from "@mantine/core";
import { LazyNavLinkList } from "../../lazy-components/nav-link/sidebar-nav-link/lazy-sidebar-nav-link.types";
import { Calendar, Grid2x2Plus, Star } from "lucide-react";
import { useGetRecentCategories } from "../category/services/get-recent-categories.service";

function ProtectedLayout() {
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const [isCreateTaskListModalOpened, { open: onOpenCreateTaskListModal, close: onCloseCreateTaskListModal }] =
    useDisclosure(false);

  const { data: categories, isLoading } = useGetRecentCategories();

  const navList: LazyNavLinkList[] = [
    {
      links: [
        {
          label: "Today",
          to: `/category/shopping`,
          routePattern: "/category/$categoryName", 
          icon: <Star />,
          iconColor: "#F08C00",
        },
        {
          label: "Coming Up",
          to: `/category/shopping`,
          routePattern: "/category/$categoryName", 
          icon: <Calendar />,
          iconColor: "#E03131",
        },
        {
          label: "Categories",
          to: `/categories`,
          routePattern: "/categories", 
          icon: <Grid2x2Plus />,
          iconColor: "#66a80f",
        },
      ],
    },
    {
      sectionTitle: "Recent Categories",
      links:
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
        })) || [],
    },
  ];

  return (
    <>
      <CreateCategoryModal opened={isCreateTaskListModalOpened} onClose={onCloseCreateTaskListModal} />
      <LazySidebarLayout
        logo={
          <Title size="1.45rem" c="white">
            Task Garden
          </Title>
        }
        isSidebarOpened={isSidebarOpened}
        onToggle={toggleSidebar}
        footer={<SidebarFooter onOpen={onOpenCreateTaskListModal} />}
        navList={navList}
        isLoading={isLoading}
        navLinkColor="gray"
        childActiveColor="lime"
      />
    </>
  );
}

export default ProtectedLayout;
