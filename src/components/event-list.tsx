"use client";

import { useState } from "react";
import { EventItem } from "@/lib/type";
import EventCard from "./event-card";
import Link from "next/link";

const EventList = ({ events }: { events: EventItem[] }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      {/* Heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Discover Events
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Explore events and join your community.
          </p>
        </div>

        <Link
          href="/create-event"
          className="rounded-xl bg-sky-500 px-5 py-3 text-center font-semibold text-white hover:bg-sky-600"
        >
          + Create Event
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search events by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Categories" : item}
            </option>
          ))}
        </select>
      </div>

      {/* Event Count */}
      <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        Showing {filteredEvents.length} of {events.length} events
      </p>

      {/* Event Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} data={event} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-slate-500 dark:text-slate-400">
          No events found.
        </p>
      )}
    </section>
  );
};

export default EventList;
