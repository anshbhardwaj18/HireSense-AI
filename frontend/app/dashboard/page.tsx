"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/";
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
              <span className="text-sm font-bold text-white">H</span>
            </div>

            <div>
              <span className="text-lg font-bold tracking-tight text-white">
                HireSense
              </span>

              <span className="ml-1 text-lg font-bold text-violet-400">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              How It Works
            </Link>

            <Link
              href="#about"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              About
            </Link>
          </div>

          {/* Desktop Profile */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <User size={16} />
              Profile
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">

              <Link
                href="#features"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Features
              </Link>

              <Link
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                How It Works
              </Link>

              <Link
                href="#about"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                About
              </Link>

              <div className="my-2 h-px bg-white/10" />

              {/* Mobile Profile */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <User size={17} />
                Profile
              </button>

              {profileOpen && (
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ================= DASHBOARD CONTENT ================= */}
      <section className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-20 pt-32 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Sparkles className="h-4 w-4" />
            AI Career Intelligence
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              HireSense AI
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Analyze your resume, improve your ATS score, identify skill gaps,
            and discover how well you match your target jobs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* ATS Score */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.07]">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <BarChart3 className="h-5 w-5" />
                </div>

                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>

              <p className="text-sm text-gray-500">ATS Score</p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-bold">--</span>
                <span className="mb-1 text-sm text-gray-500">/100</span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Upload a resume to analyze
              </p>
            </div>
          </div>

          {/* Resume */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.07]">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <FileText className="h-5 w-5" />
              </div>

              <p className="text-sm text-gray-500">Resume</p>

              <p className="mt-2 text-xl font-bold">Not uploaded</p>

              <p className="mt-2 text-xs text-gray-500">
                Upload your latest resume
              </p>
            </div>
          </div>

          {/* Job Match */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/[0.07]">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-600/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <p className="text-sm text-gray-500">Job Matches</p>

              <p className="mt-2 text-4xl font-bold">0</p>

              <p className="mt-2 text-xs text-gray-500">
                No job descriptions analyzed
              </p>
            </div>
          </div>

          {/* Skill Gap */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.07]">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-600/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Target className="h-5 w-5" />
              </div>

              <p className="text-sm text-gray-500">Skill Gaps</p>

              <p className="mt-2 text-4xl font-bold">--</p>

              <p className="mt-2 text-xs text-gray-500">
                Analyze your resume first
              </p>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Resume Analysis */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:border-violet-500/30">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <FileText className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Resume Analysis
              </h2>

              <p className="mt-3 leading-7 text-gray-400">
                Upload your resume and let AI analyze your ATS score, skills,
                strengths, weaknesses, and improvement areas.
              </p>

              <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 font-semibold shadow-lg shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-violet-600/30">
                <Upload className="h-5 w-5" />
                Upload Resume
              </button>
            </div>
          </div>

          {/* Job Matching */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:border-blue-500/30">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Job Description Matching
              </h2>

              <p className="mt-3 leading-7 text-gray-400">
                Compare your resume against a job description and discover
                matched skills, missing skills, and your match score.
              </p>

              <button className="mt-7 w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-gray-200 transition hover:bg-white/10">
                Match a Job
              </button>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:border-emerald-500/30">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-600/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Sparkles className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                AI Recommendations
              </h2>

              <p className="mt-3 leading-7 text-gray-400">
                Get personalized recommendations based on your resume,
                skills, experience, and target career path.
              </p>

              <button className="mt-7 w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-gray-200 transition hover:bg-white/10">
                View Recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

            <div>
              <h2 className="text-2xl font-bold">
                Ready to improve your career?
              </h2>

              <p className="mt-2 text-gray-500">
                Start by uploading your resume and let HireSense AI do the
                analysis.
              </p>
            </div>

            <button className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold shadow-lg shadow-violet-600/20 transition hover:-translate-y-1">
              Analyze Resume
            </button>

          </div>
        </div>

      </section>
    </main>
  );
}