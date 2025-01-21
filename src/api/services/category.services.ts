import {
  NewCategoryRequest,
  NewCategoryResponse,
} from "../../features/list-category/shared/category.types";
import apiClient from "../apiClient";
import endpoints from "../endpoints";

export const createCategory = async (
  newCategory: NewCategoryRequest
): Promise<NewCategoryResponse> => {
  console.log("newCategory: ", newCategory);

  const response = (await apiClient.post(`${endpoints.category}`, newCategory))
    .data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
