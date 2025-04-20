import React, { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getInterviewerInfo } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
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
      damping: 12,
      stiffness: 100,
    },
  },
};

function CommentDialog({ interviewId }: { interviewId: Id<"interviews"> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("3");
  const addComment = useMutation(api.comments.addComment);
  const users = useQuery(api.users.getUsers);
  const existingComments = useQuery(api.comments.getComments, { interviewId });

  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error("Please enter a commment");

    try {
      await addComment({
        interviewId,
        content: comment.trim(),
        rating: parseInt(rating),
      });

      toast.success("Comment submitted");
      setComment("");
      setRating("3");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit comment");
    }
  };

  const renderStars = (rating: number) => (
    <motion.div
      className="flex gap-0.5"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {[1, 2, 3, 4, 5].map((starValue) => (
        <motion.div
          key={starValue}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <StarIcon
            className={`h-4 w-4 ${starValue <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </motion.div>
      ))}
    </motion.div>
  );

  if (existingComments === undefined || users === undefined) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="secondary" className="w-full">
            <motion.div
              initial={{ rotate: -5 }}
              whileHover={{ rotate: 0, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mr-2"
            >
              <MessageSquareIcon className="h-4 w-4" />
            </motion.div>
            Add Comment
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle>Interview Comment</DialogTitle>
          </motion.div>
        </DialogHeader>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {existingComments.length > 0 && (
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Previous Comments</h4>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <Badge variant="outline">
                    {existingComments.length} Comment
                    {existingComments.length !== 1 ? "s" : ""}
                  </Badge>
                </motion.div>
              </div>

              <ScrollArea className="h-[240px]">
                <AnimatePresence>
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {existingComments.map((comment, index) => {
                      const interviewer = getInterviewerInfo(
                        users,
                        comment.interviewerId
                      );
                      return (
                        <motion.div
                          key={index}
                          className="rounded-lg border p-4 space-y-3"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.1 }}
                          whileHover={{
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            scale: 1.01,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={interviewer.image} />
                                  <AvatarFallback>
                                    {interviewer.initials}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>
                              <div>
                                <p className="text-sm font-medium">
                                  {interviewer.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {format(
                                    comment._creationTime,
                                    "MMM d, yyyy • h:mm a"
                                  )}
                                </p>
                              </div>
                            </div>
                            {renderStars(comment.rating)}
                          </div>
                          <motion.p
                            className="text-sm text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {comment.content}
                          </motion.p>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </ScrollArea>
            </motion.div>
          )}

          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label>Rating</Label>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        <div className="flex items-center gap-2">
                          {renderStars(value)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label>Your Comment</Label>
              <motion.div
                initial={{ height: "20px" }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your detailed comment about the candidate..."
                  className="h-32"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <DialogFooter>
          <motion.div
            className="flex gap-2 w-full justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ background: "rgba(0,0,0,0)" }}
            >
              <Button onClick={handleSubmit}>Submit</Button>
            </motion.div>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
