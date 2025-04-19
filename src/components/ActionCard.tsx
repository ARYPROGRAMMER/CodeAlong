import { QuickActionType } from "@/constants";
import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "hover:border-primary/20 cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* ACTION GRADIENT */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-80 
          group-hover:opacity-90 transition-opacity duration-300`}
      />

      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-16 h-16 -ml-6 -mb-6 bg-white/5 rounded-full blur-lg group-hover:bg-white/10 transition-all duration-500" />

      {/* ACTION CONTENT WRAPPER */}
      <div className="relative p-6 md:p-8 size-full flex flex-col justify-between">
        <div className="space-y-4">
          {/* ACTION ICON */}
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center",
              `bg-${action.color}/15 ring-1 ring-${action.color}/30 shadow-sm`,
              "group-hover:scale-110 group-hover:shadow-md transition-all duration-300"
            )}
          >
            <action.icon
              className={`h-6 w-6 text-${action.color} group-hover:animate-pulse`}
            />
          </div>

          {/* ACTION DETAILS */}
          <div className="space-y-2">
            <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors">
              {action.description}
            </p>
          </div>
        </div>

        {/* Card arrow indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary/70"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Card>
  );
}

export default ActionCard;
