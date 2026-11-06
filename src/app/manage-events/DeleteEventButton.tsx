"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const DeleteEventButton = ({
  id,
  creatorEmail,
}: {
  id: string;
  creatorEmail: string;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

     const token = await getTokenFromClient()

    const response = await fetch(
      `http://localhost:3001/events/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ creatorEmail }),
      }
    );

    if (response.ok) {
      router.refresh();
    } else {
      alert("Failed to delete event");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
    >
      <Trash2 size={16} />
      Delete
    </button>
  );
};

export default DeleteEventButton;