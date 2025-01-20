import { z } from "zod";
import { loginSchema, registerSchema } from "./auth.schemas";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export type AuthenticatedResponse = {
  accessToken: string;
};
