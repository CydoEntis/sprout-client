import { NewCategoryResponse } from "../../features/list-category/shared/category.types";
import apiClient from "../apiClient";
import endpoints from "../endpoints";

type NewCategoryRequest = {
  name: string;
  tag: string;
};

export const createCategory = async (
  newCategory: NewCategoryRequest
): Promise<NewCategoryResponse> => {
  const response = (
    await apiClient.post(`${endpoints.categories}`, newCategory)
  ).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
