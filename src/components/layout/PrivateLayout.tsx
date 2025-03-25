import { ActionIcon, AppShell, Burger, Button, Flex, NavLink, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Plus, Settings2, ShoppingBag } from "lucide-react";
import CreateTaskListModal from "../../features/tasks/components/create-task-list/CreateTaskListModal";
import { useGetAllCategories } from "../../features/category/services/get-all-categories.service";

import styles from "./navlink.module.css";

function PrivateLayout() {
  const [opened, { toggle }] = useDisclosure();
  const [isCreateTaskListModalOpened, { open: onOpenCreateTaskListModal, close: onCloseCreateTaskListModal }] =
    useDisclosure(false);

  const { data: categories, isLoading } = useGetAllCategories();
  const matchRoute = useMatchRoute();

  return (
    <AppShell navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }} padding="md" withBorder={false}>
      {/* Floating Burger when Navbar is closed */}
      {!opened && (
        <div
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1000,
            padding: "5px",
          }}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </div>
      )}

      <AppShell.Navbar bg="primary">
        <AppShell.Section>
          {opened && (
            <div style={{ padding: "10px" }}>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            </div>
          )}
          Navbar header
        </AppShell.Section>

        <AppShell.Section p="md" grow my="md" component={ScrollArea}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            categories?.map((category) => {
              const isActive = matchRoute({ to: `/task-list/${category.id}` as "/task-list/$taskListId" });

              return (
                <NavLink
                  component={Link}
                  key={category.id}
                  label={category.name}
                  leftSection={<ShoppingBag size={20} />}
                  childrenOffset={28}
                  active={!!isActive}
                  to={`/task-list/${category.id}`}
                  color="gray"
                  className={styles.navlink}
                />
              );
            })
          )}
        </AppShell.Section>
        <AppShell.Section style={{ borderTop: "1px solid var(--border-color)" }}>
          <Flex justify="space-between" align="center" p="md">
            <Button leftSection={<Plus size={20} />} variant="subtle" color="white" onClick={onOpenCreateTaskListModal}>
              New List
            </Button>
            <ActionIcon variant="subtle" color="white">
              <Settings2 size={20} />
            </ActionIcon>
          </Flex>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg="secondary" style={{ paddingTop: "50px" }}>
        {/* Add padding to prevent content overlap */}
        <CreateTaskListModal isOpen={isCreateTaskListModalOpened} onClose={onCloseCreateTaskListModal} />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default PrivateLayout;
