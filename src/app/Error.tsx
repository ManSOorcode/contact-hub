"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-red-500">⚠️ Failed to load contacts</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
