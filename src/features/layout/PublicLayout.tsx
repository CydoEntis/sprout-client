import { Title } from "@mantine/core";

import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "../../stores/useAuthStore";
import LocalStorageService from "../../services/localStorage.service";
import { logoutUser } from "../auth/services/logout.service";

import HorizontalNavLinks from "../navigation/HorizontalNavLinks";
import LazyHorizontalNavbar from "../../lazy-components/nav-bar/horizontal-navbar/LazyHorizontalNavbar";
import LazyLayout from "../../lazy-components/layouts/horizontal-layout/LazyLayout";

function PublicLayout() {
  const { user, logoutUser: logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      LocalStorageService.removeItem("taskgarden");
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navbar = (
    <LazyHorizontalNavbar
      justify="space-between"
      logo={<Title size="1.5rem">Task Garden</Title>}
      navbar={<>{user ? <HorizontalNavLinks.Private onLogout={handleLogout} /> : <HorizontalNavLinks.Public />}</>}
    ></LazyHorizontalNavbar>
  );


  return <LazyLayout>{navbar}</LazyLayout>;
}

export default PublicLayout;
