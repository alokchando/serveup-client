
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Type,
  AlignLeft,
  Tag,
  ImagePlus,
  MapPin,
  CalendarDays,
  Clock,
  X,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type Event = {
    _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
};

const categories = [
  "Environment",
  "Education",
  "Health",
  "Community",
  "Animal Welfare",
  "Social Awareness",
  "Food & Hunger",
  "Other",
];

const getInitialData = (event: Event) => ({
  title: event.title || "",
  description: event.description || "",
  eventType: event.category || "",
  thumbnailImageUrl: event.image || "",
  location: event.location || "",
  eventDate: event.eventDate?.slice(0, 10) || "",
  eventTime: new Date(event.eventDate).toISOString().slice(0, 16),
});

const EditEventDialog = ({
  event,
  creatorEmail,
}: {
  event: Event;
  creatorEmail: string;
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(() =>
    getInitialData(event)
  );

  const handleOpen = (value: boolean) => {
    setOpen(value);

    if (value) {
      // Load the latest event data whenever the dialog opens
      setFormData(getInitialData(event));
      setError("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setError("");

     const token = await getTokenFromClient()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL }/events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...formData,
            creatorEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";

  const labelStyle =
    "mb-2 flex items-center gap-2 text-sm font-medium";

  return (
    <>
      <Button
        variant="outline"
        onClick={() => handleOpen(true)}
        className="gap-2 rounded-xl border-sky-200 text-sky-600 hover:bg-sky-50"
      >
        <Pencil size={15} />
        Edit Event
      </Button>

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-0 sm:max-w-xl">

          {/* Header */}
          <DialogHeader className="border-b border-border px-6 py-5 text-left sm:px-7">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-500">
              <Pencil size={17} />
              MANAGE YOUR EVENT
            </div>

            <DialogTitle className="text-2xl font-bold tracking-tight">
              Edit Event
            </DialogTitle>

            <DialogDescription className="text-sm leading-6 text-muted-foreground">
              Update your event information and keep your community informed.
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 px-6 py-6 sm:px-7">

              <div>
                <h3 className="text-lg font-semibold">
                  Event Information
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Update the details of your event.
                </p>
              </div>

              {/* Title */}
              <div>
                <label className={labelStyle}>
                  <Type size={16} className="text-sky-500" />
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Community Clean-up Day"
                  required
                  minLength={5}
                  maxLength={100}
                  className={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelStyle}>
                  <AlignLeft size={16} className="text-sky-500" />
                  Event Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell people what your event is about..."
                  required
                  minLength={20}
                  rows={5}
                  className={`${inputStyle} resize-none`}
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelStyle}>
                  <Tag size={16} className="text-sky-500" />
                  Event Category
                </label>

                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {/* Keep the existing category available */}
                  {!categories.includes(formData.eventType) &&
                    formData.eventType && (
                      <option value={formData.eventType}>
                        {formData.eventType}
                      </option>
                    )}

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className={labelStyle}>
                  <ImagePlus size={16} className="text-sky-500" />
                  Event Image URL
                </label>

                <input
                  type="url"
                  name="thumbnailImageUrl"
                  value={formData.thumbnailImageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/event-image.jpg"
                  required
                  className={inputStyle}
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Add a publicly accessible image URL.
                </p>
              </div>

              {/* Location */}
              <div>
                <label className={labelStyle}>
                  <MapPin size={16} className="text-sky-500" />
                  Event Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Sylhet, Bangladesh"
                  required
                  className={inputStyle}
                />
              </div>

              {/* Date and Time */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelStyle}>
                    <CalendarDays size={16} className="text-sky-500" />
                    Event Date
                  </label>

                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    <Clock size={16} className="text-sky-500" />
                    Event Time
                  </label>

                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/20 px-6 py-5 sm:flex-row sm:justify-end sm:px-7">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpen(false)}
                className="rounded-xl px-6"
                disabled={saving}
              >
                <X size={16} className="mr-2" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-sky-500 px-6 text-white hover:bg-sky-600"
              >
                <Pencil size={16} className="mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditEventDialog;
