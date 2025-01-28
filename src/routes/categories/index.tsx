import { createFileRoute } from "@tanstack/react-router";
import CategoriesPage from "../../pages/CategoriesPage";

export const Route = createFileRoute("/categories/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoriesPage />;
}
