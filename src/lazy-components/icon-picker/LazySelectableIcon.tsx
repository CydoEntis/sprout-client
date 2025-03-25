import { Flex } from "@mantine/core";
import { ValidIcon } from "./lazy-icon-picker.types";

type LazySelectableIcon = {
  icon: ValidIcon;
  selectedIcon: ValidIcon;
  onSelect: (icon: ValidIcon) => void;
};

function LazySelectableIcon({ icon, selectedIcon, onSelect }: LazySelectableIcon) {
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
        border: selectedIcon.id === icon.id ? "2px solid #66A80F" : "2px solid transparent",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => onSelect(icon)}
    >
      {icon.icon}
    </Flex>
  );
}

export default LazySelectableIcon;
