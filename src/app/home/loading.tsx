export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-0 lg:pl-64 overflow-x-hidden">
      <header className="lg:hidden bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2.5 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="h-6 w-28 rounded bg-gray-200" />
        </div>
      </header>

      <div className="hidden lg:block px-8 py-6 animate-pulse space-y-2">
        <div className="h-4 w-40 rounded bg-gray-200" />
        <div className="h-8 w-72 rounded bg-gray-200" />
      </div>

      <main className="w-full px-4 py-6 max-w-full mx-auto lg:px-8 lg:py-8 overflow-x-hidden">
        <div className="w-full max-w-full grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr] lg:items-start animate-pulse">
          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />
        </div>
      </main>
    </div>
  );
}
