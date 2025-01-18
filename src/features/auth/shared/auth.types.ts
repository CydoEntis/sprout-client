import { z } from "zod";
import { loginSchema } from "./auth.schemas";

export type LoginRequest = z.infer<typeof loginSchema>;
