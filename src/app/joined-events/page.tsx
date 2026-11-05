
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

type JoinedEvent = {
  _id: string;
  image: string;
  title: string;
  category: string;
  location: string;
  eventDate: string;
};

const JoinedEvents = async () => {
  // Get logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Fetch events joined by this user
  const response = await fetch(
    `http://localhost:3001/events/joined/${session?.user?.email}`,
    {
      cache: "no-store",
    }
  );

  const events = await response.json();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-5 py-16">

        {/* Page Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-sky-500 mb-3">
            Your Activities
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Joined Events
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Discover the events you are participating in.
          </p>

          <div className="w-16 h-1 bg-sky-500 rounded-full mt-5" />
        </div>

        {/* Event Cards */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: JoinedEvent) => (
              <div
                key={event._id}
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-xl transition-all duration-300"
              >
                {/* Event Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <span className="absolute top-4 left-4 bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {event.category}
                  </span>
                </div>

                {/* Event Information */}
                <div className="p-6">

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                    {event.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-5">
                    <MapPin size={17} className="text-sky-500 shrink-0" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-3">
                    <CalendarDays size={17} className="text-sky-500 shrink-0" />
                    <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>

                  {/* View Event Button */}
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-7 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-colors"
                  >
                    View Event
                    <ArrowUpRight size={18} />
                  </Link>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 px-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <CalendarDays
              size={48}
              className="mx-auto text-sky-500 mb-5"
            />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              No Joined Events Yet
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-3">
              You haven't joined any events. Explore upcoming events and be part of something meaningful.
            </p>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-colors"
            >
              Explore Events
              <ArrowUpRight size={18} />
            </Link>
          </div>
        )}

      </div>
    </main>
  );
};

export default JoinedEvents;
