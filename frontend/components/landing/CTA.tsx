"use client";

import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useGsapScroll } from "@/lib/animations/useGsapScroll";

export default function CTA() {
  const { isAuthenticated } = useAuth();

  const sectionRef = useGsapScroll<HTMLElement>((ctx, { scope, isReduced, gsap }) => {
    if (isReduced) return;

    // CTA Box 3D perspective entrance
    gsap.from(".cta-box-container", {
      scrollTrigger: {
        trigger: ".cta-box-container",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.93,
      y: 45,
      transformPerspective: 1000,
      duration: 0.95,
      ease: "power3.out",
    });

    // Content stagger
    gsap.from(".cta-content-item", {
      scrollTrigger: {
        trigger: ".cta-box-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 25,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.15,
    });

    // Background glow scrub
    gsap.to(".cta-bg-glow", {
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
      y: -50,
      scale: 1.15,
      ease: "none",
    });
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050713] px-6 py-28">
      {/* Background effects */}
      <div className="cta-bg-glow pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[150px] will-change-transform" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        <div className="cta-box-container overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-blue-500/[0.08] px-6 py-16 text-center shadow-2xl shadow-violet-950/20 md:px-12">
          
          {/* Badge */}
          <div className="cta-content-item mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Sparkles size={15} />
            Start Your Career Journey
          </div>

          {/* Heading */}
          <h2 className="cta-content-item mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            Your Next Opportunity
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Starts With Your Resume
            </span>
          </h2>

          <p className="cta-content-item mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Let HireSense AI analyze your resume, identify your skill gaps,
            match you with opportunities, and help you become
            career-ready.
          </p>

          {/* CTA Button */}
          <div className="cta-content-item mt-9 flex justify-center">
            <Link
              href={isAuthenticated ? "/dashboard" : "/signup"}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/20"
            >
              Analyze My Resume

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Trust points */}
          <div className="cta-content-item mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              "AI-Powered Analysis",
              "Job Matching",
              "Career Insights",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <CheckCircle2
                  size={14}
                  className="text-emerald-400"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}