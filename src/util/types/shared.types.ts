export type Paginated<T> = {
  items: T[];
  page: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage?: number | null;
  previousPage?: number | null;
};

export type PaginationParams = {
  page?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
};