import * as React from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { MantineProvider, Text } from "@mantine/core";
import theme from "../components/theme/theme.config";
import { jwtDecode } from "jwt-decode";
import useAuthStore, { AuthState } from "../stores/useAuthStore";
import { Notifications } from "@mantine/notifications";
import { QueryClient } from "@tanstack/react-query";
import { DecodedToken } from "../features/auth/shared/auth.types";
import PrivateLayout from "../components/layout/PrivateLayout";
import LazyHorizontalLayout from "../lazy-components/layouts/horizontal-layout/LazyHorizontalLayout";
import Layout from "../components/layout/Layout";

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
  const { loginUser, isAuthenticated } = useAuthStore();

  React.useEffect(() => {
    const taskGardenData = localStorage.getItem("taskgarden");

    if (taskGardenData) {
      const parsedData = JSON.parse(taskGardenData);

      if (parsedData?.accessToken) {
        const decodedToken = jwtDecode<DecodedToken>(parsedData.accessToken);
        const user = {
          id: decodedToken.userId,
          username: decodedToken.sub,
          email: decodedToken.email,
          role: "Admin",
          tokenExpiration: decodedToken.exp,
        };
        loginUser(user, parsedData.accessToken);
      }
    } else {
      useAuthStore.getState().logoutUser();
    }
  }, [loginUser]);

  console.log(isAuthenticated)

  return (
    <React.Fragment>
      <MantineProvider theme={theme}>
        <Notifications />
        {isAuthenticated ? <PrivateLayout /> : <Layout />}
      </MantineProvider>
    </React.Fragment>
  );
}
