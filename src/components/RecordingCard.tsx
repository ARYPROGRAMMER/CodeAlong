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
    <Card className="group hover:shadow-lg transition-all duration-500 border-opacity-50 hover:border-opacity-100 overflow-hidden hover:border-primary/30 hover:-translate-y-1 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background to-background/10 opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-xl"></div>
      <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      <CardHeader className="space-y-1.5 pb-3">
        <div className="space-y-2.5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-sm text-muted-foreground gap-2.5 group-hover:text-primary/80 transition-colors duration-300">
              <CalendarIcon className="h-3.5 w-3.5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
              <span className="font-medium">{formattedStartTime}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-2.5 group-hover:text-primary/80 transition-colors duration-300">
              <ClockIcon className="h-3.5 w-3.5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
              <span className="font-medium">{duration}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div
          className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center cursor-pointer group/video hover:bg-muted/70 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md relative"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute w-24 h-24 bg-primary/10 rounded-full blur-xl opacity-0 group-hover/video:opacity-60 transition-all duration-500 group-hover/video:scale-150 left-1/4 top-1/4"></div>
          
          <div className="size-12 rounded-full bg-background/90 flex items-center justify-center group-hover:bg-primary group-hover:scale-125 transition-all duration-500 shadow-sm group-hover:shadow-lg z-10 group-hover:rotate-12">
            <PlayIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2.5 pt-1">
        <Button
          className="flex-1 transition-all duration-300 hover:scale-[1.03] shadow-sm hover:shadow group/btn overflow-hidden relative"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <div className="absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-all duration-700"></div>
          <PlayIcon className="size-4 mr-2.5 animate-pulse group-hover/btn:animate-spin transition-all" />
          <span className="relative z-10">Play Recording</span>
        </Button>
        <Button
          variant="secondary"
          onClick={handleCopyLink}
          className="hover:bg-secondary/80 transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-md"
        >
          <CopyIcon className="size-4 group-hover:animate-bounce" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RecordingCard;
