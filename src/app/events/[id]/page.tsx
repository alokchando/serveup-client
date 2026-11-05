
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import EventActions from "../EventActions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Fetch event details
  const response = await fetch(`http://localhost:3001/events/${id}`);
  const event = await response.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });


  let alreadyJoin = false;

  if (session?.user?.email) {
    const response1 = await fetch(
      `http://localhost:3001/events/joined/${session.user.email}`
    );

    const joinedEvents = await response1.json();

    alreadyJoin = joinedEvents.some(
      (item: { _id: string }) => item._id === id
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4">

        <Link href="/events" className="mb-6 inline-flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <span className="rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-600">
            {event.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            {event.title}
          </h1>

          <p className="mt-4 text-slate-600">
            {event.description}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">

            <div className="flex items-center gap-3">
              <CalendarDays className="text-sky-500" />
              <div>
                <p className="text-sm text-slate-500">Event Date</p>
                <p>{new Date(event.eventDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-sky-500" />
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p>{event.location}</p>
              </div>
            </div>

          </div>

          <EventActions
            eventId={event._id}
            participantCount={event.participantCount}
            alreadyjoin={alreadyJoin}
          />

        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
