import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SparklesIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { cn } from "@/lib/utils";

function DashboardButton() {
  const { isCandidate, isLoading } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <Link href="/dashboard">
      <Button 
        className={cn(
          "gap-2 font-medium bg-primary/90 hover:bg-primary/100",
          "border border-primary/40 shadow-sm",
          "transition-all duration-300"
        )} 
        size={"sm"}
      >
        <SparklesIcon className="size-4 animate-pulse text-primary-foreground" />
        Dashboard
      </Button>
    </Link>
  );
}

export default DashboardButton;
