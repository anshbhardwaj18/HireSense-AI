"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const matchingSkills = [
  "Python",
  "FastAPI",
  "React",
  "PostgreSQL",
  "REST APIs",
];

const missingSkills = ["AWS", "Kubernetes"];

export default function JobMatching() {
  return (
    <section
      id="job-matching"
      className="relative overflow-hidden bg-[#050713] px-6 py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <BriefcaseBusiness size={15} />
            Intelligent Job Matching
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Find Out How Well You{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Match the Job
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Compare your resume with any job description and instantly
            understand where you stand.
          </p>
        </div>

        {/* Main comparison */}
        <div className="mt-20 grid gap-6 lg:grid-cols-12">
          {/* Resume */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 lg:col-span-5 lg:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <BriefcaseBusiness
                  size={21}
                  className="text-violet-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Your Resume
                </p>
                <p className="text-xs text-slate-500">
                  Software Developer
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#080a18] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Experience
                </span>
                <span className="text-sm text-slate-300">
                  2+ Years
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Primary Role
                </span>
                <span className="text-sm text-slate-300">
                  Full Stack Developer
                </span>
              </div>

              <div className="mt-5">
                <span className="text-xs text-slate-500">
                  Core Skills
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                  {matchingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-violet-500/15 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Match score */}
          <div className="relative flex items-center justify-center lg:col-span-2">
            <div className="absolute hidden h-px w-full bg-gradient-to-r from-violet-500/20 via-blue-500/40 to-violet-500/20 lg:block" />

            <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-blue-500/20 bg-[#080a18] shadow-[0_0_50px_rgba(59,130,246,0.12)]">
              <p className="text-3xl font-bold text-white">92%</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-emerald-400">
                Match
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 lg:col-span-5 lg:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <BriefcaseBusiness
                  size={21}
                  className="text-blue-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Target Job
                </p>
                <p className="text-xs text-slate-500">
                  Senior Full Stack Engineer
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#080a18] p-5">
              <p className="text-xs leading-6 text-slate-500">
                Looking for a developer experienced in building scalable
                applications using modern backend and frontend
                technologies.
              </p>

              <div className="mt-5">
                <span className="text-xs text-slate-500">
                  Required Skills
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Python",
                    "FastAPI",
                    "React",
                    "PostgreSQL",
                    "AWS",
                    "Kubernetes",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-blue-500/15 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Matching skills */}
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.025] p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={20}
                className="text-emerald-400"
              />

              <h3 className="text-sm font-semibold text-white">
                Matching Skills
              </h3>

              <span className="ml-auto text-xs text-emerald-400">
                5 found
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {matchingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing skills */}
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.025] p-6">
            <div className="flex items-center gap-3">
              <XCircle size={20} className="text-amber-400" />

              <h3 className="text-sm font-semibold text-white">
                Skills to Improve
              </h3>

              <span className="ml-auto text-xs text-amber-400">
                2 missing
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-amber-500/15 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI recommendation */}
        <div className="mt-8 rounded-3xl border border-violet-500/15 bg-gradient-to-r from-violet-500/[0.08] to-blue-500/[0.04] p-6 lg:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
              <Sparkles size={21} className="text-violet-400" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                AI Career Recommendation
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-400">
                You are a strong match for this role. Focus on improving
                AWS and Kubernetes to increase your chances of getting
                shortlisted.
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-500/10">
              View Insights
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}