"use client";

import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-sky-200/60 bg-sky-50 px-6 py-14 shadow-sm dark:border-sky-900/60 dark:bg-sky-950/40 sm:px-12 lg:px-16">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-300">
            <Sparkles className="h-4 w-4" />
            Stay Connected
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Make Every Good Deed
            <span className="block text-sky-600 dark:text-sky-400">
              Count With ServeUp
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Get updates about upcoming events, volunteer opportunities, and
            inspiring community stories delivered straight to your inbox.
          </p>

          {/* Newsletter form - UI only */}
          <div className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 rounded-full border-sky-200 bg-white pl-12 text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <Button
              type="button"
              className="h-12 rounded-full bg-sky-500 px-7 font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:bg-sky-600"
            >
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
            No spam, just meaningful updates. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}