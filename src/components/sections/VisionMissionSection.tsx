import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionIndicator } from "../SectionIndicator";

export function VisionMissionSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=320%",
          scrub: 1,
          pin: ".vm-stage",
          anticipatePin: 1,
        },
      });

      tl.fromTo(".vm-vision-word", { xPercent: 12, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.15 }, 0);
      tl.fromTo(".vm-vision-body", { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.15 }, 0.05);

      tl.fromTo(".vm-line", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 0.5 }, 0.2);

      tl.to(".vm-vision-word", { xPercent: -85, duration: 0.3, ease: "none" }, 0.32);
      tl.to(".vm-vision-body", { yPercent: -120, opacity: 0, duration: 0.25 }, 0.34);
      tl.to(".vm-vision", { clipPath: "inset(0 0 100% 0)", duration: 0.15 }, 0.5);

      tl.fromTo(
        ".vm-mission-word",
        { xPercent: 110, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.25, ease: "none" },
        0.52,
      );
      tl.fromTo(
        ".vm-mission-body",
        { clipPath: "inset(0 0 100% 0)", yPercent: 18 },
        { clipPath: "inset(0 0 0% 0)", yPercent: 0, duration: 0.2 },
        0.65,
      );
      tl.fromTo(".vm-mission-item", { opacity: 0, x: 40 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.2 }, 0.7);

      tl.to(".vm-stage-inner", { yPercent: -18, opacity: 0, duration: 0.12 }, 0.9);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="vision" className="relative h-[420vh] bg-background">
      <div className="vm-stage relative h-screen w-full overflow-hidden">
        <span className="vm-line absolute left-1/2 top-0 h-full w-px origin-top bg-[color-mix(in_oklab,var(--primary)_75%,transparent)] md:left-[52%]" />

        <div className="vm-stage-inner relative flex h-full flex-col justify-between px-5 py-24 md:px-10">
          <SectionIndicator index="02 / 07" label="Vision & Mission" />

          <div className="grid flex-1 items-center gap-8 md:grid-cols-2">
            <div className="relative">
              <h2 className="vm-vision-word font-display text-[19vw] font-bold leading-[0.8] tracking-[-0.05em] text-foreground md:text-[11vw]">
                OUR
                <br />
                <span className="text-primary">VISION</span>
              </h2>
              <h2 className="vm-mission-word absolute inset-0 font-display text-[19vw] font-bold leading-[0.8] tracking-[-0.05em] text-foreground md:text-[11vw]">
                OUR
                <br />
                <span className="text-primary">MISSION</span>
              </h2>
            </div>

            <div className="relative min-h-[45vh]">
              <div className="vm-vision absolute inset-0">
                <p className="vm-vision-body max-w-lg text-lg leading-relaxed text-muted-foreground md:text-2xl">
                  To make Rajadhani Institute of Engineering and Technology a place where security
                  is not a subject, but a way of thinking — where curiosity is trained, tested and
                  trusted.
                </p>
              </div>

              <div className="vm-mission-body absolute inset-0">
                <ul className="max-w-lg space-y-6">
                  {[
                    ["01", "Train students in offensive and defensive security through hands-on labs."],
                    ["02", "Run CTFs, workshops and audits that mirror real-world incidents."],
                    ["03", "Build a campus network that shares research, tooling and opportunity."],
                    ["04", "Defend what we build — ethics before exploitation, always."],
                  ].map(([n, text]) => (
                    <li key={n} className="vm-mission-item flex gap-5 border-t border-border pt-4">
                      <span className="font-mono text-[0.66rem] text-primary">{n}</span>
                      <span className="text-base leading-relaxed text-muted-foreground md:text-lg">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
