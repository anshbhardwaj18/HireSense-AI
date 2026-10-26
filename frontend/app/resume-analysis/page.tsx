"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Lightbulb,
  Loader2,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

/* =========================================================
   TYPES
========================================================= */

type SkillGap = {
  skill: string;
  proficiency: string;
  years: number;
};

type AnalysisResult = {
  score?: number;
  summary?: string;

  // Backend is returning strings for skills
  skills?: string[];

  missing_skills?: string[];
  strengths?: string[];
  suggestions?: string[];
  recommended_roles?: string[];
  interview_question?: string[];

  skill_gep?: (SkillGap | string)[];
  skill_gap?: (SkillGap | string)[];
};

type AnalysisResponse = {
  id: number;
  ats_score: number | null;
  analysis_result: AnalysisResult | null;
};

/* =========================================================
   COMPONENT
========================================================= */

function ResumeAnalysisContent() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resume_id");
  const router = useRouter();

  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH ANALYSIS
  ========================================================= */

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!resumeId) {
        setError("Resume ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Please login again.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(
          `${apiUrl}/resume/${resumeId}/analysis`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to fetch resume analysis.",
          );
        }

        setAnalysis(data);
      } catch (error) {
        console.error("Analysis error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading analysis.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resumeId]);

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-20 text-white">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center py-32 text-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-violet-500/10" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-500/20 bg-violet-500/10 shadow-2xl shadow-violet-600/20">
              <Sparkles className="h-9 w-9 animate-pulse text-violet-400" />
            </div>
          </div>

          <h2 className="mt-8 animate-pulse text-2xl font-semibold">
            Analyzing your resume...
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            HireSense AI is reviewing your skills, experience and career
            profile.
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating personalized insights
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR STATE
  ========================================================= */

  if (error) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-20 text-white">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-2xl pt-32">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.05] p-8 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
              <FileText className="h-7 w-7 text-red-400" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Unable to load analysis
            </h2>

            <p className="mt-2 text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     DATA
  ========================================================= */

  const result = analysis?.analysis_result;

  const score = analysis?.ats_score ?? result?.score ?? 0;

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[500px] h-[500px] w-[500px] rounded-full bg-blue-600/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="animate-[fadeIn_0.5s_ease-out]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <button
                onClick={() => router.push("/dashboard/resume-analyzer")}
                className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Resume Analyzer
              </button>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs font-medium text-violet-300">
                <Sparkles className="h-3.5 w-3.5" />
                AI Resume Analysis
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Resume Analysis
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Get personalized insights, skill gaps and interview
                preparation powered by HireSense AI.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Analysis complete
            </div>
          </div>
        </div>

        {/* =====================================================
            TOP SECTION
        ===================================================== */}

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">

          {/* ATS SCORE */}

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-violet-500/20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl transition duration-500 group-hover:bg-violet-600/20" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                  <Award className="h-5 w-5 text-violet-400" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-300">
                    ATS Score
                  </p>

                  <p className="text-xs text-gray-600">
                    Resume compatibility
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-8">

                {/* Score Ring */}

                <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(rgb(139 92 246) ${
                        score * 3.6
                      }deg, rgba(255,255,255,0.05) ${score * 3.6}deg)`,
                    }}
                  />

                  <div className="absolute inset-[7px] rounded-full bg-slate-950" />

                  <div className="relative text-center">
                    <div className="text-3xl font-bold">
                      {score}
                    </div>

                    <div className="text-xs text-gray-600">
                      / 100
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Your resume scored
                  </p>

                  <p className="mt-1 text-2xl font-bold text-white">
                    {score >= 80
                      ? "Excellent"
                      : score >= 65
                        ? "Good"
                        : score >= 50
                          ? "Average"
                          : "Needs Improvement"}
                  </p>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-gray-600">
                    Improve the highlighted areas below to increase
                    your chances with ATS systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RECOMMENDED ROLES */}

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-blue-500/20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <BriefcaseBusiness className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Recommended Roles
                  </h2>

                  <p className="text-xs text-gray-600">
                    Based on your profile
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {result?.recommended_roles?.length ? (
                  result.recommended_roles.map((role, index) => (
                    <div
                      key={index}
                      className="group/role flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/10 p-4 transition hover:border-blue-500/20 hover:bg-blue-500/[0.05]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                        <Zap className="h-4 w-4 text-blue-400" />
                      </div>

                      <span className="text-sm text-gray-300 transition group-hover/role:text-white">
                        {role}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No recommended roles found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:border-white/15">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <UserRound className="h-5 w-5 text-violet-400" />
            </div>

            <div>
              <h2 className="font-semibold">
                Resume Summary
              </h2>

              <p className="text-xs text-gray-600">
                AI-generated profile overview
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-5xl text-sm leading-7 text-gray-400">
            {result?.summary || "No summary available."}
          </p>
        </section>

        {/* =====================================================
            SKILLS
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Skills */}

          <section className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-emerald-500/20">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <Target className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Your Skills
                </h2>

                <p className="text-xs text-gray-600">
                  Detected from your resume
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {result?.skills?.length ? (
                result.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3.5 py-2 text-xs font-medium text-emerald-300 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500/[0.15]"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No skills found.
                </p>
              )}
            </div>
          </section>

          {/* Missing Skills */}

          <section className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-orange-500/20">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <TrendingUp className="h-5 w-5 text-orange-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Missing Skills
                </h2>

                <p className="text-xs text-gray-600">
                  Skills that could strengthen your profile
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {result?.missing_skills?.length ? (
                result.missing_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-orange-500/20 bg-orange-500/[0.08] px-3.5 py-2 text-xs font-medium text-orange-300 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500/[0.15]"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No missing skills found.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* =====================================================
            STRENGTHS + SUGGESTIONS
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Strengths */}

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:border-emerald-500/20">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Your Strengths
                </h2>

                <p className="text-xs text-gray-600">
                  What your resume does well
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {result?.strengths?.length ? (
                result.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-4 transition duration-300 hover:border-emerald-500/15 hover:bg-emerald-500/[0.03]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                    <p className="text-sm leading-6 text-gray-400">
                      {strength}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No strengths found.
                </p>
              )}
            </div>
          </section>

          {/* Suggestions */}

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:border-yellow-500/20">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  AI Suggestions
                </h2>

                <p className="text-xs text-gray-600">
                  Improve your resume
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {result?.suggestions?.length ? (
                result.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-4 transition duration-300 hover:border-yellow-500/15 hover:bg-yellow-500/[0.03]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-xs font-semibold text-yellow-400">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-gray-400">
                      {suggestion}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No suggestions available.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* =====================================================
            SKILL GAP
        ===================================================== */}

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:border-cyan-500/20">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
              <Target className="h-5 w-5 text-cyan-400" />
            </div>

            <div>
              <h2 className="font-semibold">
                Skill Gap Analysis
              </h2>

              <p className="text-xs text-gray-600">
                Areas to focus on next
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">

            {(() => {
              const gaps = result?.skill_gap || result?.skill_gep;
              if (gaps && gaps.length > 0) {
                return gaps.map((gap, index) => {
                  const isObj = typeof gap === "object" && gap !== null;
                  const skillName = isObj ? (gap as SkillGap).skill : String(gap);
                  const proficiency = isObj && (gap as SkillGap).proficiency ? (gap as SkillGap).proficiency : null;
                  const years = isObj ? (gap as SkillGap).years : null;

                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03] p-4 transition duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/[0.06]"
                    >
                      <p className="text-sm font-medium text-cyan-300">
                        {skillName}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                        {proficiency && (
                          <span>
                            Proficiency:{" "}
                            <span className="font-medium text-gray-300">
                              {proficiency}
                            </span>
                          </span>
                        )}

                        {years !== null && years !== undefined && (
                          <span>
                            Experience:{" "}
                            <span className="font-medium text-gray-300">
                              {years}{" "}
                              {years === 1 ? "year" : "years"}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                });
              }
              return (
                <p className="text-sm text-gray-500">
                  No skill gap information available.
                </p>
              );
            })()}

          </div>
        </section>

        {/* =====================================================
            INTERVIEW QUESTIONS
        ===================================================== */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-pink-500/10 bg-gradient-to-br from-pink-500/[0.04] via-white/[0.03] to-violet-500/[0.04] p-7 backdrop-blur-xl">

          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-600/10 blur-3xl" />

          <div className="relative">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10">
                  <MessageSquare className="h-5 w-5 text-pink-400" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Interview Preparation
                  </h2>

                  <p className="text-xs text-gray-600">
                    Personalized questions based on your resume
                  </p>
                </div>

              </div>

              {result?.interview_question?.length ? (
                <span className="rounded-full border border-pink-500/20 bg-pink-500/[0.08] px-3 py-1.5 text-xs font-medium text-pink-300">
                  {result.interview_question.length} Questions
                </span>
              ) : null}

            </div>

            <div className="mt-6 space-y-3">

              {result?.interview_question?.length ? (
                result.interview_question.map((question, index) => (
                  <div
                    key={index}
                    className="group/question flex gap-4 rounded-2xl border border-white/[0.07] bg-black/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-500/20 hover:bg-pink-500/[0.04]"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-xs font-bold text-pink-400 transition duration-300 group-hover/question:scale-110">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <p className="pt-1 text-sm leading-6 text-gray-300">
                      {question}
                    </p>

                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-6">
                  <p className="text-sm text-gray-500">
                    No interview questions available.
                  </p>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="flex items-center justify-center gap-2 py-10 text-xs text-gray-700">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by HireSense AI
        </div>

      </div>

    </main>
  );
}

export default function ResumeAnalysisPage() {
  return (
    <ProtectedRoute>
      <ResumeAnalysisContent />
    </ProtectedRoute>
  );
}