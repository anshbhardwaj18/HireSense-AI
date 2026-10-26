"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ResumeUpload from "@/components/dashboard/ResumeUpload";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Skill = {
  skill: string;
  proficiency?: string;
  experience_years?: number;
  projects?: string[];
};

type AnalysisResult = {
  score?: number;
  summary?: string;
  skills?: (string | Skill)[];
  missing_skills?: string[];
  strengths?: string[];
  suggestions?: string[];
  recommended_roles?: string[];
  interview_question?: string[];
  skill_gep?: (string | any)[];
  skill_gap?: (string | any)[];
};

type ResumeAnalysis = {
  id: number;
  ats_score: number | null;
  analysis_result: AnalysisResult | null;
};

function ResumeAnalyzerContent() {
  const [resumeAnalysis, setResumeAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeAnalysis = async () => {
      try {
        const resumeId = localStorage.getItem("latest_resume_id");
        const token = localStorage.getItem("access_token");

        if (!resumeId || !token) {
          setLoading(false);
          return;
        }

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(
          `${apiUrl}/resume/${resumeId}/analysis`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to load resume analysis."
          );
        }

        setResumeAnalysis(data);
      } catch (error) {
        console.error("Resume analyzer error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeAnalysis();
  }, []);

  const analysis = resumeAnalysis?.analysis_result;

  const atsScore = resumeAnalysis?.ats_score ?? 0;

  const skills = analysis?.skills ?? [];
  const strengths = analysis?.strengths ?? [];
  const missingSkills = analysis?.missing_skills ?? [];
  const suggestions = analysis?.suggestions ?? [];
  const recommendedRoles = analysis?.recommended_roles ?? [];

  const jobReadiness =
    resumeAnalysis?.ats_score != null
      ? Math.max(
          0,
          Math.min(
            100,
            resumeAnalysis.ats_score - missingSkills.length * 2
          )
        )
      : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[5%] top-[-180px] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="absolute right-[-120px] top-[30%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* Main */}
      <div className="mx-auto max-w-[1450px] px-5 pb-20 pt-10 sm:px-7 lg:px-10 lg:pt-12">

        {/* Header */}
        <section className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI Resume Intelligence
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Resume Analyzer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Analyze your resume with AI, improve your ATS score, discover
            skill gaps and understand how ready you are for your next role.
          </p>
        </section>

        {/* Loading */}
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-xl">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet-500" />

            <p className="mt-4 text-sm text-slate-500">
              Loading your resume analysis...
            </p>
          </div>
        )}

        {/* No Resume */}
        {!loading && !resumeAnalysis && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl sm:p-12">
            <div className="mx-auto max-w-xl text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/20 bg-violet-500/10">
                <FileText className="h-9 w-9 text-violet-400" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                No Resume Analyzed Yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Upload your resume and let HireSense AI analyze your ATS
                score, skills, strengths and areas that need improvement.
              </p>

              <div className="mx-auto mt-7 max-w-md">
                <ResumeUpload />
              </div>

            </div>
          </section>
        )}

        {/* Resume Exists */}
        {!loading && resumeAnalysis && (
          <>
            {/* Top Cards */}
            <section className="grid gap-5 md:grid-cols-3">

              {/* ATS */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-violet-400">
                    <Target className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-medium text-emerald-400">
                    AI Analyzed
                  </span>
                </div>

                <p className="mt-6 text-sm text-slate-600">
                  ATS Score
                </p>

                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {atsScore}
                  </span>

                  <span className="text-sm text-slate-600">
                    /100
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                    style={{
                      width: `${Math.min(atsScore, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-blue-400">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <span className="text-xs text-slate-600">
                    AI Detected
                  </span>
                </div>

                <p className="mt-6 text-sm text-slate-600">
                  Skills Detected
                </p>

                <p className="mt-1 text-4xl font-bold">
                  {skills.length}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  Technical and professional skills
                </p>
              </div>

              {/* Readiness */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-cyan-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <span className="text-xs text-slate-600">
                    Career Progress
                  </span>
                </div>

                <p className="mt-6 text-sm text-slate-600">
                  Job Readiness
                </p>

                <p className="mt-1 text-4xl font-bold">
                  {jobReadiness}%
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    style={{
                      width: `${jobReadiness}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Summary + Full Analysis */}
            <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

              {/* Summary */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-7">

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-400">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-600">
                      AI Assessment
                    </p>

                    <h2 className="text-xl font-bold">
                      Resume Summary
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-400">
                  {analysis?.summary ||
                    "Your resume has been analyzed by HireSense AI."}
                </p>

                <Link
                  href={`/resume-analysis?resume_id=${resumeAnalysis.id}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  View Full Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Resume Status */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-7">

                <p className="text-sm text-slate-600">
                  Resume Status
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Analysis Overview
                </h2>

                <div className="mt-6 space-y-4">

                  <StatusItem
                    label="ATS compatibility"
                    value={`${atsScore}/100`}
                    good={atsScore >= 60}
                  />

                  <StatusItem
                    label="Skills detected"
                    value={`${skills.length}`}
                    good={skills.length > 0}
                  />

                  <StatusItem
                    label="Skill gaps"
                    value={`${missingSkills.length}`}
                    good={missingSkills.length <= 3}
                  />

                  <StatusItem
                    label="Recommended roles"
                    value={`${recommendedRoles.length}`}
                    good={recommendedRoles.length > 0}
                  />

                </div>
              </div>
            </section>

            {/* Strengths + Skill Gaps */}
            <section className="mt-6 grid gap-6 lg:grid-cols-2">

              {/* Strengths */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-600">
                      What you're doing well
                    </p>

                    <h3 className="text-xl font-bold">
                      Strengths
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {strengths.length > 0 ? (
                    strengths.slice(0, 5).map((strength, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                        <p className="text-sm leading-6 text-slate-400">
                          {strength}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-600">
                      No strengths detected yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Skill Gaps */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
                    <XCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-600">
                      Areas to improve
                    </p>

                    <h3 className="text-xl font-bold">
                      Skill Gaps
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {missingSkills.length > 0 ? (
                    missingSkills.slice(0, 5).map((skill, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.04] p-4"
                      >
                        <p className="text-sm text-slate-400">
                          {skill}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-600">
                      No major skill gaps detected.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

              <p className="text-sm text-slate-600">
                AI Detected
              </p>

              <h3 className="mt-1 text-xl font-bold">
                Your Skills
              </h3>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {skills.length > 0 ? (
                  skills.map((skill, index) => {
                    const skillName =
                      typeof skill === "string"
                        ? skill
                        : skill.skill;

                    return (
                      <span
                        key={`${skillName}-${index}`}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white"
                      >
                        {skillName}
                      </span>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-600">
                    No skills detected.
                  </p>
                )}
              </div>
            </section>

            {/* Suggestions */}
            <section className="mt-6 rounded-3xl border border-violet-400/10 bg-violet-500/[0.04] p-6 backdrop-blur-xl">

              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-violet-400" />

                <div>
                  <p className="text-sm text-violet-300">
                    HireSense AI
                  </p>

                  <h3 className="text-xl font-bold">
                    Improvement Suggestions
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {suggestions.length > 0 ? (
                  suggestions.slice(0, 6).map((suggestion, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="text-sm leading-6 text-slate-400">
                        {suggestion}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-600">
                    No suggestions available.
                  </p>
                )}
              </div>
            </section>

            {/* Upload New Resume */}
            <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-violet-400" />

                    <h3 className="text-xl font-bold">
                      Analyze Another Resume
                    </h3>
                  </div>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Upload a new version of your resume to get a fresh AI
                    analysis and compare your career readiness.
                  </p>
                </div>

                <div className="shrink-0">
                  <ResumeUpload />
                </div>

              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

/* ================= STATUS ITEM ================= */

function StatusItem({
  label,
  value,
  good,
}: {
  label: string;
  value: string;
  good: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.025] px-4 py-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span
        className={`text-sm font-semibold ${
          good ? "text-emerald-400" : "text-amber-400"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function ResumeAnalyzerPage() {
  return (
    <ProtectedRoute>
      <ResumeAnalyzerContent />
    </ProtectedRoute>
  );
}