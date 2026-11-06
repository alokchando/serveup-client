
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const JoinButton = ({
  eventId,
  onJoin,
  alreadyjoin,
}: {
  eventId: string;
  onJoin: () => void;
  alreadyjoin: boolean;
}) => {
  const [joined, setJoined] = useState(alreadyjoin);
  const [pending, setPending] = useState(false);

  const handleJoin = async () => {
    try {
      setPending(true);

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      console.log("Server URL:", serverUrl);

      const token = await getTokenFromClient();

      console.log("Token exists:", !!token);

      if (!serverUrl) {
        throw new Error("Server URL is undefined");
      }

      if (!token) {
        throw new Error("JWT token is missing");
      }

      const url = `${serverUrl}/events/${eventId}/join`;

      console.log("Request URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.text();

      console.log("Response Status:", response.status);
      console.log("Response Content-Type:", response.headers.get("content-type"));
      console.log("Response Body:", result);

      let data;

      try {
        data = JSON.parse(result);
      } catch {
        throw new Error("Backend returned HTML or invalid JSON. Check the Request URL and Express route.");
      }

      if (!response.ok) {
        toast.error(data.message || "Failed to join event");
        return;
      }

      setJoined(true);
      onJoin();
      toast.success(data.message);

    } catch (error) {
      console.error("JOIN ERROR:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={joined || pending}
      className="rounded-lg bg-sky-500 px-8 py-3 font-semibold text-white hover:bg-sky-600 disabled:bg-gray-400"
    >
      {pending
        ? "Joining..."
        : joined
          ? "Already Joined"
          : "Join Event"}
    </button>
  );
};

export default JoinButton;
