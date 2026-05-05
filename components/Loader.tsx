"use client";

export default function Loader() {
  return (
    <div className="p-6 space-y-6 animate-pulse">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl h-24" />

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-4">

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow space-y-4"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="space-y-2 w-full">
                <div className="h-3 bg-gray-300 rounded w-1/2" />
                <div className="h-2 bg-gray-200 rounded w-1/3" />
              </div>
            </div>

            {/* Problem */}
            <div className="h-3 bg-gray-300 rounded w-3/4" />

            {/* Date time */}
            <div className="h-2 bg-gray-200 rounded w-1/2" />

            {/* Button */}
            <div className="h-8 bg-gray-300 rounded w-24" />
          </div>
        ))}

      </div>
    </div>
  );
}