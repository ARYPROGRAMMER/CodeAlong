import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon, XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TIME_SLOTS } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import UserInfo from "@/components/UserInfo";
import { Calendar } from "@/components/ui/calendar";
import MeetingCard from "@/components/MeetingCard";
import { motion } from "framer-motion";

interface FormErrors {
  title?: string;
  description?: string;
  candidateId?: string;
  interviewerIds?: string;
  date?: string;
  time?: string;
}

function InterviewScheduleUI() {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const interviews = useQuery(api.inteviews.getAllInterviews);
  const users = useQuery(api.users.getUsers) ?? [];
  const createInterview = useMutation(api.inteviews.createInterview);

  const candidates = users?.filter((u) => u.role === "candidate");
  const interviewers = users?.filter((u) => u.role === "interviewer");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    candidateId: "",
    interviewerIds: user?.id ? [user.id] : [],
  });

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
      isValid = false;
    } else if (formData.title.trim().length > 50) {
      newErrors.title = "Title must be less than 50 characters";
      isValid = false;
    }

    // Validate description (optional but validate if provided)
    if (formData.description && formData.description.trim().length > 200) {
      newErrors.description = "Description must be less than 200 characters";
      isValid = false;
    }

    // Validate candidate selection
    if (!formData.candidateId) {
      newErrors.candidateId = "You must select a candidate";
      isValid = false;
    }

    // Validate interviewers (at least one required)
    if (formData.interviewerIds.length === 0) {
      newErrors.interviewerIds = "At least one interviewer is required";
      isValid = false;
    }

    // Validate date is not in the past
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(formData.date);
    const selectedDateStart = new Date(selectedDate);
    selectedDateStart.setHours(0, 0, 0, 0);

    if (selectedDateStart < today) {
      newErrors.date = "You cannot schedule interviews in the past";
      isValid = false;
    }

    // Validate time (if today is selected)
    if (selectedDateStart.getTime() === today.getTime()) {
      const [hours, minutes] = formData.time.split(":").map(Number);
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(hours, minutes, 0, 0);

      if (selectedDateTime < now) {
        newErrors.time = "You cannot schedule interviews in the past";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Clear specific field error when user starts editing
  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const scheduleMeeting = async () => {
    if (!client || !user) return;

    // Validate form before proceeding
    if (!validateForm()) {
      toast.error("Please fix the form errors before scheduling");
      return;
    }

    setIsCreating(true);

    try {
      const { title, description, date, time, candidateId, interviewerIds } =
        formData;
      const [hours, minutes] = time.split(":");
      const meetingDate = new Date(date);
      meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: meetingDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description,
          },
        },
      });

      await createInterview({
        title,
        description,
        startTime: meetingDate.getTime(),
        status: "upcoming",
        streamCallId: id,
        candidateId,
        interviewerIds,
      });

      setOpen(false);
      toast.success("Meeting scheduled successfully!");

      setFormData({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        candidateId: "",
        interviewerIds: user?.id ? [user.id] : [],
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const addInterviewer = (interviewerId: string) => {
    if (!formData.interviewerIds.includes(interviewerId)) {
      setFormData((prev) => ({
        ...prev,
        interviewerIds: [...prev.interviewerIds, interviewerId],
      }));
      clearError("interviewerIds");
    }
  };

  const removeInterviewer = (interviewerId: string) => {
    if (interviewerId === user?.id) return;
    setFormData((prev) => ({
      ...prev,
      interviewerIds: prev.interviewerIds.filter((id) => id !== interviewerId),
    }));
  };

  const selectedInterviewers = interviewers.filter((i) =>
    formData.interviewerIds.includes(i.clerkId)
  );

  const availableInterviewers = interviewers.filter(
    (i) => !formData.interviewerIds.includes(i.clerkId)
  );

  return (
    <motion.div
      className="container max-w-7xl mx-auto p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Interviews
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Schedule and manage interviews
          </motion.p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg">Schedule Interview</Button>
            </motion.div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="Interview title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    clearError("title");
                  }}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Interview description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    clearError("description");
                  }}
                  rows={3}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Candidate <span className="text-destructive">*</span>
                </label>
                <Select
                  value={formData.candidateId}
                  onValueChange={(candidateId) => {
                    setFormData({ ...formData, candidateId });
                    clearError("candidateId");
                  }}
                >
                  <SelectTrigger
                    className={errors.candidateId ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem
                        key={candidate.clerkId}
                        value={candidate.clerkId}
                      >
                        <UserInfo user={candidate} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.candidateId && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.candidateId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Interviewers <span className="text-destructive">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedInterviewers.map((interviewer) => (
                    <div
                      key={interviewer.clerkId}
                      className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm"
                    >
                      <UserInfo user={interviewer} />
                      {interviewer.clerkId !== user?.id && (
                        <button
                          onClick={() => removeInterviewer(interviewer.clerkId)}
                          className="hover:text-destructive transition-colors"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {availableInterviewers.length > 0 && (
                  <Select onValueChange={addInterviewer}>
                    <SelectTrigger
                      className={
                        errors.interviewerIds ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Add interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInterviewers.map((interviewer) => (
                        <SelectItem
                          key={interviewer.clerkId}
                          value={interviewer.clerkId}
                        >
                          <UserInfo user={interviewer} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.interviewerIds && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.interviewerIds}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Date <span className="text-destructive">*</span>
                  </label>
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      if (date) {
                        setFormData({ ...formData, date });
                        clearError("date");
                      }
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    className={`rounded-md border ${errors.date ? "border-destructive" : ""}`}
                  />
                  {errors.date && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Time <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={formData.time}
                    onValueChange={(time) => {
                      setFormData({ ...formData, time });
                      clearError("time");
                    }}
                  >
                    <SelectTrigger
                      className={errors.time ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={scheduleMeeting} disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Interview"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {!interviews ? (
        <motion.div
          className="flex justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        </motion.div>
      ) : interviews.length > 0 ? (
        <motion.div
          className="spacey-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview, index) => (
              <motion.div
                key={interview._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <MeetingCard interview={interview} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No interviews scheduled
        </motion.div>
      )}
    </motion.div>
  );
}

export default InterviewScheduleUI;
