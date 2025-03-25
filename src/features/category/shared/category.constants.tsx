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
import { LazyValidIcon } from "../../../lazy-components/icon-picker/lazy-icon-picker.types";

export const validIcons: LazyValidIcon[] = [
  // Shopping
  { id: 1, tag: "shopping-bag", icon: <ShoppingBag /> },
  { id: 2, tag: "shopping-basket", icon: <ShoppingBasket /> },
  { id: 3, tag: "shopping-cart", icon: <ShoppingCart /> },

  // Social
  { id: 4, tag: "users", icon: <Users2 /> },
  { id: 5, tag: "messages-square", icon: <MessagesSquare /> },

  // Travel
  { id: 6, tag: "plane", icon: <Plane /> },
  { id: 7, tag: "map-pinned", icon: <MapPinned /> },

  // Financial
  { id: 8, tag: "receipt", icon: <Receipt /> },
  { id: 9, tag: "banknote", icon: <Banknote /> },
  { id: 10, tag: "hand-coins", icon: <HandCoins /> },

  // Health
  { id: 11, tag: "dumbbell", icon: <Dumbbell /> },
  { id: 12, tag: "heart-pulse", icon: <HeartPulse /> },

  // Entertainment
  { id: 13, tag: "roller-coaster", icon: <RollerCoaster /> },
  { id: 14, tag: "ferris-wheel", icon: <FerrisWheel /> },
  { id: 15, tag: "drama", icon: <Drama /> },
  { id: 16, tag: "theater", icon: <Theater /> },
  { id: 17, tag: "film", icon: <Film /> },

  // Personal
  { id: 18, tag: "house", icon: <House /> },
  { id: 19, tag: "spray-can", icon: <SprayCan /> },

  // Work
  { id: 20, tag: "briefcase", icon: <Briefcase /> },
  { id: 21, tag: "building", icon: <Building /> },
  { id: 22, tag: "building-2", icon: <Building2 /> },

  // School
  { id: 23, tag: "university", icon: <University /> },
  { id: 24, tag: "book", icon: <Book /> },
  { id: 25, tag: "square-library", icon: <SquareLibrary /> },
];

export const validCategoryTags = [
  "shopping-bag",
  "shopping-basket",
  "shopping-cart",
  "users",
  "messages-square",
  "plane",
  "map-pinned",
  "receipt",
  "banknote",
  "hand-coins",
  "dumbbell",
  "heart-pulse",
  "roller-coaster",
  "ferris-wheel",
  "drama",
  "theater",
  "film",
  "house",
  "spray-can",
  "briefcase",
  "building",
  "building-2",
  "university",
  "book",
  "square-library",
] as const;

// export const categoryColors = [
//   "gray",
//   "red",
//   "pink",
//   "grape",
//   "violet",
//   "indigo",
//   "blue",
//   "cyan",
//   "teal",
//   "green",
//   "lime",
//   "yellow",
//   "orange",
// ] as const;
