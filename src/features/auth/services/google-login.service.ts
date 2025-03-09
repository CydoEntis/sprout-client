import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import localStorageService from "../../../services/localStorage.service";
import useAuthStore from "../../../stores/useAuthStore";
import { AuthenticatedResponse, DecodedToken, GoogleLogin } from "../shared/auth.types";

const loginUserWithGoogle = async (credentials: GoogleLogin): Promise<AuthenticatedResponse> => {
  return apiRequest<AuthenticatedResponse>("post", `${endpoints.auth}/google-login`, credentials);
};

export function useGoogleLogin() {
  return useMutation({
    mutationFn: async (credentials: GoogleLogin): Promise<AuthenticatedResponse> => {
      return await loginUserWithGoogle(credentials);
    },
    onSuccess: (data) => {
      const decodedToken = jwtDecode<DecodedToken>(data.accessToken);

      const taskGarden = {
        isAuthenticated: true,
        accessToken: data.accessToken,
      };

      const user = {
        id: decodedToken.userId,
        username: decodedToken.sub,
        email: decodedToken.email,
        role: "Admin",
        tokenExpiration: decodedToken.exp,
      };

      useAuthStore.getState().loginUser(user, data.accessToken);

      console.log(useAuthStore.getState().isAuthenticated);

      localStorageService.setItem("taskgarden", taskGarden);

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (error) => {
      console.log("GOOGLE ERROR: ", error);

      notifications.show({
        title: "Login Failed",
        message: error.message,
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}
