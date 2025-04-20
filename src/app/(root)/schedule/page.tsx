"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import React from "react";
import InterviewScheduleUI from "./InterviewScheduleUI";
import { motion } from "framer-motion";

function SchedulePage() {
  const router = useRouter();
  const {isInterviewer, isLoading} = useUserRole();

  if (isLoading) return <LoaderUI />;
  if (!isInterviewer) return router.push("/");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InterviewScheduleUI />
    </motion.div>
  );
}

export default SchedulePage