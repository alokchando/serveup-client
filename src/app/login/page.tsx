"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // TODO: Connect your authentication provider here.
  // Add loading and error states when implementing authentication.

  const router = useRouter();
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Implement email/password authentication.
    // 1. Read email and password using FormData.
    // 2. Send credentials to your authentication provider.
    // 3. Handle invalid credentials and server errors.
    // 4. Redirect the user after successful login.

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const passwordValue = String(formData.get("password") ?? "");

    const { error } = await authClient.signIn.email({
      email,
      password: passwordValue,
    });
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login successfully!");

    router.push("/");
  }

  async function handleGoogleLogin() {
    // TODO: Integrate Google OAuth with your authentication provider.
    // Handle the OAuth callback and authentication errors.

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sky-50 px-4 py-10 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      {/* Decorative sky-blue background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/10" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-500/10" />

      {/* Main login card */}
      <section className="relative w-full max-w-md rounded-2xl border border-sky-200/80 bg-white/95 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-sm sm:p-9 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        {/* ServeUp branding */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
          aria-label="ServeUp home"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
            <CalendarCheck className="h-7 w-7" />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Serve<span className="text-sky-500">Up</span>
          </span>
        </Link>

        {/* Page heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Sign in to your ServeUp account to continue.
          </p>
        </div>

        {/* Email and password form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11 border-sky-100 bg-white pl-10 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-11 border-sky-100 bg-white pl-10 pr-10 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-950"
              />

              {/* Toggle password visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-sky-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* TODO: Add a forgot-password link here if required. */}

          {/* Login submit button */}
          <Button
            type="submit"
            className="h-11 w-full bg-sky-500 font-semibold text-white shadow-md shadow-sky-500/20 transition-colors hover:bg-sky-600"
          >
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {/* Divider between login methods */}
        <div className="my-6 flex items-center gap-4">
          <Separator className="flex-1" />

          <span className="text-xs font-medium text-slate-400">
            OR CONTINUE WITH
          </span>

          <Separator className="flex-1" />
        </div>

        {/* Google authentication button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="h-11 w-full border-sky-100 bg-white font-medium hover:bg-sky-50 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {/* Google logo */}
          <svg viewBox="0 0 48 48" className="mr-2 h-5 w-5" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              transform="translate(0 4)"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.63 5.91c4.45-4.1 7.14-10.14 7.14-17.56Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.63-5.91c-2.13 1.43-4.86 2.27-8.27 2.27-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Registration page link */}
        <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
