import { useState } from "react";
import { Box, Text, SimpleGrid, Stack } from "@mantine/core";
import {
  Banknote,
  Book,
  Briefcase,
  Building,
  Building2,
  Drama,
  Dumbbell,
  FerrisWheel,
  Film,
  HandCoins,
  HeartPulse,
  House,
  MapPinned,
  MessagesSquare,
  Plane,
  Receipt,
  RollerCoaster,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  SprayCan,
  SquareLibrary,
  Theater,
  University,
  Users2,
} from "lucide-react";
import SelectableCategoryIcon from "./SelectableCategoryIcon";

export type CategoryIcon = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const categoryIcons = [
  { id: 1, name: "shopping-bag", icon: <ShoppingBag /> },
  { id: 2, name: "users", icon: <Users2 /> },
  { id: 3, name: "briefcase", icon: <Briefcase /> },
  { id: 4, name: "dumbbell", icon: <Dumbbell /> },
  { id: 5, name: "heart-pulse", icon: <HeartPulse /> },
  { id: 6, name: "shopping-basket", icon: <ShoppingBasket /> },
  { id: 7, name: "shopping-cart", icon: <ShoppingCart /> },
  { id: 8, name: "plane", icon: <Plane /> },
  { id: 9, name: "map-pinned", icon: <MapPinned /> },
  { id: 10, name: "receipt", icon: <Receipt /> },
  { id: 11, name: "banknote", icon: <Banknote /> },
  { id: 12, name: "hand-coins", icon: <HandCoins /> },
  { id: 13, name: "messages-square", icon: <MessagesSquare /> },
  { id: 14, name: "house", icon: <House /> },
  { id: 15, name: "spray-can", icon: <SprayCan /> },
  { id: 16, name: "roller-coaster", icon: <RollerCoaster /> },
  { id: 17, name: "ferris-wheel", icon: <FerrisWheel /> },
  { id: 18, name: "drama", icon: <Drama /> },
  { id: 19, name: "theater", icon: <Theater /> },
  { id: 20, name: "film", icon: <Film /> },
  { id: 21, name: "university", icon: <University /> },
  { id: 22, name: "book", icon: <Book /> },
  { id: 23, name: "square-library", icon: <SquareLibrary /> },
  { id: 24, name: "building", icon: <Building /> },
  { id: 25, name: "building-2", icon: <Building2 /> },
];

function CategoryIconPicker() {
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>({
    id: 1,
    name: "shopping-bag",
    icon: <ShoppingBag />,
  });

  const handleIconClick = (selectedIcon: CategoryIcon) => {
    setSelectedIcon(selectedIcon);
  };

  return (
    <Stack gap={16}>
      <Text size="sm">Category Icon</Text>
      <SimpleGrid cols={5}>
        {categoryIcons.map((icon) => (
          <SelectableCategoryIcon
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
