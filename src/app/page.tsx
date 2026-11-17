import { HeroSection } from "@/components/hero/hero-section";
import { MenuTabs } from "@/components/menu/menu-tabs";
import { ReservationSection } from "@/components/sections/reservation-section";
import { StorySection } from "@/components/sections/story-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream">
        <HeroSection />
        <MenuTabs />
        <StorySection />
        <ReservationSection />
      </main>
      <SiteFooter />
    </>
  );
}
