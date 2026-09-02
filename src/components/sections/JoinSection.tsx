import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton } from "../PrimaryButton";
import { SectionIndicator } from "../SectionIndicator";

export function JoinSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: ".join-stage",
          anticipatePin: 1,
        },
      });

      tl.fromTo(".join-line", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 0.18 }, 0);
      tl.fromTo(
        ".join-word",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.2 },
        0.18,
      );
      tl.to(".join-headline", { scale: 1.12, duration: 0.35, ease: "none" }, 0.45);
      tl.fromTo(".join-cta", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.12 }, 0.62);
      tl.fromTo(".join-tag", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.72);
      tl.to(".join-headline", { opacity: 0.12, scale: 1.2, duration: 0.15 }, 0.82);
      tl.fromTo(".join-mark", { opacity: 0, letterSpacing: "1.2em" }, { opacity: 1, letterSpacing: "0.4em", duration: 0.18 }, 0.84);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="join" className="relative h-[400vh] bg-background">
      <div className="join-stage relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-5">
        <div className="absolute inset-x-5 top-28 md:inset-x-10">
          <SectionIndicator index="07 / 07" label="Join Us" />
        </div>

        <span className="join-line absolute left-0 top-1/2 h-px w-full origin-left bg-primary" />

        <h2 className="join-headline text-center font-display text-[17vw] font-bold leading-[0.82] tracking-[-0.06em] text-foreground md:text-[11vw]">
          <span className="block overflow-hidden">
            <span className="join-word block">READY</span>
          </span>
          <span className="block overflow-hidden">
            <span className="join-word block">TO GET</span>
          </span>
          <span className="block overflow-hidden">
            <span className="join-word block text-primary">ROOTED?</span>
          </span>
        </h2>

        <div className="join-cta mt-12">
          <PrimaryButton
            label="Join ROOT"
            onClick={() =>
              window.open("mailto:root@riet.ac.in?subject=Join%20ROOT", "_blank", "noopener")
            }
          />
        </div>

        <p className="join-tag mt-8 font-mono text-[0.66rem] uppercase tracking-[0.4em] text-muted-foreground">
          Learn. Explore. Build. Defend.
        </p>

        <span className="join-mark absolute bottom-12 font-display text-xs font-semibold uppercase tracking-[0.4em] text-[color-mix(in_oklab,var(--foreground)_55%,transparent)]">
          ROOT — RIET
        </span>
      </div>
    </section>
  );
}
