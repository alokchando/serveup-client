import { EventItem } from "@/lib/type";
import EventList from "@/components/event-list";

const UpComingEvents = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/upcoming`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: EventItem[] = await response.json();

  return <EventList events={events} />;
};

export default UpComingEvents;
