"use client";

import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#050713] px-6 py-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-blue-500/[0.08] px-6 py-16 text-center shadow-2xl shadow-violet-950/20 md:px-12">
          
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Sparkles size={15} />
            Start Your Career Journey
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            Your Next Opportunity
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Starts With Your Resume
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Let HireSense AI analyze your resume, identify your skill gaps,
            match you with opportunities, and help you become
            career-ready.
          </p>

          {/* CTA Button */}
          <div className="mt-9 flex justify-center">
            <button className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/20">
              Analyze My Resume

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              "AI-Powered Analysis",
              "Job Matching",
              "Career Insights",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <CheckCircle2
                  size={14}
                  className="text-emerald-400"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}