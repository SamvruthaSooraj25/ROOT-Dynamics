import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { scrollToSection } from "./SmoothScroll";

const SECTION_LINKS = [
  { id: "vision", label: "Vision" },
  { id: "team", label: "Team" },
  { id: "legacy", label: "Legacy" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
];

const PAGE_LINKS = [
  { to: "/dean", label: "Dean" },
  { to: "/collaboration", label: "Collab" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = ["hero", ...SECTION_LINKS.map((l) => l.id), "join"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const goToSection = (id: string) => {
    if (isHome) {
      scrollToSection(id);
    } else {
      navigate({ to: "/", hash: id });
    }
  };

  const linkClass = (isActive: boolean) =>
    `relative font-mono text-[0.66rem] uppercase tracking-[0.3em] transition-colors duration-300 ${
      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-[0.3em] text-foreground"
        >
          ROOT
          <span className="text-primary">.</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <Link to="/" className={linkClass(isHome && active === "hero")}>
            Home
            <span
              className={`absolute -bottom-2 left-0 h-px bg-primary transition-all duration-500 ${
                isHome && active === "hero" ? "w-full" : "w-0"
              }`}
            />
          </Link>

          {SECTION_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goToSection(l.id)}
              className={linkClass(isHome && active === l.id)}
            >
              {l.label}
              <span
                className={`absolute -bottom-2 left-0 h-px bg-primary transition-all duration-500 ${
                  isHome && active === l.id ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}

          {PAGE_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(pathname === l.to)}>
              {l.label}
              <span
                className={`absolute -bottom-2 left-0 h-px bg-primary transition-all duration-500 ${
                  pathname === l.to ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}
        </div>

        <button
          onClick={() => goToSection("join")}
          className="border border-primary px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-foreground transition-colors duration-500 hover:bg-primary"
        >
          Join Us
        </button>
      </nav>
    </header>
  );
}
