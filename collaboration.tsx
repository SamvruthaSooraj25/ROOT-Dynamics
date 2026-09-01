import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";

const title = "Collaboration — ROOT RIET Cybersecurity Community";
const description =
  "Partner with ROOT RIET on CTFs, workshops, security research and industry programs. Explore collaboration tracks for companies, colleges and communities.";

export const Route = createFileRoute("/collaboration")({
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
  component: CollaborationPage,
});

const TRACKS = [
  {
    id: "01",
    name: "Industry Partnerships",
    body: "Joint labs, internships and red-team training with security firms and SOC teams.",
  },
  {
    id: "02",
    name: "Inter-College CTFs",
    body: "Co-hosted capture-the-flag events, jeopardy and attack-defense arenas across campuses.",
  },
  {
    id: "03",
    name: "Research & Disclosure",
    body: "Coordinated vulnerability research, responsible disclosure and publication support.",
  },
  {
    id: "04",
    name: "Community Chapters",
    body: "Cross-community meetups with OWASP, null and student security collectives.",
  },
];

const PARTNERS = ["OWASP", "NULL", "CERT-IN", "TINKERHUB", "IEEE", "HACKCLUB"];

function CollaborationPage() {
  return (
    <PageShell
      eyebrow="Collaborate"
      title={
        <>
          BUILD <span className="text-primary">WITH US</span>
        </>
      }
      intro="ROOT works with companies, institutions and communities to run security programs that actually ship outcomes — trained students, disclosed bugs, and events people remember."
    >
      <div className="grid gap-px bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)] md:grid-cols-2">
        {TRACKS.map((t) => (
          <article key={t.id} className="group bg-background p-8 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--primary)_8%,var(--background))]">
            <span className="font-mono text-[0.66rem] tracking-[0.4em] text-primary">{t.id}</span>
            <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
              {t.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-20">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.4em] text-muted-foreground">
          Ecosystem
        </p>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {PARTNERS.map((p) => (
            <span
              key={p}
              className="font-display text-xl font-semibold tracking-[0.2em] text-[color-mix(in_oklab,var(--foreground)_45%,transparent)] transition-colors duration-500 hover:text-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-20 border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] p-10">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Have a program in mind?
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Send us a short brief — scope, timeline and what success looks like. We reply within a
          week.
        </p>
        <PrimaryButton
          className="mt-8"
          label="Propose a collaboration"
          onClick={() =>
            window.open(
              "mailto:root@riet.ac.in?subject=Collaboration%20with%20ROOT",
              "_blank",
              "noopener",
            )
          }
        />
      </div>
    </PageShell>
  );
}
