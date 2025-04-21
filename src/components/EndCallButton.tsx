import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useState } from "react";

function EndCallButton() {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const [isEnding, setIsEnding] = useState(false);

  const updateInterviewStatus = useMutation(
    api.inteviews.updateInterviewStatus
  );

  const interview = useQuery(api.inteviews.getInterviewByStreamCallId, {
    streamCallId: call?.id || "",
  });

  if (!call || !interview) return null;

  const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    if (isEnding) return; // Prevent multiple clicks

    try {
      setIsEnding(true);
      toast.loading("Ending meeting...");

      router.push("/");

      // End the call and update interview status in the background
      // This ensures users don't have to wait for these operations
      // Learn this kind of optimisation techniques :)
      Promise.all([
        call.endCall(), // -> takes too long
        updateInterviewStatus({
          id: interview._id,
          status: "completed",
        }),
      ])
        .then(() => {
          toast.dismiss();
          toast.success("Meeting ended for everyone");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to end meeting properly");
        });
    } catch (error) {
      setIsEnding(false);
      console.log(error);
      toast.error("Failed to end the meeting");
    }
  };

  return (
    <Button variant={"destructive"} onClick={endCall} disabled={isEnding}>
      {isEnding ? "Ending..." : "End for Everyone"}
    </Button>
  );
}

export default EndCallButton;
