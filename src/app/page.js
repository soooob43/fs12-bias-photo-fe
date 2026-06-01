export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10 text-neutral-950">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center gap-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
          FS12 중급 프로젝트
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            최애의 포토
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-medium text-neutral-700">
          <span className="rounded-md border border-neutral-200 bg-white px-3 py-2">
            Next.js App Router
          </span>
          <span className="rounded-md border border-neutral-200 bg-white px-3 py-2">
            JavaScript
          </span>
          <span className="rounded-md border border-neutral-200 bg-white px-3 py-2">
            Tailwind CSS
          </span>
          <span className="rounded-md border border-neutral-200 bg-white px-3 py-2">
            React Query
          </span>
        </div>
      </section>
    </main>
  );
}
