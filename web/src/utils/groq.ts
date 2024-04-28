import Groq from "groq-sdk";
import { env } from "./env";

export const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});
