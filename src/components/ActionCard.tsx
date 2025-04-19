import { QuickActionType } from "@/constants";
import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

function ActionCard({
  action,
  onClick,
}: {
  action: QuickActionType;
  onClick: () => void;
}) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-2 border-transparent",
        "transition-all duration-300 hover:shadow-md",
        "hover:border-primary/20 cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* ACTION GRADIENT */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-90 
          group-hover:opacity-70 transition-opacity duration-300`}
      />

      {/* ACTION CONTENT WRAPPER */}
      <div className="relative p-6 md:p-7 size-full flex flex-col justify-between">
        <div className="space-y-4">
          {/* ACTION ICON */}
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center",
              `bg-${action.color}/15 ring-1 ring-${action.color}/20`,
              "group-hover:scale-110 group-hover:shadow-sm transition-all duration-300"
            )}
          >
            <action.icon className={`h-6 w-6 text-${action.color}`} />
          </div>

          {/* ACTION DETAILS */}
          <div className="space-y-2">
            <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
              {action.description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ActionCard;
