import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { LogoutResponse } from "../shared/auth.types";

export const logoutUser = async (): Promise<LogoutResponse> => {
  return apiRequest<LogoutResponse>("post", `${endpoints.auth}/logout`);
};
