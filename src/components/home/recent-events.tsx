import Link from "next/link";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { EventItem } from "@/lib/type";

const RecentEvents = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/recent`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recent events");
  }

  const events: EventItem[] = await response.json();

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Recent Upcoming Events
          </h2>
          <p className="mt-2 text-muted-foreground">
            Discover upcoming opportunities to make a difference.
          </p>
        </div>

        <Link href="/upcoming-events">
          <Button variant="outline">View All Events</Button>
        </Link>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} data={event} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-muted-foreground">
          No upcoming events available.
        </p>
      )}
    </section>
  );
};

export default RecentEvents;
