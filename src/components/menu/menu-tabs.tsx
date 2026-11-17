"use client";

import { useEffect, useState, type KeyboardEvent } from "react";

type MenuKey = "coffee" | "brunch" | "dinner";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  specs: string[];
};

const tabs: { id: MenuKey; label: string; eyebrow: string }[] = [
  { id: "coffee", label: "Specialty Coffee", eyebrow: "The morning ritual" },
  { id: "brunch", label: "All-Day Brunch", eyebrow: "A little longer at the table" },
  { id: "dinner", label: "Fine Dining Dinner", eyebrow: "After hours, by candlelight" },
];

const menu: Record<MenuKey, MenuItem[]> = {
  coffee: [
    { name: "House espresso", description: "Chocolate, blood orange, a lingering honey finish.", price: "$4", specs: ["V"] },
    { name: "Oat flat white", description: "Our signature blend, double pulled, velvet oat.", price: "$6", specs: ["V", "GF"] },
    { name: "Cardamom cloud latte", description: "Warm spice, soft foam, a little bit of magic.", price: "$7", specs: ["V"] },
    { name: "Single-origin pour-over", description: "Ask us what is on the bar this week.", price: "$8", specs: ["V", "GF"] },
  ],
  brunch: [
    { name: "Whipped ricotta toast", description: "Stone fruit, wildflower honey, sourdough, thyme.", price: "$16", specs: ["V"] },
    { name: "Soft scramble & brown butter", description: "Cultured butter, chives, thick-cut country loaf.", price: "$18", specs: ["V"] },
    { name: "Crispy potato hash", description: "Confit potatoes, green tahini, pickled shallot.", price: "$17", specs: ["V", "GF"] },
    { name: "Buttermilk lemon pancakes", description: "Macerated berries, maple, whipped crème fraîche.", price: "$19", specs: ["V"] },
  ],
  dinner: [
    { name: "Scallop crudo", description: "White peach, finger lime, basil oil, sea salt.", price: "$22", specs: ["GF"] },
    { name: "Wild mushroom agnolotti", description: "Brown butter, aged pecorino, toasted hazelnut.", price: "$31", specs: ["V"] },
    { name: "Slow-braised short rib", description: "Celery root silk, red wine jus, crisp shallot.", price: "$42", specs: ["GF"] },
    { name: "Dark chocolate crémeux", description: "Olive oil, flaky salt, roasted pear.", price: "$16", specs: ["V", "GF"] },
  ],
};

const winePairings = [
  { name: "Loire Chenin Blanc", detail: "bright · mineral", price: "$15" },
  { name: "Etna Rosso", detail: "silky · wild cherry", price: "$19" },
  { name: "Brut Rosé", detail: "dry · fine bubbles", price: "$18" },
];

const hashToTab: Record<string, MenuKey> = {
  "#coffee": "coffee",
  "#coffee-brunch": "brunch",
  "#dinner-experience": "dinner",
};

