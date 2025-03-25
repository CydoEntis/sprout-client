import { categoryIcons } from "./category.constants";

export const getIconByTag = (tag: string) => {
  const category = categoryIcons.find((category) => category.tag === tag);
  return category ? category.icon : null; 
};
