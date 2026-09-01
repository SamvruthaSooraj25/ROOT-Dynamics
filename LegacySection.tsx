import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionIndicator } from "../SectionIndicator";
import y23 from "@/assets/legacy-2023.jpg";
import y24 from "@/assets/legacy-2024.jpg";
import y25 from "@/assets/legacy-2025.jpg";
import y26 from "@/assets/legacy-2026.jpg";

const YEARS = [
  { year: "2023", img: y23, title: "Origin", desc: "Eleven students, one borrowed classroom and a shared shell. ROOT is founded at RIET." },
  { year: "2024", img: y24, title: "Training Ground", desc: "Weekly labs begin. The first internal CTF ships with 40 challenges written by members." },
  { year: "2025", img: y25, title: "Going Loud", desc: "ROOT hosts its first inter-college capture-the-flag and publishes three disclosure reports." },
  { year: "2026", img: y26, title: "The Network", desc: "A campus-wide security programme, an alumni pipeline and a range that never sleeps." },
];

export function LegacySection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const track = root.current!.querySelector<HTMLElement>(".legacy-track")!;
      const distance = () => track.scrollWidth - window.innerWidth;

      const move = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight}`,
          scrub: 1,
          pin: ".legacy-stage",
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".legacy-panel").forEach((panel) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: move,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
        tl.fromTo(panel.querySelector(".legacy-img"), { scale: 1.25, xPercent: 8 }, { scale: 1, xPercent: 0, duration: 0.5 })
          .to(panel.querySelector(".legacy-img"), { scale: 1.12, xPercent: -8, duration: 0.5 });
        tl.fromTo(
          panel.querySelector(".legacy-year"),
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.3 },
          0.25,
        );
        tl.fromTo(panel.querySelector(".legacy-copy"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, 0.35);
      });

      gsap.fromTo(
        ".legacy-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight}`,
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="legacy" className="relative h-[460vh] bg-background">
      <div className="legacy-stage relative h-screen w-full overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-28 md:px-10">
          <SectionIndicator index="04 / 07" label="Legacy" />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-muted-foreground">
            2023 — 2026
          </span>
        </div>

        <div className="legacy-track flex h-full items-center will-change-transform">
          {YEARS.map((y) => (
            <article
              key={y.year}
              className="legacy-panel relative flex h-full w-screen shrink-0 items-center px-5 md:px-[8vw]"
            >
              <div className="relative h-[58vh] w-full overflow-hidden">
                <img
                  src={y.img}
                  alt={`ROOT RIET in ${y.year}: ${y.title}`}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="legacy-img size-full object-cover opacity-70"
                  style={{ willChange: "transform" }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_65%)]" />

                <div className="absolute inset-x-6 bottom-6 md:inset-x-12 md:bottom-10">
                  <h3 className="legacy-year font-display text-[22vw] font-bold leading-[0.78] tracking-[-0.06em] text-foreground md:text-[12vw]">
                    {y.year}
                  </h3>
                  <div className="legacy-copy mt-4 flex flex-col gap-3 md:max-w-xl">
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.35em] text-primary">
                      {y.title}
                    </span>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-xl">{y.desc}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute inset-x-5 bottom-8 z-20 h-px bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)] md:inset-x-10">
          <div className="legacy-progress h-full origin-left bg-primary" />
        </div>
      </div>
    </section>
  );
}
