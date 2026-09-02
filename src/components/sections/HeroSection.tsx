import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton } from "../PrimaryButton";
import { scrollToSection } from "../SmoothScroll";
import heroBg from "@/assets/hero-bg.jpg";
import rootOffLogo from "@/assets/root-off-logo.png";

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
  
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const ctx = gsap.context(() => {
      const mobile = window.innerWidth < 768;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=285%",
          scrub: 1,
          pin: ".hero-stage",
          anticipatePin: 1,
        },
      });
  
      // time slowly fade with word
      tl.to(".hero-meta", { opacity: 0.55, duration: 0.13 }, 0);
  
      // ROOT scales beyond the viewport and the image slowly reduces opacity
      tl.to(
        ".hero-word",
        { scale: mobile ? 1.9 : 4.5, ease: "none", duration: 0.23 },
        0,
      );
      tl.to(".hero-sub", { opacity: 0, y: -40, duration: 0.19 }, 0.06);
      tl.to(".hero-image", { opacity: 1, scale: 1, duration: 0.26 }, 0.06);
  
      // letters separate, image reveals through the type
      tl.to(".hero-image", { scale: 1.25, duration: 0.26 }, 0.32);
  
      // type retreats, statement clip reveal
      tl.to(
        ".hero-word",
        { scale: mobile ? 1.6 : 2.2, opacity: 0.70, duration: 0.23 },
        0.26,
      );
  
      tl.fromTo(
        ".hero-statement",
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.26 },
        0.32,
      );
  
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.13 },
        0.38,
      );
  
      tl.fromTo(
        ".hero-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.19 },
        0.32,
      );
  
      tl.to(".hero-image", { scale: 1.15, duration: 0.13 }, 0.58);
  
      tl.to(
        ".hero-statement",
        {
          clipPath: "inset(0 100% 0 0)",
          opacity: 1,
          duration: 0.22,
        },
        0.74,
      );
  
      tl.to(
        ".hero-cta",
        { opacity: 0, y: -24, duration: 0.19 },
        0.81,
      );
  
      tl.to(
        ".hero-rule",
        { scaleX: 0, duration: 0.26 },
        0.70,
      );
  
      // 90 - 100%: everything lifts away into the next chapter
      tl.to(
        ".hero-layer",
        { yPercent: -22, opacity: 0, duration: 0.26 },
        0.70,
      );
  
      tl.to(
        ".hero-image",
        { yPercent: -12, opacity: 0.3, duration: 0.23 },
        0.70,
      );
    }, root);
  
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="hero" className="relative">
      <div className="hero-stage relative h-screen w-full overflow-hidden bg-background">
        <img
          src={heroBg}
          alt="ROOT members working in a dark lab at Rajadhani Institute of Engineering and Technology"
          width={1920}
          height={1088}
          className="hero-image absolute inset-0 size-full scale-125 object-cover opacity-0"
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_92%)]" />

        <div className="hero-layer relative z-10 flex h-full flex-col justify-between px-5 py-24 md:px-10 md:py-28">
          <div className="hero-meta flex justify-end pt-6">
            <span className="text-right font-mono text-[0.62rem] uppercase tracking-[0.4em] text-muted-foreground">
            {now
              ? now.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : ""}
              <br />
            {now ? now.toLocaleTimeString("en-GB", { hour12: false }) : ""}
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src={rootOffLogo}
              alt="ROOT OFF — official logo"
              className="hero-word w-[62vw] object-contain md:w-[50vw]"
              style={{ willChange: "transform" }}
            />
            <p className="hero-sub mt-6 font-mono text-[0.66rem] uppercase tracking-[0.45em] text-muted-foreground">
              RIET
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <span className="hero-rule block h-px w-full origin-left bg-[color-mix(in_oklab,var(--primary)_70%,transparent)]"
              style={{
                transform: "scaleX(0)",
              }}
            />
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <h2 className="hero-statement font-display text-[9vw] font-semibold leading-[0.9] tracking-[-0.03em] text-foreground"
                style={{
                  clipPath: "inset(0 100% 0 0)",
                }}
              >
                Access the unknown.
              </h2>
              <div className="hero-cta"
                  style={{
                    opacity: 0,
                    transform: "translateY(24px)",
                  }}
                >
                <PrimaryButton label="Join Us" onClick={() => scrollToSection("join")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
