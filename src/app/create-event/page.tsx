"use client";

import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  ImagePlus,
  Type,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Environment",
  "Education",
  "Community Service",
  "Health",
  "Animal Welfare",
  "Food Donation",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const selectedDate = new Date(
      `${formData.get("eventDate")}T${formData.get("eventTime")}`,
    );

    if (selectedDate <= new Date()) {
      toast.error("Please select a future date and time.");
      return;
    }

    const eventData = {
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      category: String(formData.get("eventType")),
      image: String(formData.get("thumbnailImageUrl")),
      location: String(formData.get("location")),
      eventDate: selectedDate,
      creatorName: session?.user.name,
      creatorEmail: session?.user.email,
    };

     const token = await getTokenFromClient()
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      toast.error("Failed to create event.");
      return;
    }

    toast.success("Event created successfully!");
    // router.replace("/events");

  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-sky-500"
          >
            <ArrowLeft size={16} />
            Back to events
          </Link>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-500">
              <Sparkles size={17} />
              MAKE A DIFFERENCE
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create an Event
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Bring people together and make a positive impact in your
              community. Start something meaningful today!
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8"
          >
            <div className="mb-7">
              <h2 className="text-xl font-semibold">Event Information</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Provide the details of your upcoming event.
              </p>
            </div>

            <div className="space-y-6">
              {/* Event Title */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Type size={16} className="text-sky-500" />
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Community Clean-up Day"
                  required
                  minLength={5}
                  maxLength={100}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <AlignLeft size={16} className="text-sky-500" />
                  Event Description
                </label>

                <textarea
                  name="description"
                  placeholder="Tell people what your event is about, what they will do, and how they can participate..."
                  required
                  minLength={20}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Tag size={16} className="text-sky-500" />
                  Event Category
                </label>

                <select
                  name="eventType"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <ImagePlus size={16} className="text-sky-500" />
                  Event Image URL
                </label>

                <input
                  type="url"
                  name="thumbnailImageUrl"
                  placeholder="https://example.com/event-image.jpg"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Add a publicly accessible image URL for your event.
                </p>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <MapPin size={16} className="text-sky-500" />
                  Event Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Sylhet, Bangladesh"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {/* Date and Time */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <CalendarDays size={16} className="text-sky-500" />
                    Event Date
                  </label>

                  <input
                    type="date"
                    name="eventDate"
                    min={new Date().toLocaleDateString("en-CA")}
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Clock size={16} className="text-sky-500" />
                    Event Time
                  </label>

                  <input
                    type="time"
                    name="eventTime"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/upcoming-events")}
                className="rounded-xl border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </button>

              <button
                onClick={() => router.push("/upcoming-events")}

                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                Create Event
                <ArrowRight size={17} />
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                <Sparkles size={22} />
              </div>

              <h3 className="text-lg font-semibold">Make an Impact</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every great change starts with a small action. Create
                opportunities for people to connect, volunteer, and make their
                community better.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Before You Publish</h3>

              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-bold text-sky-500">01.</span>
                  Choose a clear and meaningful event title.
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-sky-500">02.</span>
                  Explain the purpose of your event.
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-sky-500">03.</span>
                  Provide the correct location and schedule.
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-sky-500">04.</span>
                  Use a relevant event image.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-sky-500 p-6 text-white">
              <p className="text-sm font-medium text-sky-100">SERVEUP</p>

              <h3 className="mt-2 text-2xl font-bold">
                Small Acts, Big Impact.
              </h3>

              <p className="mt-2 text-sm leading-6 text-sky-100">
                Together, we can build a more helpful and connected community.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
