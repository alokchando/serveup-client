
import { EventItem } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ data }: { data: EventItem }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={data.image}
          alt={data.title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/90 px-3 py-1 text-xs font-semibold text-sky-600 shadow-sm backdrop-blur">
          {data.category}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">

        <h2 className="line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
          {data.title}
        </h2>

        <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-2">
            <span className="text-sky-500">📍</span>
            <span className="line-clamp-1">{data.location}</span>
          </p>

          <p className="flex items-center gap-2">
            <span className="text-sky-500">📅</span>
            {data.eventDate}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link
            href={`/events/${data._id}`}
            className="block w-full rounded-xl bg-sky-500 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            View Event →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default EventCard;
