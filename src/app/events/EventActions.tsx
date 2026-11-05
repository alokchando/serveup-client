"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import JoinButton from "./JoinButton";

const EventActions = ({
  eventId,
  participantCount,
  alreadyjoin
}: {
  eventId: string;
  participantCount: number;
  alreadyjoin:boolean;
}) => {
  const [count, setCount] = useState(participantCount);

  return (
    <div className="mt-8">
      {/* Display updated participant count */}
      <div className="mb-5 flex items-center gap-3">
        <Users className="text-sky-500" />
        <p>{count} Joined</p>
      </div>

      <JoinButton
        eventId={eventId}
        onJoin={() => setCount((prev) => prev + 1)}
        alreadyjoin={alreadyjoin}
      />
    </div>
  );
};

export default EventActions;