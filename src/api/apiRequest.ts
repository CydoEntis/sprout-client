/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "./apiClient";

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  params?: any
): Promise<T> => {
  const response = (await apiClient[method](url, params)).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
