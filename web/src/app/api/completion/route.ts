import { StreamingTextResponse, streamText } from "ai";
import { groq } from "@/server/utils/groq";

export async function POST(req: Request) {
  const { prompt, language } = (await req.json()) as {
    prompt: string;
    language: string;
  };

  const SYSTEM_PROMPT = `The user will describe a program. Write the program using ${language} code based on the user's input. Respond only with the code. No explanations or other information. Only code. Don't include the backticks in the start and end of the code block.`;

  const result = await streamText({
    model: groq("llama3-8b-8192"),
    system: SYSTEM_PROMPT,
    prompt,
  });

  return new StreamingTextResponse(result.toAIStream());
}
