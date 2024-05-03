import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  GROQ_API_KEY: z.string(),
  MODEL : z.string(),
});

export const env = envSchema.parse(process.env);
