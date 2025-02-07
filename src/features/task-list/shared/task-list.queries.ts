// export const getAllTaskListsForCategoryQueryOptions = (category: string) =>
//     queryOptions({
//       queryKey: ["task-lists", category],
//       queryFn: () => getAllTaskListsForCategory(category),
//       enabled: !!category,
//     });
  
//   export const useGetAllTaskListsForCategory = (category: string) => {
//     return useQuery(getAllTaskListsForCategoryQueryOptions(category));
//   };