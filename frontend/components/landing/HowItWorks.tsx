"use client";

import {
  Upload,
  BrainCircuit,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useGsapScroll } from "@/lib/animations/useGsapScroll";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Resume",
    description:
      "Upload your resume in seconds. HireSense AI securely processes your resume and extracts the important details from your profile.",
    points: ["PDF Resume Support", "Secure Processing"],
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "AI Analyzes Your Profile",
    description:
      "Our AI analyzes your skills, experience, strengths, weaknesses, ATS compatibility, and career profile.",
    points: ["AI-Powered Analysis", "ATS Insights"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Get Career Insights",
    description:
      "Receive personalized recommendations, skill gaps, job matching results, and interview preparation guidance.",
    points: ["Job Matching", "Interview Preparation"],
  },
];

export default function HowItWorks() {
  const sectionRef = useGsapScroll<HTMLElement>((ctx, { scope, isReduced, gsap }) => {
    if (isReduced) return;

    // Header reveal (Two-Way)
    gsap.fromTo(
      ".how-header",
      { opacity: 0, y: 30, scale: 0.98 },
      {
        scrollTrigger: {
          trigger: scope,
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

    // Connecting line draw animation (Two-Way)
    gsap.fromTo(
      ".how-connecting-line",
      { scaleX: 0, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".how-steps-grid",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
        scaleX: 1,
        opacity: 1,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.inOut",
      }
    );

    // Steps 3D staggered entrance (Two-Way)
    gsap.fromTo(
      ".how-step-col",
      {
        opacity: 0,
        y: 35,
        scale: 0.96,
        rotationY: -4,
        transformPerspective: 1000,
      },
      {
        scrollTrigger: {
          trigger: ".how-steps-grid",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        transformPerspective: 1000,
        stagger: 0.12,
        duration: 0.65,
        ease: "power2.out",
      }
    );

    // Background glow scrub
    gsap.to(".how-bg-glow", {
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
      y: -50,
      scale: 1.1,
      ease: "none",
    });
  });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden bg-[#050713] px-6 py-28"
    >
      {/* Background glow */}
      <div className="how-bg-glow pointer-events-none absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px] will-change-transform" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="how-header mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
            Simple & Intelligent
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              HireSense AI
            </span>{" "}
            Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Turn your resume into actionable career insights in just three
            simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="how-steps-grid relative mt-20 grid gap-8 lg:grid-cols-3">
          {/* Connecting line */}
          <div className="how-connecting-line pointer-events-none absolute left-[16%] right-[16%] top-[68px] hidden h-px bg-gradient-to-r from-violet-500/20 via-violet-500/50 to-blue-500/20 lg:block will-change-transform" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="how-step-col group relative"
              >
                {/* Number / Icon */}
                <div className="relative z-10 mx-auto flex h-[136px] w-[136px] items-center justify-center rounded-full border border-white/10 bg-[#080a18] shadow-[0_0_40px_rgba(124,58,237,0.08)] transition-[border-color,box-shadow] duration-500 group-hover:border-violet-500/40 group-hover:shadow-[0_0_50px_rgba(124,58,237,0.2)]">
                  <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-violet-500/20">
                    <Icon
                      size={27}
                      className="text-violet-400"
                      strokeWidth={1.7}
                    />

                    <span className="mt-1 text-[10px] font-semibold tracking-widest text-violet-300">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-7 text-center transition-[border-color,background-color] duration-500 group-hover:border-violet-500/25 group-hover:bg-violet-500/[0.035]">
                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>

                  {/* Points */}
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {step.points.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-violet-400"
                        />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="absolute right-[-22px] top-[60px] z-20 hidden lg:block">
                    <ArrowRight
                      size={22}
                      className="text-violet-500/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-400"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}