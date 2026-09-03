import { Mail, MapPin, Phone } from "lucide-react";
import { SectionIndicator } from "../SectionIndicator";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "root@riet.ac.in", href: "mailto:root@riet.ac.in" },
  { icon: Phone, label: "Phone", value: "+91 471 273 0399", href: "tel:+914712730399" },
  {
    icon: MapPin,
    label: "Campus",
    value:
      "Rajadhani Institute of Engineering and Technology, Attingal, Thiruvananthapuram, Kerala 695102",
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Discord", href: "https://discord.com" },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionIndicator index="06 / 07" label="Contact" />
        <h2 className="mt-10 font-display text-[11vw] font-semibold leading-[0.9] tracking-[-0.03em] text-foreground md:text-[6.5vw]">
          GET IN <span className="text-primary">TOUCH</span>
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Questions, collaborations, speaking invites or a bug you want to report responsibly —
          this is the fastest way to reach ROOT.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
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
      </div>
    </section>
  );
}
