import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../api/services/category.services";
import useLoadingManagerStore from "../../../stores/useLoadingManagerStore";

export const useGetAllCategories = () => {
  const setNumOfSkeletons = useLoadingManagerStore(
    (state) => state.setNumOfSkeletons
  );

  return useQuery({
    queryKey: ["categories", "list"],
    queryFn: async () => {
      const categories = await getAllCategories();

      categories.forEach((category) => {
        setNumOfSkeletons(
          category.categoryName.toLowerCase(),
          category.taskListCount
        );
      });

      return categories;
    },
  });
};
