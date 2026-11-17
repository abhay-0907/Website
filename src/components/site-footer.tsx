"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BrandEmblem } from "@/components/brand/brand-logo";

const hours = [
  { period: "Coffee & brunch", days: "Every day", times: "7:00 am – 3:00 pm" },
  { period: "Dinner experience", days: "Wed – Sun", times: "5:00 pm – 10:00 pm" },
];

/* ── Shared easing ── */
const ease = [0.25, 0.1, 0.25, 1] as const;

/* ── Animated social link ── */
function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative font-ui text-xs text-cream/80 transition-colors hover:text-champagne"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 rounded-full bg-champagne transition-all duration-300 ease-out group-hover:w-full" />
    </motion.a>
  );
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-80px" });

  return (
    <footer ref={footerRef} id="visit" className="bg-burgundy text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-7 pt-12 sm:px-8 sm:pb-8 sm:pt-16 lg:px-12">
        {/* Logo entrance */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <BrandEmblem size="footer" tone="champagne" />
        </motion.div>

        {/* Info grid entrance */}
        <motion.div
          className="mx-auto mt-10 grid max-w-4xl gap-8 border-y border-bronze/50 py-8 text-center sm:grid-cols-3 sm:gap-6 sm:py-9"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <div>
            <h2 className="font-ui text-xs font-medium uppercase tracking-[.16em] text-champagne">
              Find us
            </h2>
            <address className="mt-3 not-italic text-sm leading-6 text-cream/80">
              123 Market Street
              <br />
              Your City, ST 00000
            </address>
            <motion.a
              href="https://maps.google.com/?q=123+Market+Street"
              className="group relative mt-2 inline-block font-ui text-xs text-champagne"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="relative">
                Get directions
                <span className="absolute -bottom-0.5 left-0 h-[1px] w-full origin-left scale-x-100 bg-bronze transition-all duration-300 group-hover:scale-x-0" />
                <span className="absolute -bottom-0.5 left-0 h-[1px] w-full origin-right scale-x-0 bg-champagne transition-all duration-300 group-hover:scale-x-100" />
              </span>
            </motion.a>
          </div>

          {hours.map((schedule) => (
            <div key={schedule.period}>
              <h2 className="font-ui text-xs font-medium uppercase tracking-[.16em] text-champagne">
                {schedule.period}
              </h2>
              <p className="mt-3 text-sm leading-6 text-cream/80">
                {schedule.days}
                <br />
                {schedule.times}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar entrance */}
        <motion.div
          className="flex flex-col items-center justify-between gap-4 pt-6 text-center sm:flex-row sm:text-left"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          <p className="text-xs text-cream/55">A little more than your usual.</p>
          <nav aria-label="Social media" className="flex items-center gap-6">
            <SocialLink href="https://instagram.com/" label="Instagram" />
            <SocialLink href="https://tiktok.com/" label="TikTok" />
          </nav>
          <p className="font-mono text-[10px] text-cream/45">© 2026 BREWN</p>
        </motion.div>
      </div>
    </footer>
  );
}
