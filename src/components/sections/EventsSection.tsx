import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SectionIndicator } from "../SectionIndicator";
import e1 from "@/assets/event-01.jpg";
import e2 from "@/assets/event-02.jpg";
import e3 from "@/assets/event-03.jpg";
import e4 from "@/assets/event-04.jpg";

const EVENTS = [
  { img: e1, name: "Shellbound", date: "12 Feb 2026", cat: "Capture The Flag", desc: "36 hours, 52 challenges, one scoreboard. Binary exploitation to cloud misconfig." },
  { img: e2, name: "Hardening Day", date: "04 Apr 2026", cat: "Workshop", desc: "Blue team intensive on log pipelines, detection rules and incident triage." },
  { img: e3, name: "Nightbuild", date: "21 Jun 2026", cat: "Hackathon", desc: "Overnight build sprint for defensive tooling written by first-year members." },
  { img: e4, name: "Disclosure", date: "09 Sep 2026", cat: "Speaker Session", desc: "Industry researchers on responsible disclosure and life after the bug bounty." },
];

export function EventsSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = root.current!.querySelector<HTMLElement>(".ev-track")!;
      const distance = () => track.scrollWidth - window.innerWidth;

      const move = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight}`,
          scrub: 1,
          pin: ".ev-stage",
          pinType: "fixed",
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".ev-card").forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, containerAnimation: move, start: "left right", end: "right left", scrub: true },
        });
        tl.fromTo(card.querySelector(".ev-img"), { scale: 0.88 }, { scale: 1.04, duration: 0.5 })
          .to(card.querySelector(".ev-img"), { scale: 0.88, duration: 0.5 });
        tl.fromTo(card.querySelectorAll(".ev-meta > *"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.3 }, 0.2);
      });

      gsap.fromTo(
        ".ev-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance() + window.innerHeight}`, scrub: true },
        },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".ev-title",
          { xPercent: 8 },
          { xPercent: -8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 } },
        );
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      if ((document as any).fonts?.ready) {
        (document as any).fonts.ready.then(refresh);
      }

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="events" className="relative bg-[var(--surface)]">
      <div className="ev-stage relative h-screen w-full overflow-hidden bg-[var(--surface)]">
        <div className="absolute inset-x-0 top-0 z-20 flex flex-col gap-2 px-5 pt-24 sm:flex-row sm:items-center sm:justify-between sm:pt-28 md:px-10">
          <SectionIndicator index="05 / 07" label="Events" />
          <h2 className="ev-title whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.25em] text-foreground sm:text-sm md:text-lg md:tracking-[0.4em]">
            ROOT in action
          </h2>
        </div>

        <div className="ev-track flex h-full items-center gap-[5vw] px-[7vw] will-change-transform">
          {EVENTS.map((ev, i) => (
            <article key={ev.name} className="ev-card w-[82vw] shrink-0 md:w-[46vw]">
              <div className="relative h-[46vh] overflow-hidden">
                <img
                  src={ev.img}
                  alt={`${ev.name} — ${ev.cat} hosted by ROOT RIET`}
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="ev-img size-full object-cover opacity-80"
                  style={{ willChange: "transform" }}
                />
                {/* <span className="absolute left-4 top-4 font-mono text-[0.62rem] tracking-[0.3em] text-foreground">
                  EVENT {String(i + 1).padStart(2, "0")}
                </span> */}
              </div>
              <div className="ev-meta mt-6">
                <div className="flex flex-wrap items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                  <span className="text-primary">{ev.cat}</span>
                  <span>{ev.date}</span>
                </div>
                <h3 className="mt-3 font-display text-[9vw] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground md:text-[3.4vw]">
                  {ev.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {ev.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-foreground">
                  View event <ArrowUpRight className="size-3.5 text-primary" />
                </span>
              </div>
            </article>
          ))}
          <div aria-hidden className="ev-spacer h-full w-[20vw] shrink-0 md:w-[14vw]" />
        </div>

        <div className="absolute inset-x-5 bottom-8 z-20 h-px bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)] md:inset-x-10">
          <div className="ev-progress h-full origin-left bg-primary" />
        </div>
      </div>
    </section>
  );
}