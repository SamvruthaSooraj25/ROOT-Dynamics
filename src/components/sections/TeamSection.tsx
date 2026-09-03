import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionIndicator } from "../SectionIndicator";
import t1 from "@/assets/team-01.jpg";
import t2 from "@/assets/team-02.jpg";
import t3 from "@/assets/team-03.jpg";
import t4 from "@/assets/team-04.jpg";

const MEMBERS = [
  {
    img: t1,
    name: "Adhrith Menon",
    role: "Lead / Offensive Security",
    id: "ROOT_ID :: 0x01",
    desc: "Runs the red team track. Breaks campus infrastructure so nobody else can.",
  },
  {
    img: t2,
    name: "Nandana Krishna",
    role: "Research / Threat Intel",
    id: "ROOT_ID :: 0x02",
    desc: "Tracks malware families and turns raw telemetry into readable stories.",
  },
  {
    img: t3,
    name: "Vishnu Prasad",
    role: "Infrastructure / Blue Team",
    id: "ROOT_ID :: 0x03",
    desc: "Builds the labs, the range and the detection rules that everyone trains on.",
  },
  {
    img: t4,
    name: "Meera Rajan",
    role: "Community / CTF Ops",
    id: "ROOT_ID :: 0x04",
    desc: "Designs challenges, runs the events, keeps the community loud and open.",
  },
];

export function TeamSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = root.current!.querySelector<HTMLElement>(".team-track")!;
      const distance = () => track.scrollWidth - window.innerWidth;

      const move = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight}`,
          scrub: 1,
          pin: ".team-stage",
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: move,
            start: "left 85%",
            end: "right 15%",
            scrub: true,
          },
        });
        tl.fromTo(card.querySelector(".team-photo"), { scale: 0.86 }, { scale: 1, duration: 0.5 })
          .to(card.querySelector(".team-photo"), { scale: 0.86, duration: 0.5 });
        tl.fromTo(
          card.querySelectorAll(".team-meta > *"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.35 },
          0.15,
        );
        tl.fromTo(card.querySelector(".team-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, 0.25);
      });

      gsap.to(".team-title", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="team" className="relative h-[420vh] bg-[var(--surface)]">
      <div className="team-stage relative h-screen w-full overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-5 pt-28 md:px-10">
          <SectionIndicator index="03 / 07" label="The People" />
        </div>

        <h2 className="team-title pointer-events-none absolute bottom-6 left-0 z-0 whitespace-nowrap font-display text-[16vw] font-bold leading-none tracking-[-0.05em] text-[color-mix(in_oklab,var(--foreground)_8%,transparent)]">
          THE PEOPLE BEHIND ROOT
        </h2>

        <div className="team-track relative z-10 flex h-full items-center gap-[6vw] px-[8vw] will-change-transform">
          {MEMBERS.map((m, i) => (
            <article key={m.name} className="team-card flex w-[78vw] shrink-0 gap-8 md:w-[52vw]">
              <div className="relative h-[62vh] w-[58%] overflow-hidden md:w-[52%]">
                <img
                  src={m.img}
                  alt={`${m.name}, ${m.role} at ROOT RIET`}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="team-photo size-full object-cover"
                  style={{ willChange: "transform" }}
                />
              </div>
              <div className="team-meta flex flex-1 flex-col justify-end pb-6">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[7vw] font-semibold leading-[0.9] tracking-[-0.03em] text-foreground md:text-[3.2vw]">
                  {m.name}
                </h3>
                <span className="team-rule my-5 block h-px w-full origin-left bg-primary" />
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {m.role}
                </p>
                <p className="mt-2 font-mono text-[0.62rem] tracking-[0.2em] text-[color-mix(in_oklab,var(--foreground)_45%,transparent)]">
                  {m.id}
                </p>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
