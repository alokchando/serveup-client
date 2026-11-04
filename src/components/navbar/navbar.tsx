"use client";
import Link from "next/link";
import {
  CalendarDays,
  Plus,
  Settings,
  Users,
  LogIn,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ThemeToggle from "../theme-toggle";

const Navbar = () => {
  // TODO: Replace these demo values with your authentication session.
  // const isLoggedIn = !!session?.user;
  // const user = session?.user;
  const { data: session } = useSession();
  const router = useRouter()
  const isLoggedIn = !!session?.user;
  const user = session?.user;
  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logout successfully!");
    router.push("/login");
  router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-500/20">
            <CalendarDays className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Serve<span className="text-sky-500">Up</span>
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Upcoming Events */}
          <Link
            href="/upcoming-events"
            className="hidden items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-400 sm:flex"
          >
            Upcoming Events
          </Link>

        <ThemeToggle/>

          {/* Conditional Authentication */}
          {!isLoggedIn ? (
            // TODO: Connect to your authentication login route.
            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-sky-500 px-5 text-sm font-semibold text-white shadow-sm shadow-sky-500/20 transition-all hover:bg-sky-600 hover:shadow-md"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              {/* Profile Picture & Display Name */}
              <div
                tabIndex={0}
                role="button"
                title={user?.name}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 transition-colors hover:border-sky-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-sky-800 dark:hover:bg-slate-900"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full bg-sky-100 dark:bg-sky-950">
                  {user?.image ? (
                    <Image
                      width={36}
                      height={36}
                      src={user?.image}
                      alt={user?.name}
                      className="?h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-semibold text-sky-600 dark:text-sky-400">
                      {user?.name.charAt(0)}
                    </span>
                  )}
                </div>

                <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-700 dark:text-slate-200 sm:block">
                  {user?.name}
                </span>

                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </div>

              {/* Profile Dropdown */}
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20"
              >
                {/* User Information */}
                <li className="menu-title px-3 py-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.name}
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    Welcome to ServeUp
                  </span>
                </li>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                {/* Create Event */}
                <li>
                  <Link
                    href="/create-event"
                    className="gap-3 rounded-xl py-2.5 text-slate-700 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
                  >
                    <Plus className="h-4 w-4" />
                    Create Event
                  </Link>
                </li>

                {/* Manage Events */}
                <li>
                  <Link
                    href="/manage-events"
                    className="gap-3 rounded-xl py-2.5 text-slate-700 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
                  >
                    <Settings className="h-4 w-4" />
                    Manage Events
                  </Link>
                </li>

                {/* Joined Events */}
                <li>
                  <Link
                    href="/joined-events"
                    className="gap-3 rounded-xl py-2.5 text-slate-700 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
                  >
                    <Users className="h-4 w-4" />
                    Joined Events
                  </Link>
                </li>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                {/* TODO: Connect your authentication logout function. */}
                <li>
                  <button onClick={handleLogout} className="gap-3 rounded-xl py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
