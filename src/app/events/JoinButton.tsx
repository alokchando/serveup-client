"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const JoinButton = ({
  eventId,
  onJoin,
  alreadyjoin
}: {
  eventId: string;
  onJoin: () => void;
  alreadyjoin:boolean;
}) => {
  const { data: session } = useSession();
  const [joined, setJoined] = useState(alreadyjoin);

  const handleJoin = async () => {



    const response = await fetch(`http://localhost:3001/events/${eventId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        participantName: session?.user.name,
        participantEmail: session?.user.email,
      }),
    });

    const data = await response.json();


    setJoined(true);
    onJoin();
    toast.success(data.message);
  };

  return (
    <button
      onClick={handleJoin}
      disabled={joined}
      className="rounded-lg bg-sky-500 px-8 py-3 font-semibold text-white hover:bg-sky-600 disabled:bg-gray-400"
    >
      {joined ? "Already Joined" : "Join Event"}
    </button>
  );
};

export default JoinButton;