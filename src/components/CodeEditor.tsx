"use client";

import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AlertCircleIcon, BookIcon, LightbulbIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<"javascript" | "python" | "java">(
    LANGUAGES[0].id
  );

  const [code, setCode] = useState(selectedQuestion.starterCode[language]);

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLanguageChange = (
    newLanguage: "javascript" | "python" | "java"
  ) => {
    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };

  return (
    <ResizablePanelGroup
      className="min-h-[calc(100vh-4rem-1px)] bg-gradient-to-b from-background/95 to-background"
      direction="vertical"
    >
      <ResizablePanel defaultSize={50}>
        <ScrollArea className="h-full bg-background/30 backdrop-blur-sm">
          <div className="p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background/60 p-4 rounded-xl shadow-sm border border-border/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight font-comfortaa bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                      {selectedQuestion.title}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose your language and solve the problem
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedQuestion.id}
                    onValueChange={handleQuestionChange}
                  >
                    <SelectTrigger className="w-[180px] border-border/30 bg-background/80 hover:bg-background/95 transition-colors">
                      <SelectValue placeholder="Select question" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-md border-border/30">
                      {CODING_QUESTIONS.map((q) => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[150px] border-border/30 bg-background/80 hover:bg-background/95 transition-colors">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <img
                            src={`/${language}.png`}
                            alt={language}
                            className="w-5 h-5 object-contain"
                          />
                          {LANGUAGES.find((l) => l.id === language)?.name}
                        </div>
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-background/95 backdrop-blur-md border-border/30">
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          <div className="flex items-center gap-2">
                            <img
                              src={`/${lang.id}.png`}
                              alt={lang.name}
                              className="w-5 h-5 object-contain"
                            />
                            {lang.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="border-border/30 shadow-md hover:shadow-lg transition-shadow bg-background/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-2 pb-3 border-b border-border/10">
                  <BookIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="font-comfortaa">Problem Description</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 text-sm leading-relaxed">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">
                      {selectedQuestion.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/30 shadow-md hover:shadow-lg transition-shadow bg-background/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-2 pb-3 border-b border-border/10">
                  <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="font-comfortaa">Examples</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ScrollArea className="h-full w-full rounded-md border border-border/30 bg-background/40">
                    <div className="p-4 space-y-4">
                      {selectedQuestion.examples.map((example, index) => (
                        <div key={index} className="space-y-2">
                          <p className="font-medium text-sm text-primary/90">
                            Example {index + 1}:
                          </p>
                          <ScrollArea className="h-full w-full rounded-md">
                            <pre className="bg-muted/70 p-3 rounded-lg text-sm font-mono shadow-sm">
                              <div className="text-blue-400/90">Input: <span className="text-foreground/90">{example.input}</span></div>
                              <div className="text-green-500/90">Output: <span className="text-foreground/90">{example.output}</span></div>
                              {example.explanation && (
                                <div className="pt-2 text-muted-foreground">
                                  <span className="text-yellow-500/90">Explanation:</span> {example.explanation}
                                </div>
                              )}
                            </pre>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      ))}
                    </div>
                    <ScrollBar />
                  </ScrollArea>
                </CardContent>
              </Card>

              {selectedQuestion.constraints && (
                <Card className="border-border/30 shadow-md hover:shadow-lg transition-shadow bg-background/60 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center gap-2 pb-3 border-b border-border/10">
                    <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                    <CardTitle className="font-comfortaa">Constraints</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-primary/60">
                      {selectedQuestion.constraints.map((constraint, index) => (
                        <li key={index} className="text-muted-foreground">
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-border/40 hover:bg-primary/30 transition-colors" />

      <ResizablePanel defaultSize={50} minSize={30} className="border-t border-border/30">
        <div className="h-full relative bg-zinc-900/95">
          <div className="absolute top-0 left-0 right-0 bg-zinc-800/70 p-2.5 flex justify-between items-center z-10 border-b border-border/30">
            <span className="text-xs font-medium text-zinc-300 px-1.5">
              {language === "javascript" ? "JavaScript" : language === "python" ? "Python" : "Java"} Editor
            </span>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
              <span className="text-xs text-zinc-400">Ready</span>
            </div>
          </div>
          <div className="pt-[2.5rem] h-full">
            <Editor
              height={"100%"}
              defaultLanguage={language}
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: true },
                fontSize: 16,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                wordWrap: "on",
                wrappingIndent: "indent",
                fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, 'Courier New', monospace",
                fontLigatures: true,
                renderLineHighlight: "all",
              }}
              className="editor-container"
            />
          </div>
        </div>
      </ResizablePanel>
      
    </ResizablePanelGroup>
  );
}

export default CodeEditor;
