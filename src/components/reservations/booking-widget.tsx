"use client";

import { useState, type FormEvent } from "react";

export function BookingWidget() {
  const [confirmation, setConfirmation] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const guests = formData.get("guests");
    const date = formData.get("date");
    const time = formData.get("time");

    setConfirmation(
      `Your demo request is ready for ${guests} on ${date} at ${time}. Connect a reservation service to send it to the brewn team.`,
    );
  }

  const inputClassName = "mt-1.5 min-h-12 w-full rounded-xl border border-bronze/55 bg-cream px-3.5 text-sm text-espresso outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15";
  const labelClassName = "font-ui text-[10px] font-medium uppercase tracking-[.13em] text-espresso/70";

  return (
    <div className="rounded-[1.75rem] border border-bronze p-1.5 sm:p-2">
      <div className="rounded-[1.3rem] border border-bronze/45 bg-cream p-5 sm:p-7 lg:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-crimson">An evening to remember</p>
            <h3 className="mt-1 font-day text-2xl font-bold tracking-tight text-espresso sm:text-3xl">Reserve your table</h3>
          </div>
          <span className="hidden rounded-full border border-bronze/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wide text-espresso/60 sm:inline-flex">Dinner · Wed–Sun</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClassName}>
              Your name
              <input className={inputClassName} name="name" type="text" autoComplete="name" placeholder="Name for the reservation" required />
            </label>
            <label className={labelClassName}>
              Email address
              <input className={inputClassName} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <label className={labelClassName}>
              Date
              <input className={inputClassName} name="date" type="date" required />
            </label>
            <label className={labelClassName}>
              Time
              <select className={inputClassName} name="time" defaultValue="7:00 pm" required>
                <option>5:30 pm</option>
                <option>6:00 pm</option>
                <option>6:30 pm</option>
                <option>7:00 pm</option>
                <option>7:30 pm</option>
                <option>8:00 pm</option>
                <option>8:30 pm</option>
              </select>
            </label>
            <label className={`${labelClassName} col-span-2 sm:col-span-1`}>
              Guests
              <select className={inputClassName} name="guests" defaultValue="2 guests" required>
                <option>1 guest</option>
                <option>2 guests</option>
                <option>3 guests</option>
                <option>4 guests</option>
                <option>5 guests</option>
                <option>6 guests</option>
              </select>
            </label>
          </div>

          <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-crimson px-6 font-ui text-xs font-medium text-cream transition-colors hover:bg-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson sm:text-sm">
            Request a reservation
          </button>

          <p className="text-center text-[10px] leading-5 text-espresso/55">
            Demo booking form. No details are sent or stored yet.
          </p>
          {confirmation && (
            <p role="status" className="rounded-xl border border-bronze/50 bg-cream px-4 py-3 text-xs leading-5 text-espresso">
              {confirmation}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
