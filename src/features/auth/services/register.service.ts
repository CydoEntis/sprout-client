import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";

import { RegisterRequest, AuthenticatedResponse } from "../shared/auth.types";

const registerUser = async (credentials: RegisterRequest): Promise<AuthenticatedResponse> => {
  return apiRequest<AuthenticatedResponse>("post", `${endpoints.auth}/register`, credentials);
};

//TODO: Implement this correctly in the future

// export function useRegister() {
//   const { loginUser } = useAuthStore();
//   const { setUserId } = useUserStore();

//   return useMutation({
//     mutationFn: async (credentials: RegisterRequest): Promise<AuthenticatedResponse> => {
//       return await authService.registerUser(credentials);
//     },
//     onSuccess: (data) => {
//       loginUser();
//       setUserId(data.userId);
//       const questbound = { isAuthenticated: true, userId: data.userId };

//       localStorageService.setItem("questbound", questbound);

//       notifications.show({
//         title: "Success",
//         message: data.message,
//         color: "lime",
//         position: "top-right",
//       });
//     },
//     onError: (error: Error) => {
//       notifications.show({
//         title: "Login Failed",
//         message: "Something went wrong!",
//         color: "red",
//         position: "top-right",
//       });
//       throw error;
//     },
//   });
// }
