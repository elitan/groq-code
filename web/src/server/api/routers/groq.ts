import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { groq } from "@/utils/groq";

const SYSTEM_PROMPT = `The user will describe a program. Write the program using Python code based on the user's input. Respond only with the code. No explanations or other information. Only code.`;

export const groqRouter = createTRPCRouter({
  getGroqResult: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      const { prompt } = input;

      console.log("return result");
      console.log(`Hello ${prompt}`);

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

      const result = r.choices[0]?.message.content.replace(/^`+|`+$/g, "");

      if (!result) {
        throw new Error("No result");
      }

      return {
        result,
      };
    }),
});
