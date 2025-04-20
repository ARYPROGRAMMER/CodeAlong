import { CallRecording } from "@stream-io/video-react-sdk";
import React from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { calculateRecordingDuration } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

function RecordingCard({ recording }: { recording: CallRecording }) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      toast.success("Recording link copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy link to clipboard");
    }
  };

  const formattedStartTime = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
    : "Unknown";

  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown Duration";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-opacity-50 hover:border-opacity-100 overflow-hidden">
      <CardHeader className="space-y-1.5 pb-3">
        <div className="space-y-2.5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-sm text-muted-foreground gap-2.5 group-hover:text-primary/80 transition-colors duration-300">
              <CalendarIcon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{formattedStartTime}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-2.5 group-hover:text-primary/80 transition-colors duration-300">
              <ClockIcon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{duration}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div
          className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center cursor-pointer group/video hover:bg-muted/70 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <div className="size-12 rounded-full bg-background/90 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-sm">
            <PlayIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2.5 pt-1">
        <Button
          className="flex-1 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <PlayIcon className="size-4 mr-2.5 animate-pulse" />
          Play Recording
        </Button>
        <Button
          variant="secondary"
          onClick={handleCopyLink}
          className="hover:bg-secondary/80 transition-colors duration-300 hover:scale-105"
        >
          <CopyIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RecordingCard;
