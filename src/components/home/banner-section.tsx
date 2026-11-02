import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  HandHeart,
  Users,
  Heart,
  Handshake,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const communityStats = [
  {
    icon: CalendarCheck,
    value: "500+",
    label: "Events Hosted",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Community Members",
  },
  {
    icon: Heart,
    value: "1M+",
    label: "Hours of Service",
  },
  {
    icon: Handshake,
    value: "Together",
    label: "We Make a Difference",
  },
];

export default function BannerSection() {
  return (
    <section className="relative overflow-hidden bg-sky-50 dark:bg-slate-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/10" />

      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Banner content */}
          <div className="max-w-2xl">
            {/* Small badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm dark:border-sky-800 dark:bg-slate-900/80 dark:text-sky-300">
              <HandHeart className="h-4 w-4" />
              Together, We Can Make a Difference
            </div>

            {/* Main heading */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Together for a{" "}
              <span className="text-sky-500">Better Community</span>
            </h1>

            {/* Supporting description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              Discover meaningful events, volunteer for social causes, and
              connect with people who believe in creating a better world. Every
              small action can make a big difference.
            </p>

            {/* Call-to-action buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/upcoming-events">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-sky-500 px-7 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-xl"
                >
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-sky-300 bg-white/70 px-7 text-base font-semibold text-sky-700 hover:bg-sky-100 hover:text-sky-800 dark:border-sky-800 dark:bg-slate-900/70 dark:text-sky-300 dark:hover:bg-slate-800 dark:hover:text-sky-200"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Our Community
                </Button>
              </Link>
            </div>

            {/* Small trust indicator */}
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-sky-50 bg-sky-200 text-sky-700 dark:border-slate-950 dark:bg-sky-900 dark:text-sky-200">
                  <Heart className="h-4 w-4" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-sky-50 bg-blue-200 text-blue-700 dark:border-slate-950 dark:bg-blue-900 dark:text-blue-200">
                  <Users className="h-4 w-4" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-sky-50 bg-cyan-200 text-cyan-700 dark:border-slate-950 dark:bg-cyan-900 dark:text-cyan-200">
                  <HandHeart className="h-4 w-4" />
                </div>
              </div>

              <p>Be part of something meaningful.</p>
            </div>
          </div>

          {/* Right: Community image */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* Image background decoration */}
            <div className="absolute -inset-4 rounded-[2rem] bg-sky-200/60 rotate-3 dark:bg-sky-500/10" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white shadow-2xl shadow-sky-900/10 dark:border-slate-800 dark:bg-slate-900">
              {/* Replace this file with your own community-service image */}
              <Image
                src="/community-volunteers.jpg"
                alt="Volunteers working together to support their community"
                width={900}
                height={1000}
                priority
                className="aspect-[4/4.2] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Image overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-sky-300">
                      Small Actions. Big Impact.
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                      Change Starts With Us
                    </h2>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-200">
                      Connect, contribute, and build a stronger community
                      together.
                    </p>
                  </div>

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white sm:flex">
                    <HandHeart className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating community badge */}
            <div className="absolute -left-4 top-8 flex items-center gap-3 rounded-2xl border border-sky-100 bg-white p-3 shadow-lg sm:-left-8 sm:p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                <Heart className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Spread Kindness
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Inspire positive change
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community statistics */}
        <div className="mt-20 rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-lg shadow-sky-900/5 backdrop-blur-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="grid grid-cols-2 gap-y-7 lg:grid-cols-4">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 px-2 sm:gap-4 sm:px-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div>
                    <p className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                      {stat.label}
                    </p>
                  </div>

                  {/* Visual separator between statistics */}
                  {index !== communityStats.length - 1 && index % 2 === 0 && (
                    <Separator
                      orientation="vertical"
                      className="ml-auto hidden h-12 lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
