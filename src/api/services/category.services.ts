import apiClient from "../apiClient";
import endpoints from "../endpoints";

type NewCategoryRequest = {
  name: string;
  tag: string;
};

type NewCategoryResponse = {
  message: string;
};

export const registerUser = async (
  credentials: NewCategoryRequest
): Promise<NewCategoryResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/register`, credentials)
  ).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
