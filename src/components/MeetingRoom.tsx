"use client";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Base layout container */
      .str-video__container {
        height: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
      }

      /* Target all main layout containers */
      .str-video__speaker-layout, 
      .str-video__grid-layout {
        height: calc(100% - 16px) !important;
        width: calc(100% - 16px) !important;
        margin: 0 !important;
        gap: 8px !important;
        overflow: hidden !important;
      }

      /* Fix speaker layout for equal sizing */
      .str-video__speaker-layout__wrapper {
        height: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        gap: 8px !important;
        display: flex !important;
        flex-direction: column !important;
      }

      /* Proper scaling for dominant speaker */
      .str-video__speaker-layout__dominant-speaker {
        width: 100% !important;
        flex: 1 !important;
        min-height: 0 !important;
        border-radius: 12px !important;
        overflow: hidden !important;
      }

      /* Secondary participants row */
      .str-video__speaker-layout__secondary-participants {
        display: flex !important;
        gap: 8px !important;
        width: 100% !important;
        height: 100px !important;
        min-height: 100px !important;
        overflow-x: auto !important;
        scrollbar-width: thin !important;
      }

      /* Secondary participant tiles */
      .str-video__speaker-layout__secondary-participant {
        flex: 0 0 auto !important;
        width: 178px !important;
        height: 100px !important;
        margin: 0 !important;
        border-radius: 12px !important;
        overflow: hidden !important;
      }

      /* Grid layout adjustments for equal sizing */
      .str-video__grid-layout {
        display: grid !important;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
        grid-auto-rows: 1fr !important;
        gap: 8px !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }

      /* Fix grid layout to properly fill space */
      .str-video__grid-layout .str-video__grid {
        height: 100% !important;
        width: 100% !important;
        overflow: hidden !important;
        display: grid !important;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
        grid-auto-rows: 1fr !important;
        gap: 8px !important;
      }
      
      /* Grid layout cell sizing */
      .str-video__grid-layout__participant {
        width: 100% !important;
        height: 100% !important;
        aspect-ratio: 16/9;
        border-radius: 12px !important;
        overflow: hidden !important;
      }

      /* Set equal sizing for all participants */
      .str-video__participant-view,
      .str-video__participant-container {
        border-radius: 12px !important;
        overflow: hidden !important;
        // padding: 0 !important;
        margin: 0 !important;
        height: 100% !important;
        width: 100% !important;
      }

      /* Make videos fit properly with object-fit: cover */
      .str-video__participant-view video,
      .str-video__participant-container video {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        border-radius: 12px !important;
      }

      /* Fix avatar sizing and positioning */
      .str-video__avatar {
        border-radius: 12px !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        height: 100% !important;
        background-color: #1e293b !important;
      }

      /* Style the avatar appropriately */
      .str-video__avatar > div {
        transform: scale(1.5) !important;
      }
      
      /* Ensure pagination controls don't take up space */
      .str-video__pagination-controls {
        position: absolute !important;
        bottom: 70px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 10 !important;
        background: rgba(0,0,0,0.4) !important;
        border-radius: 20px !important;
        // padding: 4px 8px !important;
      }
      
      /* Fix for specific participant counts */
      @media (min-width: 768px) {
        .str-video__grid-layout .str-video__grid--participants-2,
        .str-video__grid-layout .str-video__grid--participants-3,
        .str-video__grid-layout .str-video__grid--participants-4 {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      
      @media (min-width: 1200px) {
        .str-video__grid-layout .str-video__grid--participants-5,
        .str-video__grid-layout .str-video__grid--participants-6 {
          grid-template-columns: repeat(3, 1fr) !important;
        }
      }

      /* Fix any possible overflow issues */
      .str-video__call {
        height: 100% !important;
        width: 100% !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (callingState !== CallingState.JOINED) {
    return <LoaderUI />;
  }

  return (
    <div className="h-[calc(100vh-4rem-1px)] bg-gradient-to-b from-background to-background/95">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          defaultSize={35}
          minSize={25}
          maxSize={56}
          className="relative overflow-hidden rounded-l-lg shadow-md"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full">
              {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}
            </div>
            {showParticipants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-l border-border/30 shadow-lg z-20 transition-all duration-200 ease-in-out">
                <CallParticipantsList
                  onClose={() => setShowParticipants(false)}
                />
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-0 right-0 z-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 flex-wrap justify-center px-4 py-2 backdrop-blur-md bg-background/60 rounded-full shadow-lg border border-border/30 mx-auto w-fit">
                <CallControls onLeave={() => router.push("/")} />
                <div className="flex items-center gap-2.5 ml-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="size-10 rounded-full bg-background/80 hover:bg-primary/10 hover:text-primary border-border/40">
                        <LayoutListIcon className="size-4" />
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
                    <UsersIcon className="size-4" />
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
