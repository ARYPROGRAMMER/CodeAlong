import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function LoaderUI({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-[calc(100vh-4rem-1px)] flex items-center justify-center",
        "bg-background/60 backdrop-blur-sm transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-5">
        <div className="relative animate-bounce-slow">
          <div className="h-14 w-14 rounded-full border-2 border-primary/30 animate-spin duration-1000"></div>
          <div className="h-14 w-14 rounded-full border-t-2 border-primary animate-spin absolute inset-0"></div>
          <LoaderIcon className="h-7 w-7 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="text-sm text-muted-foreground max-w-xs text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text  animate-pulse">
          Preparing your collaborative coding environment
        </p>
        <div className="flex space-x-2 mt-2">
          <div className="h-2 w-2 rounded-full bg-primary/70 animate-pulse delay-0"></div>
          <div className="h-2 w-2 rounded-full bg-primary/70 animate-pulse delay-300"></div>
          <div className="h-2 w-2 rounded-full bg-primary/70 animate-pulse delay-600"></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderUI;
