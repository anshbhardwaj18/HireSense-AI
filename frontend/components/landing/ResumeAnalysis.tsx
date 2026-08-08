"use client";

import {
  BrainCircuit,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Target,
  AlertCircle,
} from "lucide-react";

const skills = [
  "Python",
  "FastAPI",
  "React",
  "PostgreSQL",
  "Docker",
  "Git",
];

const missingSkills = ["AWS", "Redis", "Kubernetes"];

export default function ResumeAnalysis() {
  return (
    <section
      id="analysis"
      className="relative overflow-hidden bg-[#050713] px-6 py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-180px] top-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-180px] bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Sparkles size={15} />
            AI-Powered Resume Intelligence
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Understand Your Resume{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            HireSense AI analyzes your resume and turns it into clear,
            actionable career insights.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-[#080a18] shadow-2xl shadow-violet-950/20">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                <BrainCircuit
                  size={21}
                  className="text-violet-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Resume Analysis
                </p>
                <p className="text-xs text-slate-500">
                  AI-generated career insights
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Analysis Complete
            </div>
          </div>

          {/* Dashboard */}
          <div className="grid gap-6 p-6 lg:grid-cols-12 lg:p-8">
            {/* ATS Score */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 lg:col-span-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">ATS Score</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Resume compatibility
                  </p>
                </div>

                <Target size={20} className="text-violet-400" />
              </div>

              <div className="mt-8 flex items-center justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-violet-500/15">
                  <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-violet-500 border-r-violet-400 rotate-[35deg]" />

                  <div className="text-center">
                    <p className="text-5xl font-bold text-white">87</p>
                    <p className="mt-1 text-xs text-slate-500">
                      out of 100
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-center gap-2 text-sm text-emerald-400">
                <TrendingUp size={16} />
                Excellent match
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                  <CheckCircle2
                    size={18}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Skills Detected
                  </p>
                  <p className="text-xs text-slate-500">
                    6 relevant skills
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-blue-500/15 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-xs text-slate-500">
                  Your strongest area
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-white">
                    Backend Development
                  </span>

                  <span className="text-sm font-semibold text-violet-400">
                    92%
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                </div>
              </div>
            </div>

            {/* Missing Skills */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <AlertCircle
                    size={18}
                    className="text-amber-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Skill Gap
                  </p>
                  <p className="text-xs text-slate-500">
                    Areas to improve
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {missingSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-sm text-slate-300">
                      {skill}
                    </span>

                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] text-amber-400">
                      Learn
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.08] to-blue-500/[0.04] p-6 lg:col-span-12">
              <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                  <Sparkles
                    size={20}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    AI Recommendation
                  </p>

                  <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-400">
                    Your backend development profile is strong. Adding
                    cloud technologies like AWS and container orchestration
                    skills could significantly improve your opportunities
                    for modern full-stack and backend roles.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
                      Improve AWS
                    </span>

                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300">
                      Learn Kubernetes
                    </span>

                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
                      Strong Backend Profile
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-slate-500">
            Powered by AI-driven resume analysis
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            Skills
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            ATS
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            Career Insights
          </div>
        </div>
      </div>
    </section>
  );
}