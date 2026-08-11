"use client";
import { getCurrentUser } from "@/services/api";
import ResumeUpload from "@/components/dashboard/ResumeUpload";
import {
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();

        if (user?.full_name) {
          setUserName(user.full_name);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[5%] top-[-180px] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute right-[-120px] top-[30%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                HireSense<span className="text-violet-400"> AI</span>
              </p>

              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Career Intelligence
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Workspace
          </p>

          <div className="space-y-1.5">
            <SidebarItem
              href="/dashboard"
              icon={<Home className="h-[18px] w-[18px]" />}
              label="Overview"
              active
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarItem
              href="/dashboard/resume-analyzer"
              icon={<FileText className="h-[18px] w-[18px]" />}
              label="Resume Analyzer"
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarItem
              href="/dashboard/job-match"
              icon={<BriefcaseBusiness className="h-[18px] w-[18px]" />}
              label="Job Matching"
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarItem
              href="/dashboard/recommendations"
              icon={<Sparkles className="h-[18px] w-[18px]" />}
              label="AI Insights"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Account
          </p>

          <SidebarItem
            href="/settings"
            icon={<Settings className="h-[18px] w-[18px]" />}
            label="Settings"
            onClick={() => setSidebarOpen(false)}
          />
        </nav>

        {/* Sidebar Bottom */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-2xl border border-violet-400/10 bg-violet-500/[0.06] p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-xs font-semibold text-violet-300">
                AI Career Coach
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              Keep improving your profile to increase your chances.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="lg:pl-[260px]">
        {/* ================= TOP HEADER ================= */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-7 lg:px-10">
            {/* Mobile menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden lg:block">
              <p className="text-sm text-slate-500">Dashboard</p>
              <h1 className="text-lg font-semibold">Overview</h1>
            </div>

            {/* Header Right */}
            <div className="ml-auto flex items-center gap-3">
              <button className="relative rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition hover:bg-white/[0.06] hover:text-white">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-1.5 pr-3 transition hover:bg-white/[0.06]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-[11px] text-slate-600">Developer</p>
                  </div>

                  <ChevronDown
                    className={`hidden h-4 w-4 text-slate-600 transition sm:block ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40">
                    <Link
                      href="/settings"
                      className="block rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                      Profile & Settings
                    </Link>

                    <div className="my-1 border-t border-white/10" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="mx-auto max-w-[1450px] px-5 pb-20 pt-10 sm:px-7 lg:px-10 lg:pt-12">
          {/* Greeting */}
          <section className="mb-9">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI Career Intelligence
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {userName}!👋
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Here's your career overview. Track your resume performance,
              discover skill gaps and improve your job readiness.
            </p>
            <ResumeUpload />
          </section>

          {/* ================= STATS ================= */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Target className="h-5 w-5" />}
              title="ATS Score"
              value="84"
              suffix="/100"
              description="Strong resume"
              trend="+8%"
            />

            <StatCard
              icon={<FileText className="h-5 w-5" />}
              title="Resumes"
              value="3"
              description="Total uploaded"
              trend="+1 this month"
            />

            <StatCard
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              title="Job Match"
              value="78"
              suffix="%"
              description="Average compatibility"
              trend="+12%"
            />

            <StatCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Job Readiness"
              value="67"
              suffix="%"
              description="Career progress"
              trend="+6%"
            />
          </section>

          {/* ================= ATS + READINESS ================= */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
            {/* ATS */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-7">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-violet-500/20" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Resume Performance</p>

                    <h3 className="mt-1 text-xl font-bold">
                      ATS Compatibility
                    </h3>
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Excellent
                  </span>
                </div>

                <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row">
                  {/* Score Ring */}
                  <div className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#8b5cf6_0deg,#3b82f6_302deg,rgba(255,255,255,0.06)_302deg)] p-[9px]">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-950">
                      <span className="text-4xl font-bold">84</span>
                      <span className="text-xs text-slate-600">out of 100</span>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Overall performance
                      </span>

                      <span className="font-semibold">84%</span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <MiniMetric label="Keywords" value="92%" />
                      <MiniMetric label="Formatting" value="88%" />
                      <MiniMetric label="Skills" value="76%" />
                      <MiniMetric label="Impact" value="81%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Readiness */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Career Progress</p>
                  <h3 className="mt-1 text-xl font-bold">Job Readiness</h3>
                </div>

                <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 flex items-end justify-between">
                <span className="text-4xl font-bold">67%</span>
                <span className="text-xs text-slate-600">Keep going 🚀</span>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>

              <div className="mt-7 space-y-4">
                <ProgressItem label="Resume quality" value="84%" width="84%" />

                <ProgressItem label="Skills coverage" value="72%" width="72%" />

                <ProgressItem
                  label="Job compatibility"
                  value="78%"
                  width="78%"
                />
              </div>
            </div>
          </section>

          {/* ================= QUICK ACTIONS ================= */}
          <section className="mt-10">
            <div className="mb-5">
              <p className="text-sm text-slate-600">Take action</p>
              <h3 className="mt-1 text-2xl font-bold">Quick Actions</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <ActionCard
                href="/dashboard/resume-analyzer"
                icon={<Upload className="h-6 w-6" />}
                title="Analyze Resume"
                description="Upload your resume and discover your ATS score, strengths and skill gaps."
              />
              <ActionCard
                href="/dashboard/job-match"
                icon={<BriefcaseBusiness className="h-6 w-6" />}
                title="Match a Job"
                description="Compare your resume with a job description and discover your compatibility."
              />

              <ActionCard
                href="/dashboard/recommendations"
                icon={<Sparkles className="h-6 w-6" />}
                title="AI Recommendations"
                description="Get personalized suggestions to improve your resume and career profile."
              />
            </div>
          </section>

          {/* ================= ACTIVITY + SKILLS ================= */}
          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Activity */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Your activity</p>
                  <h3 className="mt-1 text-xl font-bold">Recent Activity</h3>
                </div>

                <button className="text-xs font-medium text-violet-400 hover:text-violet-300">
                  View all
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <ActivityItem
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  title="Resume analysis completed"
                  subtitle="Your latest resume scored 84/100"
                  time="2h ago"
                />

                <ActivityItem
                  icon={<BriefcaseBusiness className="h-4 w-4" />}
                  title="Job match completed"
                  subtitle="78% compatibility with Software Developer"
                  time="Yesterday"
                />

                <ActivityItem
                  icon={<Upload className="h-4 w-4" />}
                  title="Resume uploaded"
                  subtitle="resume_v3.pdf"
                  time="2d ago"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
              <p className="text-sm text-slate-600">AI detected</p>

              <h3 className="mt-1 text-xl font-bold">Skill Snapshot</h3>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  "Python",
                  "FastAPI",
                  "React",
                  "Next.js",
                  "PostgreSQL",
                  "Docker",
                  "Git",
                  "REST APIs",
                  "LangChain",
                  "Redis",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
                <div className="flex items-start gap-3">
                  <Target className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

                  <div>
                    <p className="text-sm font-semibold text-amber-300">
                      Skill gap detected
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      AI recommends improving your system design and cloud
                      deployment skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({
  href,
  icon,
  label,
  active = false,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition ${
        active
          ? "bg-violet-500/10 text-white"
          : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
      }`}
    >
      {active && (
        <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
      )}

      <span
        className={`transition ${
          active
            ? "text-violet-400"
            : "text-slate-600 group-hover:text-slate-300"
        }`}
      >
        {icon}
      </span>

      <span className="font-medium">{label}</span>
    </Link>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  title,
  value,
  suffix,
  description,
  trend,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  suffix?: string;
  description: string;
  trend: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/20">
      <div className="flex items-center justify-between">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-violet-400">
          {icon}
        </div>

        <span className="text-xs font-medium text-emerald-400">{trend}</span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-600">{title}</p>

        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold">{value}</span>

          {suffix && <span className="text-sm text-slate-600">{suffix}</span>}
        </div>

        <p className="mt-1 text-xs text-slate-600">{description}</p>
      </div>
    </div>
  );
}

/* ================= MINI METRIC ================= */

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.025] px-3 py-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-600">{label}</span>
        <span className="text-xs font-semibold text-slate-300">{value}</span>
      </div>
    </div>
  );
}

/* ================= PROGRESS ================= */

function ProgressItem({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-300">{value}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
          style={{ width }}
        />
      </div>
    </div>
  );
}

/* ================= ACTION CARD ================= */

function ActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-violet-400 transition group-hover:scale-105">
            {icon}
          </div>

          <span className="text-xl text-slate-700 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white">
            ↗
          </span>
        </div>

        <h4 className="mt-6 text-lg font-bold">{title}</h4>

        <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">
          {description}
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-violet-400">
          Get started →
        </span>
      </div>
    </Link>
  );
}

/* ================= ACTIVITY ================= */

function ActivityItem({
  icon,
  title,
  subtitle,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <p className="text-sm font-medium text-slate-300">{title}</p>

          <span className="text-[11px] text-slate-700">{time}</span>
        </div>

        <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}
