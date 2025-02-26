import { z } from "zod";
import { loginSchema, registerSchema } from "./auth.schemas";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export type AuthenticatedResponse = {
  message: string;
  accessToken: string;
};

export type RefreshTokensResponse = {
  accessToken: string;
};

export type DecodedToken = {
  userId: string;
  sub: string;
  email: string;
  role: string;
  exp: number;
};

export type LogoutResponse = {
  message: string;
};
