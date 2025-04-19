"use client";

import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VideoIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import useMeetingActions from "@/hooks/useMeetingActions";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

function MeetingModal({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
}: MeetingModalProps) {
  const [meetingUrl, setMeetingUrl] = useState("");
  const { createInstantMeeting, joinMeeting } = useMeetingActions();

  const handleStart = async () => {
    if (isJoinMeeting) {
      const meetingId = meetingUrl.split("/").pop();
      if (meetingId) {
        joinMeeting(meetingId);
      }
    } else {
      createInstantMeeting();
    }

    setMeetingUrl("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-lg">
        <div
          className={cn(
            "relative bg-gradient-to-r p-6 pb-4",
            isJoinMeeting
              ? "from-purple-500/20 via-purple-500/10 to-transparent"
              : "from-primary/20 via-primary/10 to-transparent"
          )}
        >
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                  isJoinMeeting
                    ? "bg-purple-500/15 text-purple-500"
                    : "bg-primary/15 text-primary"
                )}
              >
                {isJoinMeeting ? (
                  <VideoIcon className="h-5 w-5" />
                ) : (
                  <VideoIcon className="h-5 w-5" />
                )}
              </div>
              <DialogTitle className="text-xl font-semibold">
                {title}
              </DialogTitle>
            </div>
            <p className="text-muted-foreground text-sm">
              {isJoinMeeting
                ? "Enter a meeting link to join an ongoing interview"
                : "Start a new interview session instantly"}
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 pt-1 space-y-6">
          {isJoinMeeting && (
            <div className="space-y-2">
              <label htmlFor="meeting-url" className="text-sm font-medium">
                Meeting Link
              </label>
              <Input
                id="meeting-url"
                placeholder="Meeting link goes here..."
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                className="transition-all focus-within:border-purple-500/40 focus-within:ring-purple-500/20"
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="transition-all duration-200 hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingUrl.trim()}
              className={cn(
                "transition-all duration-200 gap-2",
                isJoinMeeting
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {isJoinMeeting ? (
                <>
                  <VideoIcon className="h-4 w-4" />
                  Join Meeting
                </>
              ) : (
                <>
                  <VideoIcon className="h-4 w-4" />
                  Start Meeting
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal;
