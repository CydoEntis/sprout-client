import {
  ShoppingBag,
  Users2,
  Briefcase,
  Dumbbell,
  HeartPulse,
  ShoppingBasket,
  ShoppingCart,
  Plane,
  MapPinned,
  Receipt,
  Banknote,
  HandCoins,
  MessagesSquare,
  House,
  SprayCan,
  RollerCoaster,
  FerrisWheel,
  Drama,
  Theater,
  Film,
  University,
  Book,
  SquareLibrary,
  Building,
  Building2,
} from "lucide-react";
import { CategoryIcon } from "./category.types";

export const categoryIcons: CategoryIcon[] = [
  // Shopping
  { id: 1, name: "shopping-bag", icon: <ShoppingBag /> },
  { id: 2, name: "shopping-basket", icon: <ShoppingBasket /> },
  { id: 3, name: "shopping-cart", icon: <ShoppingCart /> },

  // Social
  { id: 4, name: "users", icon: <Users2 /> },
  { id: 5, name: "messages-square", icon: <MessagesSquare /> },

  // Travel
  { id: 6, name: "plane", icon: <Plane /> },
  { id: 7, name: "map-pinned", icon: <MapPinned /> },

  // Financial
  { id: 8, name: "receipt", icon: <Receipt /> },
  { id: 9, name: "banknote", icon: <Banknote /> },
  { id: 10, name: "hand-coins", icon: <HandCoins /> },

  // Health
  { id: 11, name: "dumbbell", icon: <Dumbbell /> },
  { id: 12, name: "heart-pulse", icon: <HeartPulse /> },

  // Entertainment
  { id: 13, name: "roller-coaster", icon: <RollerCoaster /> },
  { id: 14, name: "ferris-wheel", icon: <FerrisWheel /> },
  { id: 15, name: "drama", icon: <Drama /> },
  { id: 16, name: "theater", icon: <Theater /> },
  { id: 17, name: "film", icon: <Film /> },

  // Personal
  { id: 18, name: "house", icon: <House /> },
  { id: 19, name: "spray-can", icon: <SprayCan /> },

  // Work
  { id: 20, name: "briefcase", icon: <Briefcase /> },
  { id: 21, name: "building", icon: <Building /> },
  { id: 22, name: "building-2", icon: <Building2 /> },

  // School
  { id: 23, name: "university", icon: <University /> },
  { id: 24, name: "book", icon: <Book /> },
  { id: 25, name: "square-library", icon: <SquareLibrary /> },
];
