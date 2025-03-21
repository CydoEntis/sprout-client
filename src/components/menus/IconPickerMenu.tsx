import { Menu, Paper, Stack, Text} from "@mantine/core";
import CategoryIconPicker from "../../features/category/components/CategoryIconPicker";
import { CategoryIcon } from "../../features/category/shared/category.types";

type IconPickerMenuProps = {
    selectedIcon: CategoryIcon;
    onIconSelect: (icon: CategoryIcon) => void; 
};

function IconPickerMenu({selectedIcon, onIconSelect}: IconPickerMenuProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Stack gap={4} justify="center" align="center" w="5%">
          <Text size="sm">Icon</Text>
          <Paper
            w={35}
            h={35}
            radius="md"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {selectedIcon.icon}
          </Paper>
        </Stack>
      </Menu.Target>
      <Menu.Dropdown>
        <CategoryIconPicker selectedIcon={selectedIcon} onIconSelect={onIconSelect} />
      </Menu.Dropdown>
    </Menu>
  );
}

export default IconPickerMenu;
