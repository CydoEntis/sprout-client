import * as React from "react";
import { createRootRoute } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import theme from "../components/theme/theme.config";
import Layout from "../components/layout/Layout";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../stores/useAuthStore";
import { DecodedToken } from "../features/auth/shared/auth.types";
import { Notifications } from "@mantine/notifications";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { setUser, setAccessToken } = useAuthStore();

  React.useEffect(() => {
    const taskGardenData = localStorage.getItem("taskgarden");

    if (taskGardenData) {
      const parsedData = JSON.parse(taskGardenData);

      if (parsedData?.accessToken) {
        const decodedToken = jwtDecode<DecodedToken>(parsedData.accessToken);

        setAccessToken(parsedData.accessToken);
        setUser({
          id: decodedToken.userId,
          username: decodedToken.sub,
          email: decodedToken.email,
          role: "Admin",
        });
      }
    }
  }, [setAccessToken, setUser]);

  return (
    <React.Fragment>
      <MantineProvider theme={theme}>
        <Notifications />
        <Layout />
      </MantineProvider>
    </React.Fragment>
  );
}
