"use client";

import {
  Brain,
  FileSearch,
  Target,
  TrendingUp,
  BriefcaseBusiness,
  MessageSquareText,
  ArrowUpRight,
} from "lucide-react";

const feature = [
  {
    icon: Brain,
    title: "AI Resume Analysis",
    description:
      "Get an intelligent analysis of your resume with AI-powered insights, strengths, weaknesses, and actionable suggestions.",
    tag: "AI Powered",
  },
  {
    icon: Target,
    title: "ATS Score Optimization",
    description:
      "Understand how ATS systems evaluate your resume and discover practical ways to improve your score.",
    tag: "ATS Ready",
  },
  {
    icon: FileSearch,
    title: "Job Description Matching",
    description:
      "Compare your resume with any job description and discover how well your profile matches the role.",
    tag: "Smart Matching",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Detection",
    description:
      "Identify missing skills and technologies that could improve your chances of landing your target role.",
    tag: "Skill Insights",
  },
  {
    icon: BriefcaseBusiness,
    title: "Recommended Roles",
    description:
      "Discover career roles that align with your skills, experience, and resume profile.",
    tag: "Career Guide",
  },
  {
    icon: MessageSquareText,
    title: "AI Interview Questions",
    description:
      "Prepare smarter with personalized interview questions generated from your resume and target role.",
    tag: "Interview Prep",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050713] px-6 py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]" />
            Powerful AI Features
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            HireSense AI combines resume intelligence, job matching, and
            career insights to help you build a stronger path to your next
            opportunity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {feature.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/30 hover:bg-violet-500/[0.04] hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]"
                style={{
                  animation: `featureFadeUp 0.7s ease-out ${
                    index * 100
                  }ms both`,
                }}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/[0.08] via-transparent to-blue-500/[0.05] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-violet-500/20 group-hover:text-violet-300">
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-slate-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-400"
                    />
                  </div>

                  {/* Tag */}
                  <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-400">
                    {feature.tag}
                  </span>

                  {/* Content */}
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>

                  {/* Bottom line */}
                  <div className="mt-7 h-px w-0 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes featureFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}