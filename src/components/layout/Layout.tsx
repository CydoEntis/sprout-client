import { Title } from "@mantine/core";

import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "../../stores/useAuthStore";
import LocalStorageService from "../../services/localStorage.service";
import { logoutUser } from "../../features/auth/services/logout.service";

import HorizontalNavLinks from "../../features/navigation/HorizontalNavLinks";
import LazyHorizontalNavbar from "../../lazy-components/nav-bar/horizontal-navbar/LazyHorizontalNavbar";
import LazyHorizontalLayout from "../../lazy-components/layouts/horizontal-layout/LazyHorizontalLayout";



function Layout() {
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

  // const navbar = (
  //   <LazyVerticalNavbar
  //     justify="space-between"
  //     logo={<Title size="1.5rem">Task Garden</Title>}
  //     navbar={
  //       <>{user ? <VerticalNavigation.PrivateLinks onLogout={handleLogout} /> : <VerticalNavigation.PublicLinks />}</>
  //     }
  //     footer={<>{user ? <VerticalNavigation.Logout onLogout={handleLogout} /> : null}</>}
  //   ></LazyVerticalNavbar>
  // );

  return <LazyHorizontalLayout>{navbar}</LazyHorizontalLayout>;
}

export default Layout;
