import { EventItem } from "@/lib/type";
import Image from "next/image";

const PastEventGallery = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/pastevents`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch event gallery");
  }

  const events: EventItem[] = await response.json();

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Moments That Matter
        </h2>

        <p className="mt-3 text-muted-foreground">
          A glimpse of the positive changes our community creates together.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-white">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-white/80">{event.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-muted-foreground">
          No event photographs available yet.
        </p>
      )}
    </section>
  );
};

export default PastEventGallery;
