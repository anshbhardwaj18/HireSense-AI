import Link from "next/link";
import { Home, LayoutDashboard, Sparkles } from "lucide-react";

export const metadata = {
  title: "Page Not Found — HireSense AI",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-80px] top-[60%] h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-500/20 bg-violet-500/10 shadow-2xl shadow-violet-600/20">
          <Sparkles className="h-11 w-11 text-violet-400" />
        </div>

        {/* 404 Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-slate-400">
          Error 404
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-5 text-base leading-7 text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>

          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:opacity-90 sm:w-auto"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
