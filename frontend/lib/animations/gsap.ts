"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered only in client environments
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if the user prefers reduced motion for accessibility
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Create a subtle 3D mouse parallax tilt effect for cards and hero visuals.
 * Clamped strictly to ±3° to ±5° to maintain a sleek, premium SaaS feel.
 * Automatically disabled on mobile/touch devices and when reduced motion is preferred.
 */
export function init3DTilt(
  element: HTMLElement | null,
  options: {
    maxRotation?: number;
    perspective?: number;
    scale?: number;
  } = {}
) {
  if (!element || typeof window === "undefined") return () => {};

  if (isReducedMotion() || window.innerWidth < 1024) {
    return () => {};
  }

  const { maxRotation = 4, perspective = 1000, scale = 1.015 } = options;

  gsap.set(element, {
    transformPerspective: perspective,
    transformStyle: "preserve-3d",
  });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    gsap.to(element, {
      rotateX,
      rotateY,
      scale,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

export { gsap, ScrollTrigger };
