
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeleteEventButton from "./DeleteEventButton";
import EditEventDialog from "./EditEventDialog";

type ManagedEvent = {
  _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
};

const ManageEvents = async () => {
  // Get logged-in user session
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p>Please login to manage your events.</p>
      </section>
    );
  }

  // Get JWT token from Better Auth
  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!token) {
    throw new Error("Unable to generate JWT token.");
  }

  const userEmail = session.user.email;

  // Fetch events created by logged-in user
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL }/events/my-events/${encodeURIComponent(userEmail)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Events API error:", errorData);

    throw new Error(errorData.msg || "Failed to fetch events.");
  }

  const data = await response.json();

  // Make sure the response is an array
  const events: ManagedEvent[] = Array.isArray(data)
    ? data
    : data.events || [];

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Manage Events
            </h1>
            <p className="mt-2 text-slate-500">
              Manage all the events you have created.
            </p>
          </div>

          <Link
            href="/create-event"
            className="flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-3 font-medium text-white hover:bg-sky-600"
          >
            <Plus size={18} />
            Create Event
          </Link>
        </div>

        {/* Event Count */}
        <p className="mb-6 font-medium text-slate-600 dark:text-slate-300">
          My Events ({events.length})
        </p>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              No events created yet
            </h2>

            <p className="mt-2 text-slate-500">
              Start creating events and manage them here.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-block rounded-lg bg-sky-500 px-5 py-3 text-white hover:bg-sky-600"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (

          /* Event Cards */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: ManagedEvent) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >

                {/* Event Image */}
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Event Information */}
                <div className="p-5">
                  <span className="text-sm font-medium text-sky-500">
                    {event.category}
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {event.title}
                  </h2>

                  <div className="mt-4 space-y-3 text-sm text-slate-500">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} />
                      {event.location}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <Link
                      href={`/events/${event._id}`}
                      className="font-medium text-sky-600 hover:text-sky-700"
                    >
                      View Event
                    </Link>

                    <div className="flex items-center gap-2">
                      <EditEventDialog
                        event={event}
                        creatorEmail={userEmail}
                      />

                      <DeleteEventButton
                        id={event._id}
                        creatorEmail={userEmail}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageEvents;
