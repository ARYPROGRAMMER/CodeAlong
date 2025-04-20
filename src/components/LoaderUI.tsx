import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function LoaderUI({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-[calc(100vh-4rem-1px)] flex items-center justify-center",
        "bg-background/40 backdrop-blur-sm transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-t-2 border-primary animate-spin" />
          <LoaderIcon className="h-6 w-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-sm text-muted-foreground max-w-xs text-center animate-pulse">
          Preparing your collaborative coding environment
        </p>
      </div>
    </div>
  );
}

export default LoaderUI;
