"use client";

import React, { useState } from "react";
import AudioUpload from "@/components/AudioUpload";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Clipboard, Check } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Loader2 } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [generateCode, setGeneratedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [instruction, setInstruction] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setInstruction(null);
    setGeneratedCode(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        "https://shobhitkori-voice-to-code-backend.hf.space/generate-code",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to generate code.");
      const result = await res.json();
      setInstruction(result?.instruction || "Could not transcribe Audio File");
      setGeneratedCode(result?.code || "No code returned");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const handleCopy = () => {
    if (generateCode) {
      navigator.clipboard.writeText(generateCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="pt-4 pl-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
      <div className="p-4 pt-6">
        <main className="grid grid-flow-row justify-items-center gap-4">
          <h1
            style={{ fontFamily: "var(--font-vt323)" }}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold pb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            Voice To Code
          </h1>

          <AudioUpload onFileUpload={handleFileUpload} />
          {loading && (
            <div className="flex space-x-4 m-4 w-full max-w-md mx-auto">
              <p className="text-gray-500">Generating code </p>
              <Loader2 className="animate-spin text-gray-500" />
            </div>
          )}

          {error && (
            <p className="m-4 text-red-600 font-semibold w-full max-w-md mx-auto">
              Error: {error}
            </p>
          )}

          {instruction && (
            <p className="m-4 w-full max-w-md mx-auto">
              {" "}
              <span className="font-semibold">Instruction</span>: {instruction}
            </p>
          )}

          {generateCode && (
            <div className="w-full max-w-3xl bg-gray-100 dark:bg-gray-900 p-4 rounded shadow text-sm overflow-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Generated Code:</span>
                <button
                  onClick={handleCopy}
                  className="cursor-pointer text-sm px-2 py-1 transition"
                >
                  {copied ? (
                    <>
                      <Check className="inline-block mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Clipboard className="inline-block mr-1" />
                      Copy
                    </>
                  )}{" "}
                </button>
              </div>
              <code>
                <SyntaxHighlighter
                  language="python"
                  style={theme === "dark" ? oneDark : oneLight}
                  wrapLongLines={true}
                >
                  {generateCode}
                </SyntaxHighlighter>
              </code>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
