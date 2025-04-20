import useMeetingActions from "@/hooks/useMeetingActions";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActions();

  const status = getMeetingStatus(interview);
  const formattedDate = format(
    new Date(interview.startTime),
    "EEEE, MMMM d · h:mm a"
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-2 hover:shadow-md transition-shadow duration-300">
        <CardHeader className="space-y-2">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CalendarIcon className="h-4 w-4" />
              </motion.div>
              {formattedDate}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Badge
                variant={
                  status === "live"
                    ? "default"
                    : status === "upcoming"
                      ? "secondary"
                      : "outline"
                }
                className={status === "live" ? "animate-pulse" : ""}
              >
                {status === "live"
                  ? "Live Now"
                  : status === "upcoming"
                    ? "Upcoming"
                    : "Completed"}
              </Badge>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <CardTitle>{interview.title}</CardTitle>
          </motion.div>

          {interview.description && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <CardDescription className="line-clamp-2">
                {interview.description}
              </CardDescription>
            </motion.div>
          )}
        </CardHeader>

        <CardContent>
          {status === "live" && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="w-full relative overflow-hidden group"
                onClick={() => joinMeeting(interview.streamCallId)}
              >
                <motion.span
                  className="absolute inset-0 w-full bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                Join Meeting
              </Button>
            </motion.div>
          )}

          {status === "upcoming" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="outline" className="w-full" disabled>
                Waiting to Start
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
export default MeetingCard;