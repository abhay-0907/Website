import { BookingWidget } from "@/components/reservations/booking-widget";

const privateDiningDetails = ["Intimate celebrations", "Thoughtful set menus", "A room of your own"];

export function ReservationSection() {
  return (
    <section id="reservations" className="scroll-mt-24 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <p className="font-ui text-[10px] font-medium uppercase tracking-[.24em] text-crimson sm:text-xs">Book your evening</p>
          <h2 className="mt-3 max-w-[12ch] font-day text-3xl font-bold leading-tight tracking-[-.04em] text-espresso sm:text-4xl lg:text-5xl">
            Make room for something memorable.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-espresso/70 sm:text-base sm:leading-7">
            Gather around the table for a seasonal dinner, a celebration, or a just-because kind of night. We&apos;ll make it feel like yours.
          </p>

          <div className="mt-7 border-t border-bronze/45 pt-5">
            <p className="font-ui text-[10px] font-medium uppercase tracking-[.17em] text-crimson">Private dining at brewn</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {privateDiningDetails.map((detail) => (
                <li key={detail} className="flex items-center gap-2 text-sm text-espresso/75">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-bronze" />
                  {detail}
                </li>
              ))}
            </ul>
            <a href="#visit" className="mt-5 inline-flex min-h-10 items-center rounded-full border border-bronze px-4 font-ui text-[11px] font-medium text-espresso transition-colors hover:bg-bronze/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson">
              Ask about a private gathering
            </a>
          </div>
        </div>

        <BookingWidget />
      </div>
    </section>
  );
}
