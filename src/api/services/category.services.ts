import {
  CategoryResponse,
  NewCategoryRequest,
  NewCategoryResponse,
} from "../../features/list-category/shared/category.types";
import apiClient from "../apiClient";
import endpoints from "../endpoints";

export const createCategory = async (
  newCategory: NewCategoryRequest
): Promise<NewCategoryResponse> => {
  const response = (await apiClient.post(`${endpoints.category}`, newCategory))
    .data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const response = (await apiClient.get(`${endpoints.category}`)).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
