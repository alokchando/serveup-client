"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Eye,
  EyeOff,
  Image,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Check all password requirements.
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinimumLength = password.length >= 6;
  const router = useRouter();
  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate the password before submitting the form.
    if (!hasUppercase || !hasLowercase || !hasMinimumLength) {
      setPasswordError(
        "Password must contain an uppercase letter, a lowercase letter, and at least 6 characters.",
      );
      return;
    }
    setPasswordError("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const photoURL = String(formData.get("photoURL") ?? "").trim();
    const passwordValue = String(formData.get("password") ?? "");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password: passwordValue,
      image: photoURL,
    });
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created successfully!");

    router.push("/");
    // TODO: Add your registration authentication logic here.
    // 1. Get name, email, photoURL, and password from FormData.
    // 2. Send the information to your authentication provider.
    // 3. Handle registration errors, such as an existing email.

    // 4. Redirect the user after successful registration.
  }
  const handleGoogleSignup = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sky-50 px-4 py-10 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/10" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-500/10" />

      {/* Registration card */}
      <section className="relative w-full max-w-md rounded-2xl border border-sky-200/80 bg-white/95 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-sm sm:p-9 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        {/* ServeUp branding */}
        <Link
          href="/"
          className="mb-7 flex items-center justify-center gap-3"
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
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Join ServeUp and start your journey.
          </p>
        </div>

        {/* Registration form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-11 border-sky-100 bg-white pl-10 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
          </div>

          {/* Email field */}
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

          {/* Profile photo URL field */}
          <div className="space-y-2">
            <Label htmlFor="photoURL">Profile photo URL</Label>

            <div className="relative">
              <Image className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="photoURL"
                name="photoURL"
                type="url"
                placeholder="https://example.com/photo.jpg"
                required
                className="h-11 border-sky-100 bg-white pl-10 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter a direct URL to your profile photo.
            </p>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError("");
                }}
                required
                aria-invalid={Boolean(passwordError)}
                aria-describedby="password-requirements"
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

            {/* Display password requirements */}
            <div id="password-requirements" className="space-y-1 pt-1 text-xs">
              <p
                className={
                  hasMinimumLength
                    ? "text-green-600 dark:text-green-400"
                    : "text-slate-500 dark:text-slate-400"
                }
              >
                {hasMinimumLength ? "✓" : "○"} At least 6 characters
              </p>

              <p
                className={
                  hasUppercase
                    ? "text-green-600 dark:text-green-400"
                    : "text-slate-500 dark:text-slate-400"
                }
              >
                {hasUppercase ? "✓" : "○"} One uppercase letter (A–Z)
              </p>

              <p
                className={
                  hasLowercase
                    ? "text-green-600 dark:text-green-400"
                    : "text-slate-500 dark:text-slate-400"
                }
              >
                {hasLowercase ? "✓" : "○"} One lowercase letter (a–z)
              </p>
            </div>

            {/* Password validation error */}
            {passwordError && (
              <p role="alert" className="text-sm text-red-500">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit registration form */}
          <Button
            type="submit"
            className="h-11 w-full bg-sky-500 font-semibold text-white shadow-md shadow-sky-500/20 transition-colors hover:bg-sky-600"
          >
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-slate-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500/50 dark:hover:bg-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="mr-2 h-5 w-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.72 7.18l7.98 6.19c4.66-4.3 7.78-10.63 7.78-17.84z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.55 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.98-6.19c-2.21 1.49-5.05 2.37-7.92 2.37-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </Button>
        </form>

        {/* Link to login page */}
        <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
