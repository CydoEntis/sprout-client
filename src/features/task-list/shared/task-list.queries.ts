import { useQuery } from "@tanstack/react-query";
import { getAllTaskListsByCategory } from "../../../api/services/task-list.services";

export const useGetAllCategories = (category: string) => {
  return useQuery({
    queryKey: ["categories", category],
    queryFn: () => getAllTaskListsByCategory(category),
    enabled: !!category,
  });
};
