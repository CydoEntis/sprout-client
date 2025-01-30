import * as React from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { MantineProvider, Text } from "@mantine/core";
import theme from "../components/theme/theme.config";
import Layout from "../components/layout/Layout";
import { jwtDecode } from "jwt-decode";
import useAuthStore, { AuthState } from "../stores/useAuthStore";
import { DecodedToken } from "../features/auth/shared/auth.types";
import { Notifications } from "@mantine/notifications";
import { QueryClient } from "@tanstack/react-query";

export type RouterContext = {
  authState: AuthState;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return <Text>Not found</Text>;
  },
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
          tokenExpiration: decodedToken.exp,
        });
      }
    } else {
      useAuthStore.getState().logoutUser();
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
