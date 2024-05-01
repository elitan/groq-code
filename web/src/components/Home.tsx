"use client";
import { api } from "@/trpc/react";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

export function Home() {
  const examples = [
    "Write a program that prints 'Hello, World!'",
    "Create a script that takes two numbers and an operator (+, -, *, /) as input and prints the result of the operation.",
    "Develop a program where the computer randomly selects a number between 1 and 100, and the user has to guess it. The program should give feedback if the guess is too high or too low.",
    "Write a script that converts temperatures from Fahrenheit to Celsius and vice versa, based on user input.",
    "Create a simple command-line to-do list app where a user can add tasks, remove tasks, and view the list of tasks.",
    "Develop a simple text-based adventure game where the player can choose different paths with predefined outcomes.",
    "Write a script that organizes files in a directory into subfolders based on file extension.",
    "Create a script that fetches and prints the headlines from a news website.",
    "Develop a small application that allows users to add, edit, delete, and view records stored in a SQLite database.",
    "Write a script for a simple chatbot that can respond to predefined questions with predefined answers.",
  ];
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

      if (prompt === "") {
        setResult("");
        return;
      }

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
    <div className="w-screen p-8">
      <div className="grid w-full grid-cols-2 gap-8">
        <div>
          <div>
            <textarea
              placeholder="Write what the program should do here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded border border-zinc-600 bg-zinc-800 p-2 text-zinc-200"
              rows={3}
              autoFocus={true}
            />
            <div className="flex items-center justify-between py-2 text-xs text-zinc-500">
              <div>
                {/* <Select name="status">
                  <option value="active">Active</option>
                </Select> */}
              </div>
              <div>
                Powered by{" "}
                <a
                  href="https://groq.com/"
                  className="hover:underline"
                  target="_blank"
                >
                  Groq
                </a>{" "}
                and{" "}
                <a
                  href="https://llama.meta.com/llama3/"
                  className="hover:underline"
                  target="_blank"
                >
                  LLaMA 3
                </a>
              </div>
            </div>
          </div>
          <div className="my-4 h-[1px] bg-gray-800" />
          <div className="grid grid-cols-2 gap-4 py-4">
            {examples.splice(0, 4).map((example, i) => {
              return (
                <div
                  key={i}
                  className="cursor-pointer rounded-md border border-zinc-600 bg-zinc-900 p-3 text-xs text-zinc-400 transition-all duration-150 ease-in-out hover:bg-zinc-800"
                  onClick={() => {
                    setPrompt(example);
                  }}
                >
                  {example}
                </div>
              );
            })}
          </div>
        </div>
        <div>
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
      </div>
      <div className="flex justify-between pt-6 text-center text-sm text-zinc-500">
        <div>
          By Johan (
          <a
            href="https://x.com/elitasson"
            target="_blank"
            className="underline"
          >
            𝕏
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/j4e/"
            target="_blank"
            className="underline"
          >
            LinkedIn
          </a>
          ){" "}
        </div>
        <div>
          Open source at{" "}
          <a
            href="https://github.com/elitan/groq-code"
            target="_blank"
            className="underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
