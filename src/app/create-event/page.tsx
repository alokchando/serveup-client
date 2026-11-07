"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const { data: session, isPending } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please log in to create an event.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const eventDate = new Date(
      `${formData.get("eventDate")}T${formData.get("eventTime")}`,
    );

    if (isNaN(eventDate.getTime()) || eventDate <= new Date()) {
      toast.error("Please select a future date and time.");
      return;
    }

    const eventData = {
      title: String(formData.get("title")).trim(),
      description: String(formData.get("description")).trim(),
      category: String(formData.get("category")),
      image: String(formData.get("image")).trim(),
      location: String(formData.get("location")).trim(),
      eventDate: eventDate.toISOString(),
      creatorName: session.user.name,
      creatorEmail: session.user.email,
    };

    setIsSubmitting(true);

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to create event.");
        return;
      }

      toast.success("Event created successfully!");
      form.reset();
      router.push("/upcoming-events");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/upcoming-events" className="text-sm text-sky-500">
          ← Back to events
        </Link>

        <h1 className="mt-6 text-3xl font-bold">Create an Event</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create an event and bring your community together.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6"
        >
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Event Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter event title"
              minLength={5}
              maxLength={100}
              required
              className="w-full rounded-lg border border-border bg-background p-3"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your event"
              minLength={20}
              rows={5}
              required
              className="w-full rounded-lg border border-border bg-background p-3"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className="w-full rounded-lg border border-border bg-background p-3"
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

          <div>
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Event Image URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              required
              className="w-full rounded-lg border border-border bg-background p-3"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter event location"
              required
              className="w-full rounded-lg border border-border bg-background p-3"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="eventDate"
                className="mb-2 block text-sm font-medium"
              >
                Event Date
              </label>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                required
                className="w-full rounded-lg border border-border bg-background p-3"
              />
            </div>

            <div>
              <label
                htmlFor="eventTime"
                className="mb-2 block text-sm font-medium"
              >
                Event Time
              </label>
              <input
                id="eventTime"
                name="eventTime"
                type="time"
                required
                className="w-full rounded-lg border border-border bg-background p-3"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => router.push("/upcoming-events")}
              disabled={isSubmitting}
              className="rounded-lg border border-border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="rounded-lg bg-sky-500 px-5 py-3 font-medium text-white hover:bg-sky-600 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
