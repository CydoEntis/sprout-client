import { Flex } from "@mantine/core";
import { LazyValidIcon } from "./lazy-icon-picker.types";

type LazySelectableIcon = {
  icon: LazyValidIcon;
  selectionColor: string;
  selectedIcon: LazyValidIcon;
  onSelect: (icon: LazyValidIcon) => void;
};

function LazySelectableIcon({ icon, selectedIcon, onSelect, selectionColor }: LazySelectableIcon) {
  return (
    <Flex
      key={icon.id}
      pos="relative"
      h={35}
      w={35}
      align="center"
      justify="center"
      style={{
        borderRadius: "8px",
        cursor: "pointer",
        border: selectedIcon.id === icon.id ? `2px solid ${selectionColor}` : "2px solid transparent",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => onSelect(icon)}
    >
      {icon.icon}
    </Flex>
  );
}

export default LazySelectableIcon;
