"use client";

import React from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import toast from "react-hot-toast";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import LoaderUI from "@/components/LoaderUI";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERVIEW_CATEGORY } from "@/constants";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentDialog from "@/components/CommentDialog";
import { motion } from "framer-motion";

type Interview = Doc<"interviews">;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

function DashboardPage() {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.inteviews.getAllInterviews);
  const updateStatus = useMutation(api.inteviews.updateInterviewStatus);

  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string
  ) => {
    try {
      await updateStatus({ id: interviewId, status });
      toast.success(`Interview marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (!interviews || !users) return <LoaderUI />;

  const groupedInterviews = groupInterviews(interviews);

  return (
    <motion.div
      className="container mx-auto py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link href="/schedule">
          <Button>Schedule New Interview</Button>
        </Link>
      </motion.div>

      <div className="space-y-8">
        {INTERVIEW_CATEGORY.map(
          (category, categoryIndex) =>
            groupedInterviews[category.id]?.length > 0 && (
              <motion.section
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 * categoryIndex }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <motion.h2
                    className="text-xl font-semibold"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 * categoryIndex }}
                  >
                    {category.title}
                  </motion.h2>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 * categoryIndex }}
                  >
                    <Badge variant={category.variant}>
                      {groupedInterviews[category.id].length}
                    </Badge>
                  </motion.div>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {groupedInterviews[category.id].map(
                    (interview: Interview, index: number) => {
                      const candidateInfo = getCandidateInfo(
                        users,
                        interview.candidateId
                      );
                      const startTime = new Date(interview.startTime);

                      return (
                        <motion.div
                          key={interview._id.toString()}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card className="hover:shadow-md transition-all">
                            <CardHeader className="p-4">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring" }}
                                >
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={candidateInfo.image} />
                                    <AvatarFallback>
                                      {candidateInfo.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                </motion.div>
                                <div>
                                  <CardTitle className="text-base">
                                    {candidateInfo.name}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {interview.title}
                                  </p>
                                </div>
                              </div>
                            </CardHeader>

                            <CardContent className="p-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <motion.div
                                    whileHover={{ rotate: 15 }}
                                    transition={{ type: "spring" }}
                                  >
                                    <CalendarIcon className="h-4 w-4" />
                                  </motion.div>
                                  {format(startTime, "MMM dd")}
                                </div>
                                <div className="flex items-center gap-1">
                                  <motion.div
                                    whileHover={{ rotate: 15 }}
                                    transition={{ type: "spring" }}
                                  >
                                    <ClockIcon className="h-4 w-4" />
                                  </motion.div>
                                  {format(startTime, "hh:mm a")}
                                </div>
                              </div>
                            </CardContent>

                            <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                              {interview.status === "completed" && (
                                <div className="flex gap-2 w-full">
                                  <motion.div
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1"
                                  >
                                    <Button
                                      className="w-full"
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interview._id,
                                          "succeeded"
                                        )
                                      }
                                    >
                                      <CheckCircle2Icon className="h-4 w-4 mr-2" />
                                      Pass
                                    </Button>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1"
                                  >
                                    <Button
                                      variant="destructive"
                                      className="w-full"
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interview._id,
                                          "failed"
                                        )
                                      }
                                    >
                                      <XCircleIcon className="h-4 w-4 mr-2" />
                                      Fail
                                    </Button>
                                  </motion.div>
                                </div>
                              )}
                              <CommentDialog interviewId={interview._id} />
                            </CardFooter>
                          </Card>
                        </motion.div>
                      );
                    }
                  )}
                </motion.div>
              </motion.section>
            )
        )}
      </div>
    </motion.div>
  );
}

export default DashboardPage;
