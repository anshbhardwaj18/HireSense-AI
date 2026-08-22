"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  FileText,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  Brain,
  Zap,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/context/AuthContext";
import { useGsapScroll } from "@/lib/animations/useGsapScroll";
import { init3DTilt } from "@/lib/animations/gsap";

export default function AboutPage() {
  const { isAuthenticated } = useAuth();
  const heroVisualRef = useRef<HTMLDivElement>(null);

  const mainRef = useGsapScroll<HTMLElement>((ctx, { scope, isReduced, gsap }) => {
    if (isReduced) return;

    // 1. Hero Left Timeline
    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.85 },
    });

    heroTl
      .from(".about-hero-badge", {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
      })
      .from(
        ".about-hero-title",
        {
          opacity: 0,
          y: 35,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        ".about-hero-desc",
        {
          opacity: 0,
          y: 25,
          duration: 0.7,
        },
        "-=0.5"
      )
      .from(
        ".about-hero-cta > *",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        ".about-hero-check",
        {
          opacity: 0,
          y: 15,
          stagger: 0.08,
          duration: 0.5,
        },
        "-=0.3"
      );

    // 2. Hero Visual Card 3D Entrance
    gsap.from(".about-hero-card", {
      opacity: 0,
      scale: 0.92,
      rotationX: 8,
      rotationY: -8,
      transformPerspective: 1200,
      y: 35,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.2,
    });

    // 3. What is HireSense Section
    gsap.from(".about-what-header", {
      scrollTrigger: {
        trigger: ".about-what-section",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".about-what-card", {
      scrollTrigger: {
        trigger: ".about-what-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      scale: 0.95,
      rotationX: 4,
      transformPerspective: 1000,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out",
    });

    // 4. Why HireSense Section
    gsap.from(".about-why-card", {
      scrollTrigger: {
        trigger: ".about-why-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 35,
      stagger: 0.1,
      duration: 0.75,
      ease: "power2.out",
    });

    // 5. How It Works Section
    gsap.from(".about-how-card", {
      scrollTrigger: {
        trigger: ".about-how-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      scale: 0.94,
      rotationY: -5,
      transformPerspective: 1000,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
    });

    // 6. Technology Architecture Section
    gsap.from(".about-tech-box", {
      scrollTrigger: {
        trigger: ".about-tech-box",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
    });

    // 7. Mission & CTA Boxes
    gsap.from(".about-mission-box", {
      scrollTrigger: {
        trigger: ".about-mission-box",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.95,
      y: 35,
      duration: 0.85,
      ease: "power3.out",
    });

    gsap.from(".about-cta-box", {
      scrollTrigger: {
        trigger: ".about-cta-box",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.95,
      y: 35,
      duration: 0.85,
      ease: "power3.out",
    });

    // Background glow parallax
    gsap.to(".about-bg-glow-1", {
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      y: -80,
      ease: "none",
    });
  });

  useEffect(() => {
    const cleanup = init3DTilt(heroVisualRef.current, {
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
        {/* Background Glows */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="about-bg-glow-1 absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px] will-change-transform" />
          <div className="absolute right-[-150px] top-[500px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute left-[-150px] top-[900px] h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[120px]" />
        </div>

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="mx-auto grid min-h-[calc(100vh-90px)] w-full max-w-[1500px] items-center gap-14 px-6 pb-20 pt-28 lg:grid-cols-2 lg:px-8">
          {/* Left */}
          <div>
            <div className="about-hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Sparkles className="h-4 w-4" />
              About HireSense AI
            </div>

            <h1 className="about-hero-title max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your Resume.
              <br />
              Your Skills.
              <br />
              Your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Career Advantage.
              </span>
            </h1>

            <p className="about-hero-desc mt-7 max-w-xl text-lg leading-8 text-gray-400">
              HireSense AI is an AI-powered career intelligence platform built
              to help you understand your resume, discover skill gaps, improve
              your ATS performance, and find stronger job opportunities.
            </p>

            <div className="about-hero-cta mt-9 flex flex-col gap-4 sm:flex-row">
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
                How It Works
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
              <div className="about-hero-check flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                AI Resume Analysis
              </div>

              <div className="about-hero-check flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ATS Optimization
              </div>

              <div className="about-hero-check flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Job Matching
              </div>
            </div>
          </div>

          {/* Right - AI Visual */}
          <div
            ref={heroVisualRef}
            className="about-hero-card relative mx-auto w-full max-w-xl cursor-default"
          >
            <div className="absolute inset-0 rounded-3xl bg-violet-600/20 blur-[90px]" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">
                    <Brain className="h-5 w-5 text-violet-400" />
                  </div>

                  <div>
                    <p className="font-semibold">HireSense AI</p>
                    <p className="text-xs text-gray-500">
                      Career Intelligence
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  AI Ready
                </div>
              </div>

              {/* Analysis */}
              <div className="py-7">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Resume Analysis</p>
                    <p className="mt-1 text-xl font-semibold">
                      Strong Candidate
                    </p>
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-violet-500/20">
                    <div className="text-center">
                      <p className="text-2xl font-bold">94</p>
                      <p className="text-[10px] text-gray-500">ATS</p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex justify-between text-xs">
                    <span className="text-gray-400">Profile Strength</span>
                    <span className="text-violet-400">92%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-gray-500">Skill Match</p>
                  <p className="mt-1 text-xl font-bold text-emerald-400">
                    92%
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-gray-500">Job Match</p>
                  <p className="mt-1 text-xl font-bold text-blue-400">95%</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  <p className="text-sm font-medium">AI Recommendation</p>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Strengthen your cloud and system design skills to improve
                  your profile for modern backend roles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHAT IS HIRE SENSE
        ====================================================== */}
        <section className="about-what-section relative mx-auto w-full max-w-[1500px] px-6 py-28 lg:px-8">
          <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

          <div className="about-what-header mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Sparkles className="h-4 w-4" />
              What Is HireSense AI?
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Understand Your Resume.
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Understand Your Potential.
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
              Job hunting should not be a guessing game. HireSense AI
              transforms your resume into meaningful career insights using
              intelligent analysis, job matching, and personalized
              recommendations.
            </p>
          </div>

          <div className="about-what-grid mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Resume Intelligence",
                description:
                  "Understand your resume through AI-powered analysis of your skills, experience, strengths, and improvement areas.",
                color: "violet",
              },
              {
                icon: Target,
                title: "Career Matching",
                description:
                  "Compare your profile against job descriptions and understand how closely your skills match the opportunity.",
                color: "blue",
              },
              {
                icon: BarChart3,
                title: "Actionable Insights",
                description:
                  "Get clear recommendations that help you improve your resume and become a stronger candidate.",
                color: "cyan",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="about-what-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.07] hover:border-violet-500/30"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl transition group-hover:bg-violet-600/20" />

                  <div className="relative">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition duration-300 group-hover:scale-110 group-hover:bg-violet-500/20">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-semibold">{item.title}</h3>

                    <p className="mt-3 leading-7 text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            WHY HIRE SENSE
        ====================================================== */}
        <section className="mx-auto w-full max-w-[1500px] px-6 py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              <Zap className="h-4 w-4" />
              Why HireSense?
            </div>

            <h2 className="text-4xl font-bold sm:text-5xl">
              More Than Just a{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Resume Checker.
              </span>
            </h2>

            <p className="mt-5 text-gray-400">
              HireSense AI focuses on turning resume data into practical career
              decisions.
            </p>
          </div>

          <div className="about-why-grid mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Brain,
                title: "AI Powered",
                text: "Intelligent analysis helps uncover insights beyond simple keyword checking.",
              },
              {
                icon: Target,
                title: "Personalized",
                text: "Recommendations are based on your resume and target job requirements.",
              },
              {
                icon: Rocket,
                title: "Actionable",
                text: "Know what to improve instead of simply receiving a score.",
              },
              {
                icon: ShieldCheck,
                title: "Secure",
                text: "Protected authentication and API access keep your career data secure.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="about-why-card group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/30 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section
          id="how-it-works"
          className="relative mx-auto w-full max-w-[1500px] px-6 py-28 lg:px-8"
        >
          <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Sparkles className="h-4 w-4" />
              How It Works
            </div>

            <h2 className="text-4xl font-bold sm:text-5xl">
              From Resume to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Career Insights.
              </span>
            </h2>
          </div>

          <div className="about-how-grid relative mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                icon: Upload,
                title: "Upload",
                text: "Upload your resume as a PDF and let HireSense process your profile.",
              },
              {
                number: "02",
                icon: Brain,
                title: "Analyze",
                text: "AI analyzes your resume, skills, strengths, weaknesses, and career profile.",
              },
              {
                number: "03",
                icon: BriefcaseBusiness,
                title: "Match",
                text: "Compare your resume with a job description to discover your compatibility.",
              },
              {
                number: "04",
                icon: Rocket,
                title: "Improve",
                text: "Use personalized insights and skill-gap recommendations to improve.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.number} className="about-how-card relative">
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/30 hover:bg-white/[0.07]">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>

                      <span className="text-4xl font-bold text-white/5">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold">{item.title}</h3>

                    <p className="mt-3 text-sm leading-7 text-gray-400">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            TECHNOLOGY
        ====================================================== */}
        <section className="mx-auto w-full max-w-[1500px] px-6 py-28 lg:px-8">
          <div className="about-tech-box rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-12 lg:p-16">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Text */}
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                  <Database className="h-4 w-4" />
                  Technology
                </div>

                <h2 className="text-4xl font-bold sm:text-5xl">
                  Built With a{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Modern Stack.
                  </span>
                </h2>

                <p className="mt-5 leading-8 text-gray-400">
                  HireSense AI combines a modern full-stack architecture with
                  AI, caching, authentication, and scalable backend services
                  to deliver intelligent career insights.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Next.js",
                    "React",
                    "FastAPI",
                    "Python",
                    "PostgreSQL",
                    "Redis",
                    "LangChain",
                    "Mistral AI",
                    "Docker",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-gray-300 transition hover:border-violet-500/30 hover:bg-violet-500/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture visual */}
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-violet-600/10 blur-[70px]" />

                <div className="relative rounded-2xl border border-white/10 bg-black/30 p-6">
                  <div className="flex items-center justify-center">
                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-6 py-4 text-center">
                      <Brain className="mx-auto mb-2 h-6 w-6 text-violet-400" />
                      <p className="text-sm font-semibold">HireSense AI</p>
                    </div>
                  </div>

                  <div className="mx-auto my-5 h-8 w-px bg-gradient-to-b from-violet-500/50 to-blue-500/50" />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                      <p className="text-sm font-medium">FastAPI</p>
                      <p className="mt-1 text-xs text-gray-500">Backend</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                      <p className="text-sm font-medium">Next.js</p>
                      <p className="mt-1 text-xs text-gray-500">Frontend</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                      <p className="text-sm font-medium">PostgreSQL</p>
                      <p className="mt-1 text-xs text-gray-500">Database</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                      <p className="text-sm font-medium">Redis</p>
                      <p className="mt-1 text-xs text-gray-500">Caching</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MISSION
        ====================================================== */}
        <section className="mx-auto w-full max-w-[1100px] px-6 py-28 text-center lg:px-8">
          <div className="about-mission-box relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-7 py-16 backdrop-blur-xl sm:px-12">
            <div className="absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                <Target className="h-7 w-7" />
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
                Our Mission
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Helping candidates understand their potential and become
                stronger, more confident job seekers.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-400">
                HireSense AI aims to make career preparation more intelligent,
                practical, and accessible by turning complex resume and job
                information into clear, actionable insights.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}
        <section className="mx-auto w-full max-w-[1500px] px-6 py-20 lg:px-8">
          <div className="about-cta-box relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-blue-600/10 px-7 py-16 text-center sm:px-12">
            <div className="absolute left-1/2 top-[-100px] h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                <Rocket className="h-7 w-7" />
              </div>

              <h2 className="text-4xl font-bold sm:text-5xl">
                Ready to Turn Your Resume Into a{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Career Advantage?
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-gray-400">
                Upload your resume, understand your strengths, discover your
                gaps, and start preparing for the opportunities you want.
              </p>

              <div className="mt-8">
                <Link
                  href={isAuthenticated ? "/dashboard" : "/signup"}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 font-semibold shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-violet-600/30"
                >
                  Analyze My Resume
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Gradient */}
        <div className="mx-auto h-px max-w-[1500px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <Footer />
      </main>
    </>
  );
}