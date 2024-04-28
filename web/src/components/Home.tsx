"use client";
import { api } from "@/trpc/react";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

export function Home() {
  const [previousPrompt, setPreviousPrompt] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string>("");
  const getGroqResultMutation = api.groq.getGroqResult.useMutation();

  const promptRef = useRef("");
  const previousPromptRef = useRef("");

  // keeps the promptRef.current in sync with the prompt state
  useEffect(() => {
    promptRef.current = prompt;
  }, [prompt]);

  // useEffect for running the interval
  useEffect(() => {
    const interval = setInterval(() => {
      const prompt = promptRef.current;
      const previousPrompt = previousPromptRef.current;

      if (prompt === previousPrompt) {
        return;
      }

      // Update the previous prompt with the current
      previousPromptRef.current = prompt;

      getGroqResultMutation.mutate(
        { prompt },
        {
          onSuccess: (d) => {
            setResult(d.result);
          },
        },
      );
    }, 1000); // Interval set to run every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to set up the interval once

  return (
    <div className="grid h-screen w-screen grid-cols-2 gap-8 p-12">
      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded bg-zinc-700 p-2 text-zinc-200"
          rows={5}
          autoFocus={true}
        />
      </div>
      <CodeEditor
        value={result}
        language="python"
        disabled={true}
        padding={15}
        style={{
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
        data-color-mode="dark"
      />
    </div>
  );
}
