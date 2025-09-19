export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-xl shadow bg-gray-200 animate-pulse"
        >
          <div className="h-4 bg-gray-300 mb-2 rounded" />
          <div className="h-3 bg-gray-300 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}
