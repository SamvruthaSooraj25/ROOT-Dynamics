import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import deanImage from "@/assets/dean.jpg";

const title = "Dean's Message — ROOT RIET Cybersecurity Community";
const description =
  "A message from the Dean of Rajadhani Institute of Engineering and Technology on ROOT, cybersecurity education and building defenders on campus.";

export const Route = createFileRoute("/dean")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DeanPage,
});

function DeanPage() {
  return (
    <PageShell
      eyebrow="Patronage"
      title={
        <>
          THE <span className="text-primary">DEAN</span>
        </>
      }
      intro="ROOT operates under the guidance and patronage of the Dean of Rajadhani Institute of Engineering and Technology."
    >
      <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
        <figure className="relative overflow-hidden">
          <img
            src={deanImage}
            alt="Portrait of the Dean of Rajadhani Institute of Engineering and Technology"
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
          />
          <figcaption className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.36em] text-muted-foreground">
            Dean — RIET
          </figcaption>
        </figure>

        <div>
          <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
            “Security is no longer a specialisation — it is the baseline literacy of every engineer
            we graduate.”
          </blockquote>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              ROOT began as a small group of students who refused to treat computers as black boxes.
              Today it is one of the most active technical communities on our campus, running
              capture-the-flag competitions, hands-on labs and awareness drives that reach far
              beyond the department that started it.
            </p>
            <p>
              The institution supports ROOT because its work is practical. Students here learn by
              breaking, documenting and defending real systems under supervision — a discipline that
              translates directly into the workplace and into responsible citizenship online.
            </p>
            <p>
              To every student reading this: bring your curiosity, keep it ethical, and this
              community will give you the mentors, the lab time and the stage to grow.
            </p>
          </div>

          <div className="mt-12 border-l border-primary pl-6">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              Dr. A. Ramachandran
            </p>
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground">
              Dean, Rajadhani Institute of Engineering and Technology
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
