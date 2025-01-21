import { useState } from "react";
import { Text, SimpleGrid, Stack, TextInput } from "@mantine/core";
import SelectableCategoryIcon from "./SelectableCategoryIcon";
import { CategoryIcon } from "./shared/category.types";
import { categoryIcons } from "./shared/category.constants";

function CategoryIconPicker() {
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(
    categoryIcons[0]
  );
  const [search, setSearch] = useState("");

  const handleIconClick = (icon: CategoryIcon) => {
    setSelectedIcon(icon);
  };

  const filteredIcons = categoryIcons.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack gap={16}>
      <Stack gap={2}>
        <Text size="sm">Category Icon</Text>
        <TextInput
          placeholder="Search icons..."
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </Stack>
      <SimpleGrid cols={5}>
        {filteredIcons.map((icon) => (
          <SelectableCategoryIcon
            key={icon.id}
            categoryIcon={icon}
            selectedIcon={selectedIcon}
            handleIconClick={handleIconClick}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default CategoryIconPicker;
