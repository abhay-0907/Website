"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Shared easing ── */
const ease = [0.25, 0.1, 0.25, 1] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* ── Staggered text entrance timeline ── */
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.1 },
          "-=0.3"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );

      /* ── Background parallax on scroll ── */
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: 0 },
          {
            y: 120,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100svh] scroll-mt-24 items-center justify-center overflow-hidden bg-espresso"
    >
      {/* Background hero image — parallax container */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20 will-change-transform"
        style={{ top: "-60px", bottom: "-60px" }}
      >
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso/70 via-espresso/50 to-burgundy/80"
      />

      {/* Centered text content */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 pt-[116px] text-center sm:px-8 sm:pb-16 sm:pt-[132px] lg:pb-20 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          {/* Tagline */}
          <p
            ref={taglineRef}
            className="inline-flex items-center gap-2 font-ui text-[11px] font-medium uppercase tracking-[.28em] text-champagne opacity-0 sm:text-sm"
          >
            <span className="h-px w-9 bg-bronze" />
            An all-day hospitality house
            <span className="h-px w-9 bg-bronze" />
          </p>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="mt-6 font-day text-[clamp(3.25rem,9vw,7.5rem)] font-bold leading-[.95] tracking-[-.06em] text-cream opacity-0 sm:mt-8"
          >
            From morning pour-overs to{" "}
            <span className="text-champagne">candlelit courses.</span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cream/75 opacity-0 sm:mt-8 sm:text-xl sm:leading-9"
          >
            A little more than your usual. Find your rhythm over thoughtful
            coffee and a slow brunch, then come back when the lights go low.
          </p>

          {/* CTA buttons */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-col items-center justify-center gap-3 opacity-0 min-[430px]:flex-row sm:mt-10"
          >
            <motion.a
              href="#coffee-brunch"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-crimson px-8 font-ui text-sm font-medium text-cream transition-colors hover:bg-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Explore the daytime menu
            </motion.a>
            <motion.a
              href="#dinner-experience"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-champagne/50 bg-cream/10 px-8 font-ui text-sm font-medium text-cream backdrop-blur-sm transition-colors hover:bg-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Discover dinner
            </motion.a>
          </div>

          {/* Meta tags */}
          <div
            ref={metaRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 opacity-0 sm:mt-12"
          >
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-champagne sm:text-[11px]">
              Daylight rituals
            </span>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-bronze"
            />
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-cream/55 sm:text-[11px]">
              After-dark occasions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
