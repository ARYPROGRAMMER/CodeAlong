"use client";

import useGetCalls from "@/hooks/useGetCalls";

function RecordingsPage() {
  const { calls, isLoading } = useGetCalls();
  return <div>rec</div>;
}

export default RecordingsPage;
