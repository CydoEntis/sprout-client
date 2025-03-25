import { Flex, Button, ActionIcon } from "@mantine/core";
import { Plus, Settings2 } from "lucide-react";

type SidebarFooterProps = {
  onOpen: () => void;
};

function SidebarFooter({ onOpen }: SidebarFooterProps) {
  return (
    <Flex justify="space-between" align="center" p="md">
      <Button leftSection={<Plus size={20} />} variant="subtle" color="gray" onClick={onOpen}>
        New List
      </Button>
      <ActionIcon variant="subtle" color="gray">
        <Settings2 size={20} />
      </ActionIcon>
    </Flex>
  );
}

export default SidebarFooter;