export function MenuTabs() {
  const [activeTab, setActiveTab] = useState<MenuKey>("coffee");
  const isDinner = activeTab === "dinner";
  const activeInfo = tabs.find((tab) => tab.id === activeTab)!;

  function selectTab(tab: MenuKey) {
    setActiveTab(tab);
    const hash = tab === "dinner" ? "#dinner-experience" : tab === "brunch" ? "#coffee-brunch" : "#coffee";
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  }

  useEffect(() => {
    function syncTabWithHash() {
      const requestedTab = hashToTab[window.location.hash];
      if (requestedTab) setActiveTab(requestedTab);
    }

    syncTabWithHash();
    window.addEventListener("hashchange", syncTabWithHash);
    return () => window.removeEventListener("hashchange", syncTabWithHash);
  }, []);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    selectTab(nextTab.id);
    document.getElementById(`tab-${nextTab.id}`)?.focus();
  }

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className={`relative scroll-mt-24 py-16 transition-colors duration-500 sm:py-20 lg:py-24 ${isDinner ? "bg-burgundy text-champagne" : "bg-cream text-espresso"}`}
    >
      <span id="coffee" className="absolute left-0 top-0 scroll-mt-24" aria-hidden="true" />
      <span id="coffee-brunch" className="absolute left-0 top-0 scroll-mt-24" aria-hidden="true" />
      <span id="dinner-experience" className="absolute left-0 top-0 scroll-mt-24" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className={`font-ui text-[10px] font-medium uppercase tracking-[.25em] sm:text-xs ${isDinner ? "text-bronze" : "text-crimson"}`}>
            From first light to last course
          </p>
          <h2 id="menu-heading" className={`mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl lg:text-5xl ${isDinner ? "font-evening font-semibold" : "font-day"}`}>
            A table for every hour.
          </h2>
          <p className={`mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base sm:leading-7 ${isDinner ? "text-champagne/75" : "text-espresso/70"}`}>
            {isDinner
              ? "Seasonal ingredients, thoughtful pairings, and the pleasure of taking your time."
              : "Find your favorite morning pour, linger over brunch, or join us when the lights go low."}
          </p>
        </div>

        <div className={`mx-auto mt-8 grid max-w-3xl grid-cols-3 rounded-2xl border p-1 sm:mt-10 ${isDinner ? "border-bronze/60 bg-burgundy" : "border-bronze/50 bg-cream"}`} role="tablist" aria-label="Choose a brewn menu">
          {tabs.map((tab, index) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="menu-panel"
                onClick={() => selectTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`min-h-[54px] rounded-xl px-2 py-2 font-ui text-[9px] font-medium leading-tight transition-colors sm:min-h-12 sm:px-3 sm:text-xs ${selected
                  ? isDinner
                    ? "bg-champagne text-burgundy shadow-sm"
                    : "bg-crimson text-cream shadow-sm"
                  : isDinner
                    ? "text-champagne/75 hover:bg-champagne/10"
                    : "text-espresso/70 hover:bg-cream"}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id="menu-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${activeTab}`}
          className={`mx-auto mt-5 max-w-5xl rounded-[1.75rem] border p-5 sm:mt-7 sm:p-8 lg:p-10 ${isDinner ? "border-bronze/70 bg-burgundy" : "border-bronze/45 bg-cream"}`}
        >
          <div className={`mb-5 flex flex-col gap-1 border-b pb-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between ${isDinner ? "border-bronze/50" : "border-bronze/40"}`}>
            <div>
              <p className={`font-mono text-[10px] uppercase tracking-[.18em] ${isDinner ? "text-bronze" : "text-crimson"}`}>{activeInfo.eyebrow}</p>
              <h3 className={`mt-1 text-2xl font-bold sm:text-3xl ${isDinner ? "font-evening font-semibold" : "font-day"}`}>
                {activeInfo.label}
              </h3>
            </div>
            <p className={`font-mono text-[9px] uppercase tracking-[.12em] ${isDinner ? "text-champagne/55" : "text-espresso/50"}`}>
              Seasonal · thoughtfully sourced
            </p>
          </div>

          <div className="grid gap-x-10 sm:grid-cols-2">
            {menu[activeTab].map((item) => (
              <article key={item.name} className={`border-b py-4 last:border-b-0 sm:py-5 sm:[&:nth-last-child(2)]:border-b-0 ${isDinner ? "border-bronze/35" : "border-bronze/30"}`}>
                <div className="flex items-start justify-between gap-3">
                  <h4 className={`font-semibold leading-snug ${isDinner ? "font-evening text-xl sm:text-2xl" : "font-day text-base sm:text-lg"}`}>
                    {item.name}
                  </h4>
                  <span className={`shrink-0 pt-0.5 font-mono text-sm ${isDinner ? "text-champagne" : "text-crimson"}`}>{item.price}</span>
                </div>
                <p className={`mt-1.5 text-xs leading-5 sm:text-sm ${isDinner ? "text-champagne/70" : "text-espresso/65"}`}>{item.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.specs.map((spec) => (
                    <span key={spec} className={`rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wide ${isDinner ? "border-bronze/60 text-champagne/80" : "border-bronze/70 text-espresso/65"}`}>
                      {spec}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className={`mt-5 text-[10px] leading-5 ${isDinner ? "text-champagne/50" : "text-espresso/50"}`}>
            <span className="font-mono">V</span> vegetarian · <span className="font-mono">GF</span> gluten-free. Please let our team know about allergies; menus change with the seasons.
          </p>

          {isDinner && (
            <div className="mt-7 border-t border-bronze/50 pt-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[.18em] text-bronze">A considered pour</p>
                  <h4 className="mt-1 font-evening text-2xl font-semibold text-champagne sm:text-3xl">Wine & pairings</h4>
                </div>
                <p className="text-xs text-champagne/60">A few favorites from the cellar</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {winePairings.map((wine) => (
                  <div key={wine.name} className="rounded-xl border border-bronze/45 bg-burgundy p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-evening text-lg font-semibold leading-tight text-champagne">{wine.name}</p>
                      <span className="shrink-0 font-mono text-xs text-bronze">{wine.price}</span>
                    </div>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[.12em] text-champagne/55">{wine.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
