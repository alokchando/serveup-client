import { EventItem } from "@/lib/type";
import EventList from "@/components/event-list";

const UpComingEvents = async () => {
  const response = await fetch("http://localhost:3001/events/upcoming");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: EventItem[] = await response.json();

  return <EventList events={events} />;
};

export default UpComingEvents;