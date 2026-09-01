import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { Navbar } from "./Navbar";
import { ScrollProgress } from "./ScrollProgress";
import { CursorRing } from "./CursorRing";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, intro, children }: Props) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CursorRing />
      <Navbar />
      <main className="min-h-screen bg-background pb-32 pt-40">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.4em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[13vw] font-bold leading-[0.85] tracking-[-0.05em] text-foreground md:text-[6.5vw]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
          <span className="mt-14 block h-px w-full bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]" />
          <div className="mt-16">{children}</div>
        </div>
      </main>
    </SmoothScroll>
  );
}
