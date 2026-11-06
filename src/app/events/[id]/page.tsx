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

  // Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Get JWT token from Better Auth
  const tokenResponse = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenResponse?.token;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  // Fetch event details
  const response = await fetch(`http://localhost:3001/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });


  const event = await response.json();

  // Check whether the user already joined
  let alreadyJoin = false;

  if (session?.user?.email) {
    const joinedResponse = await fetch(
      `http://localhost:3001/events/joined/${encodeURIComponent(session.user.email)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (joinedResponse.ok) {
      const joinedEvents = await joinedResponse.json();

      alreadyJoin = joinedEvents.some(
        (item: { _id: string }) => item._id === id,
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4">
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
          <span className="rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
            {event.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold text-slate-800 dark:text-white">
            {event.title}
          </h1>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            {event.description}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-sky-500" />

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Event Date
                </p>

                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-sky-500" />

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Location
                </p>

                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {event.location}
                </p>
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