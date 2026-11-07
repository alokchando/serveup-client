import { EventItem } from "@/lib/type";
import EventList from "@/components/event-list";

// Always render per request — the event list must never be prerendered/frozen at build time.
export const dynamic = "force-dynamic";

const UpComingEvents = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/upcoming`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: EventItem[] = await response.json();

  return <EventList events={events} />;
};

export default UpComingEvents;
