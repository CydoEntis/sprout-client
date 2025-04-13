import { ActionIcon, MantineColor, Menu, MenuProps } from "@mantine/core";
import { Edit2, MoreVertical, MoreHorizontal, Trash2 } from "lucide-react";

type LazyEditDeleteMenuProps = {
  direction?: "horizontal" | "vertical";
  onUpdate: () => void;
  onDelete: () => void;
  dropdownColor?: MantineColor;
  withBorder?: boolean;
  withShadow?: boolean;
} & MenuProps;

function LazyEditDeleteMenu({
  direction = "vertical",
  onUpdate,
  onDelete,
  dropdownColor,
  withBorder = false,
  withShadow = false,
  ...rest
}: LazyEditDeleteMenuProps) {
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
    <Menu {...rest}>
      <Menu.Target>
        <ActionIcon
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          color="inverse"
        >
          {direction === "horizontal" ? <MoreHorizontal size={20} /> : <MoreVertical size={20} />}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown
        bg={dropdownColor}
        style={{
          border: withBorder ? "" : "none",
          boxShadow: withShadow ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
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

export default LazyEditDeleteMenu;
