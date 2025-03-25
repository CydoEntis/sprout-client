import { ActionIcon, AppShell, Burger, Button, Flex, Group, NavLink, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "@tanstack/react-router";
import { Plus, Settings2, ShoppingBag } from "lucide-react";
import CreateTaskListModal from "../../features/tasks/components/create-task-list/CreateTaskListModal";
import { useGetAllCategories } from "../../features/category/services/get-all-categories.service";

function PrivateLayout() {
  const [opened, { toggle }] = useDisclosure();
  const [isCreateTaskListModalOpened, { open: onOpenCreateTaskListModal, close: onCloseCreateTaskListModal }] =
    useDisclosure(false);

  const { data: categories, isLoading } = useGetAllCategories();

  console.log(categories);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header bg="primary">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar bg="primary">
        <AppShell.Section>Navbar header</AppShell.Section>
        <AppShell.Section p="md" grow my="md" component={ScrollArea}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            categories?.map((category) => (
              <NavLink
                key={category.id} 
                label={category.name}
                leftSection={<ShoppingBag size={20} />}
                childrenOffset={28}
              />
            ))
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
      <AppShell.Main bg="secondary">
        <CreateTaskListModal isOpen={isCreateTaskListModalOpened} onClose={onCloseCreateTaskListModal} />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default PrivateLayout;
