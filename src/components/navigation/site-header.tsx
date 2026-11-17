"use client";

import { useRef, useState, useEffect, type KeyboardEvent } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { BrandEmblem } from "@/components/brand/brand-logo";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our story", href: "#story" },
  { label: "Visit and Hours", href: "#visit" },
];

/* ── Shared easing ── */
const ease = [0.25, 0.1, 0.25, 1] as const;

/* ── Location pin icon ── */
function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M16 8.2c0 4.1-6 9-6 9s-6-4.9-6-9a6 6 0 1 1 12 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Header Actions (CTA buttons) ── */
export function HeaderActions({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const base = mobile
    ? "inline-flex min-h-12 items-center justify-center rounded-full px-5 font-ui text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
    : "inline-flex min-h-10 items-center justify-center rounded-full px-4 font-ui text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze";

  return (
    <div className={mobile ? "grid grid-cols-2 gap-2 pt-3" : "flex items-center gap-2"}>
      <motion.a
        href="#coffee"
        onClick={onNavigate}
        className={`${base} border border-bronze text-espresso hover:bg-bronze/10`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        Order Online
      </motion.a>
      <motion.a
        href="#reservations"
        onClick={onNavigate}
        className={`${base} bg-crimson text-cream hover:bg-burgundy`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        Book Dinner
      </motion.a>
    </div>
  );
}

/* ── Main Header ── */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* Track scroll to toggle header style */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && menuOpen) {
      closeMenu();
      menuButtonRef.current?.focus();
    }
  }

  return (
    <motion.header
      onKeyDown={handleMenuKeyDown}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-lg transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? "border-bronze/40 bg-cream/80 shadow-[0_4px_24px_rgba(30,20,18,.1)]"
          : "border-bronze/20 bg-cream/30 shadow-none"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-7 lg:h-[88px] lg:px-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <BrandEmblem />
        </motion.div>

        {/* Desktop nav links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 xl:flex 2xl:gap-7"
        >
          {navLinks.map(({ label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease }}
              className="group relative whitespace-nowrap py-3 font-ui text-sm font-medium text-espresso transition-colors hover:text-crimson focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson 2xl:text-[15px]"
            >
              {label}
              {/* Animated underline on hover */}
              <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full bg-crimson transition-all duration-300 ease-out group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* Right actions */}
        <motion.div
          className="flex shrink-0 items-center gap-2"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <motion.a
            href="#visit"
            aria-label="Get Location: see the brewn location and hours"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-crimson px-3.5 font-ui text-[11px] font-medium text-cream transition-colors hover:bg-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson sm:px-4"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <LocationIcon />
            <span className="hidden sm:inline">Get Location</span>
          </motion.a>

          {/* Mobile menu toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bronze/60 text-espresso transition-colors hover:bg-bronze/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson xl:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <motion.span
                className="h-px w-5 bg-current"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.span
                className="h-px w-5 bg-current"
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
              />
            </span>
          </button>
        </motion.div>
      </div>

      {/* ── Mobile navigation drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-bronze/40 bg-cream shadow-xl xl:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-5 pt-2 sm:px-8"
            >
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, delay: i * 0.06, ease }}
                  className="rounded-xl px-4 py-3 font-ui text-sm font-medium text-espresso transition-colors hover:bg-bronze/10 hover:text-crimson focus-visible:outline-2 focus-visible:outline-crimson"
                >
                  {label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, delay: 0.18, ease }}
              >
                <HeaderActions mobile onNavigate={closeMenu} />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
