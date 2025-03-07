import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { RefreshTokensResponse } from "../shared/auth.types";

export const refreshTokens = async (): Promise<RefreshTokensResponse> => {
  return apiRequest<RefreshTokensResponse>("post", `${endpoints.auth}/refresh-tokens`);
};
