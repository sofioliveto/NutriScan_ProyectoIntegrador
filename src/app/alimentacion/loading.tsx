export default function AlimentacionLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-0 lg:pl-64 overflow-x-hidden">
      <header className="lg:hidden bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2.5 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="h-6 w-28 rounded bg-gray-200" />
        </div>
      </header>

      <div className="hidden lg:block px-8 py-6 animate-pulse">
        <div className="h-8 w-64 rounded bg-gray-200" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 lg:px-6 py-4 space-y-4 animate-pulse">
        <div className="h-28 rounded-2xl bg-gray-200" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-gray-200" />
          ))}
        </div>
        <div className="h-10 rounded-xl bg-gray-200" />
        <div className="h-24 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}
