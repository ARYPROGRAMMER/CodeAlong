"use client";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import LoaderUI from "./LoaderUI";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LayoutListIcon, UsersIcon } from "lucide-react";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";

function MeetingRoom() {
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) {
    <LoaderUI />;
  }

  return (
    <div className="h-[calc(100vh-4rem-1px)] bg-gradient-to-b from-background to-background/95">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          defaultSize={35}
          minSize={25}
          maxSize={100}
          className="relative overflow-hidden rounded-l-lg shadow-md"
        >
          <div className="absolute inset-0">
            {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}
            {showParticipants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-l border-border/30 shadow-lg z-10 transition-all duration-200 ease-in-out">
                <CallParticipantsList
                  onClose={() => setShowParticipants(false)}
                />
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-0 right-0 z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 flex-wrap justify-center px-4 py-2 backdrop-blur-md bg-background/60 rounded-full shadow-lg border border-border/30 mx-auto w-fit">
                <CallControls onLeave={() => router.push("/")} />
                <div className="flex items-center gap-2.5 ml-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="size-10 rounded-full bg-background/80 hover:bg-primary/10 hover:text-primary border-border/40">
                        <LayoutListIcon className="size-4.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 backdrop-blur-md bg-background/90">
                      <DropdownMenuItem onClick={() => setLayout("grid")} className="cursor-pointer hover:bg-primary/10 transition-colors">
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLayout("speaker")} className="cursor-pointer hover:bg-primary/10 transition-colors">
                        Speaker View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="icon"
                    className="size-10 rounded-full bg-background/80 hover:bg-primary/10 hover:text-primary border-border/40"
                    onClick={() => setShowParticipants(!showParticipants)}
                  >
                    <UsersIcon className="size-4.5" />
                  </Button>

                  <EndCallButton />
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-border/40 hover:bg-primary/30 transition-colors" />

        <ResizablePanel defaultSize={65} minSize={25} className="rounded-r-lg shadow-md overflow-hidden">
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default MeetingRoom;
