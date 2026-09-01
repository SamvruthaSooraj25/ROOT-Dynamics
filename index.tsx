import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorRing } from "@/components/CursorRing";
import { HeroSection } from "@/components/sections/HeroSection";
import { VisionMissionSection } from "@/components/sections/VisionMissionSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { LegacySection } from "@/components/sections/LegacySection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { JoinSection } from "@/components/sections/JoinSection";

const title = "ROOT RIET — Cybersecurity Community";
const description =
  "ROOT is the cybersecurity community of Rajadhani Institute of Engineering and Technology. CTFs, labs, research and events. Access the unknown.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CursorRing />
      <Navbar />
      <main className="bg-background">
        <HeroSection />
        <VisionMissionSection />
        <TeamSection />
        <LegacySection />
        <EventsSection />
        <ContactSection />
        <JoinSection />
      </main>
    </SmoothScroll>
  );
}
