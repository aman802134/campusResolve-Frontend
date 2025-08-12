// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-8xl font-extrabold text-red-500 drop-shadow-lg">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-400 max-w-md text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg shadow-lg transition-transform transform hover:scale-105 font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
}
