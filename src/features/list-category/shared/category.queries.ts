import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../api/services/category.services";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories", "list"],
    queryFn: () => getAllCategories(),
  });
};
