"use client";

import { useLayoutEffect, useEffect, useRef, DependencyList } from "react";
import { gsap, ScrollTrigger, isReducedMotion } from "./gsap";

// Use useLayoutEffect on client, useEffect on SSR
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Custom React hook for GSAP animations with automatic context scoping,
 * ScrollTrigger cleanup, and reduced-motion fallback.
 */
export function useGsapScroll<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (
    ctx: gsap.Context,
    elements: {
      scope: T;
      isReduced: boolean;
      gsap: typeof gsap;
      ScrollTrigger: typeof ScrollTrigger;
    }
  ) => void,
  deps: DependencyList = []
) {
  const scopeRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!scopeRef.current) return;

    const isReduced = isReducedMotion();

    const ctx = gsap.context((self) => {
      if (scopeRef.current) {
        animationCallback(self, {
          scope: scopeRef.current,
          isReduced,
          gsap,
          ScrollTrigger,
        });
      }
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, deps);

  return scopeRef;
}
