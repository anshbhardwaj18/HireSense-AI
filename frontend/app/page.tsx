"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  BarChart3,
  BriefcaseBusiness,
  Target,
  Zap,
  ShieldCheck,
} from "lucide-react";
import Feature from "@/components/landing/Feature";
import HowItWorks from "@/components/landing/HowItWorks";
import ResumeAnalysis from "@/components/landing/ResumeAnalysis";
import JobMatching from "@/components/landing/JobMatching";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useGsapScroll } from "@/lib/animations/useGsapScroll";
import { init3DTilt } from "@/lib/animations/gsap";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const heroCardRef = useRef<HTMLDivElement>(null);

  // Setup GSAP 3D Scroll and Entrance Animations
  const mainRef = useGsapScroll<HTMLElement>((ctx, { isReduced, gsap }) => {
    if (isReduced) return;

    // 1. Hero Left Entrance Timeline
    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.9 },
    });

    heroTl
      .fromTo(
        ".hero-badge",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.4"
      )
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.5"
      )
      .fromTo(
        ".hero-cta > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ".hero-check-item",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
        "-=0.3"
      );

    // 2. Hero Right Card 3D Entrance
    gsap.fromTo(
      ".hero-card-container",
      {
        opacity: 0,
        scale: 0.92,
        rotationX: 6,
        rotationY: -6,
        transformPerspective: 1200,
        y: 35,
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        transformPerspective: 1200,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // 3. Hero Background Glow Parallax (Scrub)
    gsap.to(".hero-glow-1", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      y: -100,
      scale: 1.15,
      opacity: 0.1,
      ease: "none",
    });

    gsap.to(".hero-glow-2", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
      y: 80,
      scale: 0.9,
      ease: "none",
    });

    // 4. Features Section Header Scroll Animation (Two-Way)
    gsap.fromTo(
      ".features-header",
      { opacity: 0, y: 30, scale: 0.98 },
      {
        scrollTrigger: {
          trigger: "#features-intro",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      }
    );

    // 5. Feature Cards 3D Staggered Scroll Reveal (Two-Way)
    gsap.fromTo(
      ".feature-card-item",
      {
        opacity: 0,
        y: 35,
        scale: 0.97,
        rotationX: 4,
        transformPerspective: 1000,
      },
      {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        transformPerspective: 1000,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  });

  // Attach subtle 3D mouse parallax to Hero Card on Desktop
  useEffect(() => {
    const cleanup = init3DTilt(heroCardRef.current, {
      maxRotation: 4,
      perspective: 1000,
      scale: 1.015,
    });
    return cleanup;
  }, []);

  return (
    <>
      <Navbar />
      <main ref={mainRef} className="min-h-screen overflow-hidden bg-[#030712] text-white">
        {/* Background Glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="hero-glow-1 absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px] will-change-transform" />
          <div className="hero-glow-2 absolute right-[-150px] top-[300px] h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px] will-change-transform" />
        </div>

        {/* Hero */}
        <section className="hero-section mx-auto grid min-h-[calc(100vh-90px)] w-full max-w-[1500px] items-center gap-12 px-6 pb-20 pt-30 lg:grid-cols-2 lg:px-8 lg:pt-30">
          {/* Left */}
          <div>
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Intelligence
            </div>

            <h1 className="hero-title max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Turn Your Resume Into Your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Career Advantage.
              </span>
            </h1>

            <p className="hero-desc mt-7 max-w-xl text-lg leading-8 text-gray-400">
              Analyze your resume with AI, improve your ATS score, identify skill
              gaps, and match your profile with the right job opportunities.
            </p>

            <div className="hero-cta mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href={isAuthenticated ? "/dashboard" : "/signup"}
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-violet-600/30"
              >
                Analyze My Resume
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="#how-it-works"
                className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
              <div className="hero-check-item flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                AI Resume Analysis
              </div>

              <div className="hero-check-item flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ATS Optimization
              </div>

              <div className="hero-check-item flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Job Matching
              </div>
            </div>
          </div>

          {/* Right - Resume Analysis Card */}
          <div
            ref={heroCardRef}
            className="hero-card-container relative mx-auto w-full max-w-xl cursor-default transition-shadow"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-violet-600/20 blur-[80px]" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">
                    <FileText className="h-5 w-5 text-violet-400" />
                  </div>

                  <div>
                    <p className="font-semibold">resume.pdf</p>
                    <p className="text-xs text-gray-500">
                      AI Resume Analysis
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  Analyzed
                </div>
              </div>

              {/* Score */}
              <div className="flex items-center gap-8 py-7">
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[10px] border-violet-500/20">
                  <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-violet-500 border-r-blue-500 rotate-[-25deg]" />

                  <div className="text-center">
                    <p className="text-4xl font-bold">94</p>
                    <p className="text-xs text-gray-500">ATS Score</p>
                  </div>
                </div>

                <div>
                  <p className="text-lg font-semibold">Excellent Resume</p>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Your resume has a strong match with modern technical roles.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Detected Skills</p>
                  <span className="text-xs text-violet-400">16 skills</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "FastAPI",
                    "React.js",
                    "PostgreSQL",
                    "Docker",
                    "REST APIs",
                    "LangChain",
                    "Git",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-emerald-500/10 bg-emerald-500/5 px-3 py-1.5 text-xs text-gray-300"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-gray-500">Skill Match</p>
                  <p className="mt-1 text-xl font-bold text-emerald-400">92%</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-gray-500">Job Match</p>
                  <p className="mt-1 text-xl font-bold text-blue-400">95%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features-intro"
          className="relative mx-auto w-full max-w-[1500px] px-6 py-28 lg:px-8"
        >
          {/* Section Glow */}
          <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

          {/* Section Header */}
          <div className="features-header mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Sparkles className="h-4 w-4" />
              Everything You Need
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Your Resume,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Supercharged.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
              HireSense AI uses intelligent analysis to help you understand,
              improve, and optimize your resume for the jobs you actually want.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="features-grid mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="feature-card-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-violet-500/30 hover:bg-white/[0.07]">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl transition group-hover:bg-violet-600/20" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition duration-300 group-hover:scale-110 group-hover:bg-violet-500/20">
                  <Sparkles className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  AI Resume Analysis
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Get an intelligent analysis of your resume with AI-powered
                  insights, strengths, weaknesses, and actionable improvements.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-violet-400">
                  Analyze smarter
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="feature-card-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-blue-500/30 hover:bg-white/[0.07]">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl transition group-hover:bg-blue-600/20" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                  <BarChart3 className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  ATS Score
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Discover how well your resume performs against Applicant
                  Tracking Systems and identify areas that need improvement.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-blue-400">
                  Improve your score
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="feature-card-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-cyan-500/30 hover:bg-white/[0.07]">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-600/10 blur-3xl transition group-hover:bg-cyan-600/20" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  Job Description Matching
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Compare your resume against any job description and instantly
                  discover your match score, matched skills, and missing skills.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-cyan-400">
                  Find your match
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="feature-card-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-emerald-500/30 hover:bg-white/[0.07]">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-600/10 blur-3xl transition group-hover:bg-emerald-600/20" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20">
                  <Target className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  Skill Gap Analysis
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Understand which technical skills you&apos;re missing and get a
                  clear direction for becoming a stronger candidate.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-emerald-400">
                  Find your gaps
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="feature-card-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-amber-500/30 hover:bg-white/[0.07]">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-600/10 blur-3xl transition group-hover:bg-amber-600/20" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition duration-300 group-hover:scale-110 group-hover:bg-amber-500/20">
                  <Zap className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  AI Recommendations
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Receive personalized recommendations to improve your resume,
                  skills, and overall job readiness.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-amber-400">
                  Get personalized advice
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="feature-card-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-rose-500/30 hover:bg-white/[0.07]">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-rose-600/10 blur-3xl transition group-hover:bg-rose-600/20" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 transition duration-300 group-hover:scale-110 group-hover:bg-rose-500/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  Secure Resume Processing
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Your resume is processed securely with authentication and
                  protected API access throughout your HireSense AI journey.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-rose-400">
                  Built with security
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom gradient line */}
        <div className="mx-auto h-px max-w-[1500px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        <Feature />
        <HowItWorks />
        <ResumeAnalysis />
        <JobMatching />
        <CTA />
        <Footer />
      </main>
    </>
  );
}