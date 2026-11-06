
import Link from "next/link";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <FileQuestion size={70} className="text-sky-500" />

      <h1 className="text-4xl font-bold">404</h1>

      <h2 className="text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="text-gray-500">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="rounded-lg bg-sky-500 px-6 py-3 text-white hover:bg-sky-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
