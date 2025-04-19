"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code2Icon,
  MessageCircle,
  Mic,
  Video,
  VideoOff,
  MicOff,
  Users,
  Share2,
  LayoutGrid,
} from "lucide-react";

function MeetingPage() {
  const params = useParams();
  const meetingId = params.id;

  // UI state for video controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeView, setActiveView] = useState<"grid" | "focus">("grid");

  return (
    <div className="container mx-auto p-0 md:p-4 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-background/80 backdrop-blur-md sticky top-0 z-10 p-4 border-b">
        <div className="flex items-center gap-2.5 mb-4 md:mb-0">
          <div className="bg-primary/15 text-primary h-10 w-10 rounded-full flex items-center justify-center">
            <Code2Icon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Interview Session</h1>
            <p className="text-sm text-muted-foreground">ID: {meetingId}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="group gap-2 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"
            onClick={() => {}}
          >
            <Share2 className="h-4 w-4 group-hover:scale-110 transition-all" />
            Share
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="transition-all"
            onClick={() => {}}
          >
            End Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 p-4">
        {/* Main video area */}
        <div className="md:col-span-2 overflow-hidden flex flex-col space-y-4">
          {/* Video display */}
          <Card className="flex-1 relative overflow-hidden bg-muted/40 border border-border/60">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-br from-primary/5 to-transparent w-full h-full absolute"></div>
              <div className="text-center space-y-3 z-10">
                <div className="bg-background/90 backdrop-blur-lg text-primary rounded-full p-6 inline-flex">
                  <Video className="h-12 w-12" />
                </div>
                <h3 className="font-medium text-xl">Camera Preview</h3>
                <p className="text-muted-foreground">
                  Your video will appear here when connected
                </p>
              </div>
            </div>

            {/* Video overlay controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex gap-3 bg-background/70 backdrop-blur-md rounded-full p-2 shadow-lg border border-border/40">
                <Button
                  size="icon"
                  variant={isMuted ? "destructive" : "outline"}
                  onClick={() => setIsMuted(!isMuted)}
                  className="rounded-full transition-transform hover:scale-105"
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant={isVideoOff ? "destructive" : "outline"}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className="rounded-full transition-transform hover:scale-105"
                >
                  {isVideoOff ? (
                    <VideoOff className="h-5 w-5" />
                  ) : (
                    <Video className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setActiveView(activeView === "grid" ? "focus" : "grid")
                  }
                  className="rounded-full transition-transform hover:scale-105"
                >
                  <LayoutGrid className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Participants{" "}
                <span className="text-muted-foreground ml-1">(2)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">JS</span>
                    </div>
                    <span className="font-medium">John Smith</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mic className="h-3.5 w-3.5 text-muted-foreground" />
                    <Video className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">AM</span>
                    </div>
                    <span className="font-medium">Alex Miller</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MicOff className="h-3.5 w-3.5 text-muted-foreground" />
                    <VideoOff className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat area */}
        <Card className="h-full flex flex-col">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-md flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Interview Chat
            </CardTitle>
            <CardDescription>
              Share links and communicate during the session
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              {/* Sample messages */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-medium">JS</span>
                  </div>
                  <span className="text-xs font-medium">John Smith</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    10:45 AM
                  </span>
                </div>
                <div className="bg-muted px-3 py-2 rounded-lg ml-8">
                  Hello! Let's start with a few questions about your experience
                  with React.
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-medium">AM</span>
                  </div>
                  <span className="text-xs font-medium">Alex Miller</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    10:46 AM
                  </span>
                </div>
                <div className="bg-muted px-3 py-2 rounded-lg ml-8">
                  Sure, I've been working with React for about 3 years now.
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10 bg-background"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-7 w-7 p-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M14.5 1.5l-6.25 12.25L6.5 8l-4.5-1.75L14.5 1.5z" />
                </svg>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default MeetingPage;
