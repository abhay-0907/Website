export function StorySection() {
  return (
    <section id="story" className="scroll-mt-24 border-y border-bronze/40 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-18 md:grid-cols-[.8fr_1.2fr] md:items-center lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <p className="font-ui text-[10px] font-medium uppercase tracking-[.24em] text-crimson sm:text-xs">The brewn feeling</p>
          <h2 className="mt-3 max-w-[12ch] font-day text-3xl font-bold leading-tight tracking-[-.04em] text-espresso sm:text-4xl lg:text-5xl">
            Come for a coffee. Stay for the whole story.
          </h2>
        </div>
        <div className="border-l border-bronze pl-5 sm:pl-7 lg:pl-10">
          <p className="text-base leading-7 text-espresso/75 sm:text-lg sm:leading-8">
            brewn is built around the simple pleasure of a table well kept. In the morning, that means thoughtful coffee, open doors, and brunch worth slowing down for. After dark, the room softens into an intimate dinner shaped by the season.
          </p>
          <p className="mt-4 text-base leading-7 text-espresso/75 sm:text-lg sm:leading-8">
            Different moods, one generous welcome. Come as you are; we&apos;ll take care of the rest.
          </p>
          <a href="#menu" className="mt-6 inline-flex items-center gap-2 font-ui text-xs font-medium text-crimson underline decoration-bronze underline-offset-4 transition-colors hover:text-burgundy">
            Find your brewn moment <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
