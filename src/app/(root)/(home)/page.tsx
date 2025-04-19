"use client";

import ActionCard from "@/components/ActionCard";
import LoaderUI from "@/components/LoaderUI";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";

export default function Home() {
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.inteviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setmodalType] = useState<"start" | "join">();
  const router = useRouter();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setmodalType("start");
        setShowModal(true);
        break;

      case "Join Interview":
        setmodalType("join");
        setShowModal(true);
        break;

      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>candidate view</div>
        </>
      )}
    </div>
  );
}
