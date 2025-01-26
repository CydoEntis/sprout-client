import { ActionIcon, Menu } from "@mantine/core";
import { Edit2, Settings, Trash2 } from "lucide-react";

type UpdateAndDeleteMenuProps = {
  onUpdate: () => void;
  onDelete: () => void;
};

function UpdateAndDeleteMenu({ onUpdate, onDelete }: UpdateAndDeleteMenuProps) {
  const updateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onUpdate();
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  };

  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon
          style={{
            zIndex: 100,
            position: "absolute",
            right: "2%",
            top: "5%",
          }}
          variant="light"
          color="lime"
        >
          <Settings size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<Edit2 size={14} />} onClick={updateHandler}>
          Edit
        </Menu.Item>
        <Menu.Item leftSection={<Trash2 size={14} />} onClick={deleteHandler}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UpdateAndDeleteMenu;
