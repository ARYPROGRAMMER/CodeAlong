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
  CardFooter,
} from "./ui/card";
import { CalendarIcon, ClockIcon, VideoIcon } from "lucide-react";
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

  const timeUntilMeeting = () => {
    const now = new Date();
    const meetingStart = new Date(interview.startTime);

    if (now > meetingStart) return "Started";

    const diffMs = meetingStart.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 60) return `In ${diffMins} minutes`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `In ${diffHours} hours`;
    const diffDays = Math.floor(diffHours / 24);
    return `In ${diffDays} days`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-2 hover:shadow-md transition-shadow duration-300">
        <CardHeader className="space-y-2 pb-2">
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

        {status === "upcoming" && (
          <CardContent className="pt-0 pb-2">
            <motion.div
              className="flex items-center gap-1.5 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ClockIcon className="h-4 w-4 text-orange-500" />
              <span>{timeUntilMeeting()}</span>
            </motion.div>
          </CardContent>
        )}

        <CardFooter className="pt-2 pb-4">
          {status === "live" && (
            <motion.div
              className="w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                className="w-full relative overflow-hidden group bg-green-600 hover:bg-green-700"
                onClick={() => joinMeeting(interview.streamCallId)}
              >
                <VideoIcon className="h-4 w-4 mr-2" />
                <motion.span
                  className="absolute inset-0 w-full bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                Join Meeting Now
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full"></span>
              </Button>
            </motion.div>
          )}

          {status === "upcoming" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full bg-gray-100 dark:bg-gray-800"
                disabled
              >
                <CalendarIcon className="h-4 w-4 mr-2 opacity-70" />
                Waiting to Start
              </Button>
            </motion.div>
          )}

          {status === "completed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <p className="text-center text-sm text-muted-foreground">
                This meeting has ended
              </p>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
export default MeetingCard;
