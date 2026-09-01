import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const title = "Contact — ROOT RIET Cybersecurity Community";
const description =
  "Reach ROOT, the cybersecurity community at Rajadhani Institute of Engineering and Technology. Email, campus address and social channels.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

const CHANNELS = [
  { icon: Mail, label: "Email", value: "root@riet.ac.in", href: "mailto:root@riet.ac.in" },
  { icon: Phone, label: "Phone", value: "+91 471 273 0399", href: "tel:+914712730399" },
  {
    icon: MapPin,
    label: "Campus",
    value: "Rajadhani Institute of Engineering and Technology, Attingal, Thiruvananthapuram, Kerala 695102",
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Discord", href: "https://discord.com" },
];

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title={
        <>
          GET IN <span className="text-primary">TOUCH</span>
        </>
      }
      intro="Questions, collaborations, speaking invites or a bug you want to report responsibly — this is the fastest way to reach ROOT."
    >
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-px bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)]">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const inner = (
              <div className="flex items-start gap-5 bg-background p-7">
                <Icon className="mt-1 size-4 text-primary" />
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.36em] text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground">{c.value}</p>
                </div>
              </div>
            );
            return c.href ? (
              <a key={c.label} href={c.href} className="block transition-opacity hover:opacity-80">
                {inner}
              </a>
            ) : (
              <div key={c.label}>{inner}</div>
            );
          })}
        </div>

        <div className="border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] p-8">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.36em] text-muted-foreground">
            Follow
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="mt-10 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
            Response time — 48 hrs
          </p>
        </div>
      </div>
    </PageShell>
  );
}
