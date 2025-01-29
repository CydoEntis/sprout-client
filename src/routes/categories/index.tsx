import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import CategoriesPage from "../../pages/CategoriesPage";
import { getAllCategories } from "../../api/services/category.services";
import useLoadingManagerStore from "../../stores/useLoadingManagerStore";

export const Route = createFileRoute("/categories/")({
  loader: async () => {
    return await getAllCategories();
  },
  component: CategoriesRoute,
  pendingComponent: () => <div>Loading...</div>,
});

function CategoriesRoute() {
  const setNumOfSkeletons = useLoadingManagerStore(
    (state) => state.setNumOfSkeletons
  );
  const categories = useLoaderData({
    from: "/categories/",
  });

  categories.forEach((category) => {
    console.log(category);

    setNumOfSkeletons(
      category.categoryName.toLowerCase(),
      category.taskListCount
    );
  });


  return <CategoriesPage categories={categories} />;
}
