import { useState, useEffect } from "react";
import { Category, CreateCategory } from "../../category/shared/category.types";

export function useCategorySelection(categories: Category[]) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(categories.length === 0);
  const [newCategory, setNewCategory] = useState<CreateCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const toggleCreateCategory = () => {
    setIsCreatingCategory((prev) => {
      if (!prev) {
        setSelectedCategory(null);
      } else {
        setNewCategory(null);
      }
      return !prev;
    });
  };

  const resetCategorySelection = () => {
    setNewCategory(null);
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (categories.length === 0) {
      setIsCreatingCategory(true);
    }
  }, [categories]);

  return {
    isCreatingCategory,
    toggleCreateCategory,
    newCategory,
    setNewCategory,
    selectedCategory,
    setSelectedCategory,
    resetCategorySelection,
  };
}
