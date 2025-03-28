import LazySidebarLayout from "../../lazy-components/layouts/sidebar-layout/LazySidebarLayout";
import { useDisclosure } from "@mantine/hooks";
import SidebarFooter from "../side-bar/SidebarFooter";
import { getIconByTag } from "../category/shared/category.helpers";
import { Title } from "@mantine/core";
import { LazyNavLinkList } from "../../lazy-components/nav-link/sidebar-nav-link/lazy-sidebar-nav-link.types";
import { Calendar, Grid2x2Plus, Star } from "lucide-react";
import { useGetRecentCategories } from "../category/services/get-recent-categories.service";
import CreateTasklistWithCategoryModal from "../tasks/components/create-task-list/CreateTasklistWithCategoryModal";

function ProtectedLayout() {
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const [
    isCreateTasklistWithCategoryModalOpened,
    { open: onOpenCreateTasklistWithCategoryModal, close: onCloseCreateTasklistWithCategoryModal },
  ] = useDisclosure(false);

  const { data: categories, isLoading } = useGetRecentCategories();
  console.log(categories);

  const navList: LazyNavLinkList[] = [
    {
      links: [
        {
          label: "Today",
          to: `/task-list/today`,
          routePattern: "/task-list/today",
          icon: <Star />,
          iconColor: "#F08C00",
        },
        {
          label: "Coming Up",
          to: `/task-list/coming-up`,
          routePattern: "/task-list/coming-up",
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
          icon: getIconByTag(category.tag),
          iconColor: category.color,
          childLinks: category.recentTasklists.map((tasklist) => ({
            label: tasklist.tasklistName,
            to: `/categories/${category.name.toLocaleLowerCase()}/${tasklist.tasklistId}`,
            routePattern: "/categories/$categoryName/$tasklistId",
          })),
        })) || [],
    },
  ];

  return (
    <>
      <CreateTasklistWithCategoryModal
        isOpen={isCreateTasklistWithCategoryModalOpened}
        onClose={onCloseCreateTasklistWithCategoryModal}
      />
      <LazySidebarLayout
        logo={
          <Title size="1.45rem" c="white">
            Task Garden
          </Title>
        }
        isSidebarOpened={isSidebarOpened}
        onToggle={toggleSidebar}
        footer={<SidebarFooter onOpen={onOpenCreateTasklistWithCategoryModal} />}
        navList={navList}
        isLoading={isLoading}
        navLinkColor="gray"
        childActiveColor="lime"
      />
    </>
  );
}

export default ProtectedLayout;
