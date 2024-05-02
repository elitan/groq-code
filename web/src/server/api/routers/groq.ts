import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { groq } from "@/utils/groq";

export const groqRouter = createTRPCRouter({
  getGroqResult: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        language: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { prompt, language } = input;

      const SYSTEM_PROMPT = `The user will describe a program. Write the program using ${language} code based on the user's input. Respond only with the code. No explanations or other information. Only code.`;

      const r = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192",
      });

      /**
       * Remove ` from the start and end of the string
       */
      const result = r.choices[0]?.message.content.replace(/^`+|`+$/g, "");

      if (!result) {
        throw new Error("No result");
      }

      return {
        result,
      };
    }),
});
