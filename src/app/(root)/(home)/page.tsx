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
import { Loader2Icon, LinkIcon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.inteviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setmodalType] = useState<"start" | "join">();
  const router = useRouter();
  const { user } = useUser();
  const firstName = user?.firstName || "";

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

  const openJoinMeetingModal = () => {
    setmodalType("join");
    setShowModal(true);
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-10 min-h-[calc(100vh-5rem)]">
      <div className="rounded-xl bg-card/90 p-8 border shadow-sm mb-8 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
          Welcome back, {firstName}!
        </h1>
        <div className="mt-3 flex flex-col space-y-2">
          <p className="text-muted-foreground text-lg">
            {isInterviewer
              ? "You are an interviewer. You can schedule interviews and evaluate candidates."
              : "You are a candidate. You can join your upcoming interviews below."}
          </p>
          {isInterviewer ? (
            <p className="text-sm text-muted-foreground/80">
              Use the quick actions below to schedule interviews, join meetings,
              or review recordings.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/80">
              Your scheduled interviews will appear below. You can also join an
              interview directly using a link.
            </p>
          )}
        </div>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {QUICK_ACTIONS.map((action, index) => (
              <div
                key={action.title}
                className="animate-slideUpIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ActionCard
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              </div>
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
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Your Interviews
                </h1>
                <p className="text-muted-foreground mt-1">
                  View and join your scheduled interviews
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  className="bg-purple-500 hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={openJoinMeetingModal}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Join with Link
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-ping"></span>
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full"></span>
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview, index) => (
                  <div
                    key={interview._id}
                    className="animate-slideUpIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <MeetingCard interview={interview} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground animate-pulse">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Join Meeting"
            isJoinMeeting={true}
          />
        </>
      )}
    </div>
  );
}
