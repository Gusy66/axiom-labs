"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileStickyCTA from "@/app/components/MobileStickyCTA";
import WhatsAppCTAButton from "@/app/components/WhatsAppCTAButton";

const navItems = [
  { label: "Protocol", href: "#protocol" },
  { label: "Science", href: "#science" },
  { label: "Products", href: "#products" },
  { label: "Results", href: "#results" },
];

const valueProps = [
  {
    title: "Especializada para você",
    outcome: "Alta potência sob medida. Dosagem máxima para suas necessidades",
    metric: "Formulação Personalizada",
    metricLabel: "",
    icon: "target" as const,
  },
  {
    title: "Sem extrapolar",
    outcome: "Doses efetivas, não apenas simbólicas",
    metric: "Concentração Clínica",
    metricLabel: "",
    icon: "moon" as const,
  },
  {
    title: "Consulta assíncrona",
    outcome: "Fórmula exclusiva para seu perfil cognitivo",
    metric: "Anvisa",
    metricLabel: "",
    icon: "brain" as const,
  },
  {
    title: "",
    outcome:
      "Não é euforia. É trabalho melhor. Mais clareza nas decisões. Menos erros em análises. Foco sustentável, sem crash.",
    metric: "Performance Real",
    metricLabel: "",
    icon: "zap" as const,
  },
];

const phases = [
  {
    phase: "Passo 1",
    name: "Mapeamento Assíncrono",
    time: "2 min",
    description:
      "Em menos de 2 minutos, você responde a um questionário clínico sobre sua rotina, nível de estresse e desgaste mental para uma avaliação precisa do seu caso.",
  },
  {
    phase: "Passo 2",
    name: "O Seu Protocolo",
    time: "Sob demanda",
    description:
      "Fórmulas manipuladas sob demanda por farmácias de excelência, utilizando ativos de alta potência para garantir o máximo de eficácia.",
  },
  {
    phase: "Passo 3",
    name: "Suporte e Otimização",
    time: "Contínuo",
    description:
      "Acompanhamento especializado ilimitado. Nossa equipe ajusta seu protocolo conforme sua performance evolui, garantindo resultados de longo prazo.",
  },
];

const products = [
  {
    icon: "layers" as const,
    tag: "Solução Completa 24H",
    name: "NeuroDrive Blend",
    subtitle: "O Processador Central",
    description:
      "A solução definitiva. O motor cognitivo para ligar o seu cérebro pela manhã e a engenharia de recuperação para reparar a máquina à noite.",
    features: [
      "Stack integrado de 24h",
      "Economia de 15%",
      "Protocolo unificado",
    ],
    highlighted: true,
  },
  {
    icon: "zap" as const,
    tag: "Ideal para Foco Profundo",
    name: "Morning Ritual",
    subtitle: "O Módulo de Ignição",
    description:
      "Otimize seu foco e energia matinal. Ingredientes clínicos para clareza mental profunda, poder de execução e produtividade sem o crash da tarde.",
    features: ["Acetilcolina + L-Teanina", "Foco em 20 minutos", "Sem crash às 15h"],
    highlighted: false,
  },
  {
    icon: "moon" as const,
    tag: "Ideal para Recuperação Noturna",
    name: "Deep Recovery",
    subtitle: "O Reset do Sistema",
    description:
      "Desligue sua mente à noite. Fórmulas focadas no relaxamento do sistema nervoso central, redução do cortisol e indução ao sono REM reparador.",
    features: [
      "Magnésio Treonato + Ashwagandha",
      "Sono profundo em 7 dias",
      "Recuperação neural acelerada",
    ],
    highlighted: false,
  },
];

const testimonials = [
  {
    quote:
      "A clareza mental que o Morning Drive me deu mudou a forma como conduzo minhas reuniões de conselho. O brain fog simplesmente sumiu.",
    before: "Brain fog às 15h era meu teto.",
    after: "Ritmo cognitivo sustentado durante board de 6 horas.",
    name: "Roberto S.",
    role: "CEO, Tech Company",
  },
  {
    quote:
      "Sempre tive dificuldade para desligar o cérebro à noite por conta da ansiedade do negócio. O Deep Recovery resolveu minha insônia em poucos dias.",
    before: "2-3h para pegar no sono.",
    after: "Adormeço em 20min. Whoop sleep score: 62 -> 89.",
    name: "Fernando M.",
    role: "Founder, SaaS Company",
  },
  {
    quote:
      "O diferencial da Axiom é o rigor. Não é um suplemento de prateleira, é um protocolo prescrito que realmente entrega o soco de produtividade que eu precisava.",
    before: "Testei 12 nootrópicos. Nenhum durou.",
    after: "6 meses com NeuroDrive. Performance consistente.",
    name: "Marcelo F.",
    role: "Diretor de Operações",
  },
];

const closingBenefits = [
  "Avaliação clínica assíncrona.",
  "Fórmulas de alta potência entregues na sua porta.",
  "Frete gratuito para assinantes.",
  "Suporte contínuo com o time de especialistas.",
];

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M4 7H20M4 12H20M4 17H20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M6 6L18 18M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M13 2L3 14h7l-1 8 10-12h-7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.7 6.7 0 1 0 10.2 10.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M9 4a3 3 0 0 0-3 3v1a2.5 2.5 0 0 0 0 5V14a3 3 0 0 0 3 3m6-13a3 3 0 0 1 3 3v1a2.5 2.5 0 0 1 0 5V14a3 3 0 0 1-3 3m-6-5h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 4l8 4-8 4-8-4 8-4zm8 8-8 4-8-4m16 4-8 4-8-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DynamicIcon({
  name,
  className,
}: {
  name: "brain" | "zap" | "moon" | "target" | "layers";
  className?: string;
}) {
  if (name === "brain") return <BrainIcon className={className} />;
  if (name === "zap") return <BoltIcon className={className} />;
  if (name === "moon") return <MoonIcon className={className} />;
  if (name === "layers") return <LayersIcon className={className} />;
  return <DotIcon className={className} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!elements.length) return;

    elements.forEach((element) => element.classList.add("reveal-on-scroll"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#06090f] pb-24 text-[#eaf2ff] md:pb-0">
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-[#06090f]/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="NeuroDrive"
              width={220}
              height={58}
              priority
              className="h-auto w-[160px] sm:w-[185px] lg:w-[220px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-sm text-white/60 transition hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#22e7ff] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/questionario"
              className="rounded-xl bg-[#13dff8] px-5 py-2.5 text-sm font-semibold text-[#021318] transition hover:brightness-110"
            >
              Inicializar protocolo
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="text-white md:hidden"
            aria-label="Alternar menu"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="space-y-2 border-t border-white/10 bg-[#06090f]/95 px-6 py-4 backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-sm text-white/70"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/questionario"
              className="mt-2 block rounded-lg bg-[#13dff8] px-5 py-2.5 text-center text-sm font-semibold text-[#021318]"
              onClick={() => setMenuOpen(false)}
            >
              Inicializar protocolo
            </Link>
          </div>
        )}
      </header>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16 md:min-h-screen">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(20,240,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(20,240,255,0.28)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 hidden h-[400px] w-[400px] rounded-full bg-[#22e7ff]/[0.03] blur-[120px] md:block" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 hidden h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-[#22e7ff]/[0.04] blur-[150px] md:block" />
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#22e7ff]/[0.06] blur-[100px] md:hidden" />

        <div className="relative z-10 mx-auto w-full max-w-[430px] px-5 pb-7 md:hidden">
          <div className="relative overflow-hidden bg-transparent px-2 pb-10 pt-4">
            <div className="pointer-events-none absolute inset-x-8 top-28 h-28 rounded-full bg-[#18dfff]/22 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              <Image
                src="/hero-bottle.png"
                alt="NeuroDrive premium supplement bottle"
                width={300}
                height={300}
                className="h-auto w-[228px] drop-shadow-[0_28px_50px_rgba(0,0,0,0.82)]"
                priority
              />

              <h1 className="mt-6 text-center text-[2.52rem] font-bold leading-[1.05] tracking-[-0.04em] text-white">
                Performance cognitiva
                <br />
                no nível que você exige.
              </h1>

              <div className="mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#4e78ff] to-transparent" />

              <p className="mt-5 text-center text-[1.02rem] leading-relaxed text-white/82">
                Protocolos nootrópicos de grau clínico, prescritos para a sua rotina e entregues direto na sua porta.
              </p>

              <Link
                href="/questionario"
                className="mt-8 inline-flex w-[88%] items-center justify-center rounded-full bg-[linear-gradient(90deg,#5687ff_0%,#3f71ff_55%,#4f7eff_100%)] px-8 py-4 text-center text-base font-semibold text-white shadow-[0_12px_30px_rgba(74,117,255,0.48)] transition hover:brightness-110"
              >
                Iniciar Mapeamento Cognitivo
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto hidden w-full max-w-[1380px] items-center gap-6 px-5 md:grid md:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="order-first flex justify-center lg:order-last lg:justify-end">
            <div className="relative animate-[nd-float_6s_ease-in-out_infinite] md:animate-[nd-float_6s_ease-in-out_infinite]">
              <div className="absolute inset-0 hidden scale-110 rounded-full bg-[#22e7ff]/[0.08] blur-[100px] md:block" />
              <div className="absolute left-1/2 top-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22e7ff]/[0.06] blur-[60px] md:block" />
              <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22e7ff]/[0.08] blur-[50px] md:hidden" />
              <Image
                src="/hero-bottle.png"
                alt="NeuroDrive premium supplement bottle"
                width={520}
                height={520}
                className="relative w-44 max-w-md drop-shadow-2xl sm:w-56 md:w-full"
                priority
              />
            </div>
          </div>

          <div className="order-last space-y-5 text-center md:space-y-8 lg:order-first lg:text-left">
            <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.2em] text-[#22e7ff]">
              Performance cognitiva premium
            </p>
            <h1 className="text-[2rem] font-bold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl md:text-5xl lg:text-7xl">
              Performance cognitiva
              <br />
              <span className="text-[#22e7ff] [text-shadow:0_0_30px_rgba(34,231,255,0.32)]">
                no nível que você exige.
              </span>
            </h1>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/62 line-clamp-3 md:text-[1.05rem] md:line-clamp-none lg:mx-0">
              Sem perda de tempo ou suplementos subdosados. Apenas protocolos nootrópicos de grau clínico, prescritos para a sua rotina e entregues direto na sua porta.
            </p>

            <div className="pt-1 md:pt-2">
              <Link
                href="/questionario"
                className="inline-flex w-full rounded-xl bg-[#13dff8] px-7 py-3.5 text-center text-sm font-semibold text-[#021318] transition hover:brightness-110 sm:w-auto sm:px-8 md:py-4 md:text-base"
              >
                Iniciar Mapeamento Cognitivo
              </Link>
            </div>

            <p className="flex items-center justify-center gap-3 text-[11px] text-white/45 md:text-xs lg:justify-start">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#13dff8]" />
              Sem salas de espera. Entrega discreta e acompanhamento contínuo.
            </p>

            <div className="flex justify-center gap-5 border-t border-white/10 pt-4 md:gap-10 md:pt-6 lg:justify-start">
              {[
                { value: "2.847", suffix: "+", label: "Protocolos ativos" },
                { value: "94", suffix: "%", label: "Taxa de recompra" },
                { value: "40", suffix: "%", label: "Mais tempo em flow" },
              ].map((item) => (
                <div key={item.label} className="text-center lg:text-left">
                  <p className="font-mono-data text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl">
                    {item.value}
                    <span className="text-[#22e7ff]">{item.suffix}</span>
                  </p>
                  <p className="mt-1 text-[9px] text-white/40 md:text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="protocol" className="relative py-16 md:py-28" data-reveal>
        <div className="mx-auto mb-16 h-px w-[min(100%-2rem,1380px)] bg-[linear-gradient(90deg,transparent,rgba(34,231,255,0.2),transparent)] md:mb-28" />
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 text-center md:mb-20">
            <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.2em] text-[#22e7ff]">
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white md:text-6xl">
              Clareza mental. Sem café. Apenas ciência.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              Apenas protocolos prescritos para a sua rotina, com conveniência total e liberdade para ajustar sua assinatura quando quiser.
            </p>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:mx-auto md:grid md:max-w-6xl md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
            {valueProps.map((item) => (
              <article
                key={item.title}
                className="group min-w-[75vw] snap-center rounded-xl border border-white/10 bg-[#090d15] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_4px_24px_-4px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_-5px_rgba(34,231,255,0.25)] sm:min-w-[60vw] md:min-w-0 md:p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#22e7ff]/20 bg-[#22e7ff]/10 text-[#22e7ff]">
                  <DynamicIcon name={item.icon} className="h-5 w-5" />
                </div>
                <div className="font-mono-data">
                  <span className="text-2xl font-bold text-white md:text-3xl">{item.metric}</span>
                  <span className="ml-2 text-xs text-white/45">{item.metricLabel}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="science" className="relative py-16 md:py-28" data-reveal>
        <div className="mx-auto mb-16 h-px w-[min(100%-2rem,1380px)] bg-[linear-gradient(90deg,transparent,rgba(34,231,255,0.2),transparent)] md:mb-28" />
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 md:mb-20">
            <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.2em] text-[#22e7ff]">
              Como funciona
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white md:text-6xl">
              Engenharia mental em 3 fases.
            </h2>
            <p className="max-w-2xl text-lg text-white/60">
              A jornada foi desenhada para ser rápida, precisa e acompanhada do início ao ajuste fino do protocolo.
            </p>
          </div>

          <div className="relative grid gap-6 md:grid-cols-3">
            <div className="absolute bottom-0 left-[13px] top-0 w-px bg-[linear-gradient(180deg,rgba(34,231,255,0.3),rgba(34,231,255,0.08),transparent)] md:hidden" />
            <div className="absolute left-[16.67%] right-[16.67%] top-12 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(34,231,255,0.3),transparent)] md:block" />

            {phases.map((item) => (
              <article
                key={item.phase}
                className="group relative ml-8 rounded-xl border border-white/10 bg-[#090d15] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_4px_24px_-4px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_-5px_rgba(34,231,255,0.25)] md:ml-0 md:p-7"
              >
                <div className="absolute -left-8 top-7 h-[9px] w-[9px] rounded-full border-2 border-[#06090f] bg-[#13dff8]/65 md:hidden" />
                <div className="mb-4 hidden h-7 w-7 items-center justify-center rounded-full border-2 border-[#13dff8]/55 bg-[#13dff8]/15 md:flex">
                  <div className="h-2.5 w-2.5 animate-[nd-pulse-glow_3s_ease-in-out_infinite] rounded-full bg-[#13dff8]" />
                </div>
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-mono-data text-sm text-[#22e7ff]">{item.phase}</span>
                  <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono-data text-xs text-white/45">
                    {item.time}
                  </span>
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="relative py-16 md:py-28" data-reveal>
        <div className="mx-auto mb-16 h-px w-[min(100%-2rem,1380px)] bg-[linear-gradient(90deg,transparent,rgba(34,231,255,0.2),transparent)] md:mb-28" />
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 md:mb-20">
            <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.2em] text-[#22e7ff]">
              Protocolos
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white md:text-6xl">
              Protocolos baseados em neurociência, personalizados para você.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 md:grid md:grid-cols-3">
            {products.map((item) => (
              <article
                key={item.name}
                className={`relative flex w-full flex-col overflow-hidden rounded-xl border p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_4px_24px_-4px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 md:p-7 ${
                  item.highlighted
                    ? "border-[#22e7ff]/55 shadow-[0_0_30px_-10px_rgba(34,231,255,0.16)] md:-mt-3 md:scale-[1.02]"
                    : "border-white/10 bg-[#090d15] hover:shadow-[0_0_25px_-5px_rgba(34,231,255,0.25)]"
                }`}
              >
                {item.highlighted && (
                  <div className="absolute right-0 top-0 rounded-bl-lg border-b border-l border-[#22e7ff]/20 bg-[#22e7ff]/10 px-3 py-1 font-mono-data text-[10px] uppercase tracking-widest text-[#22e7ff]">
                    Recomendado
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#22e7ff]/20 bg-[#22e7ff]/10 text-[#22e7ff]">
                        <DynamicIcon name={item.icon} className="h-4 w-4" />
                      </div>
                      <span className="font-mono-data text-[10px] uppercase tracking-widest text-[#22e7ff]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-4xl font-semibold tracking-[-0.03em] text-white">
                      {item.name}
                    </h3>
                    <p className="font-mono-data text-xs text-white/45">{item.subtitle}</p>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-white/45">
                    {item.description}
                  </p>

                  <ul className="space-y-2.5">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-white/55">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#13dff8]/80" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/questionario"
                    className={`block rounded-lg px-5 py-3.5 text-center text-sm font-semibold transition ${
                      item.highlighted
                        ? "bg-[#13dff8] text-[#021318] hover:brightness-110"
                        : "border border-white/12 text-white hover:border-[#13dff8]/55 hover:text-[#13dff8]"
                    }`}
                  >
                    {item.highlighted
                      ? "Ver protocolo completo"
                      : item.name === "Morning Ritual"
                        ? "Ver protocolo matinal"
                        : "Ver protocolo noturno"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="relative py-16 md:py-28" data-reveal>
        <div className="mx-auto mb-16 h-px w-[min(100%-2rem,1380px)] bg-[linear-gradient(90deg,transparent,rgba(34,231,255,0.2),transparent)] md:mb-28" />
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 md:mb-20">
            <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.2em] text-[#22e7ff]">
              Avaliações
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white md:text-6xl">
              O que a elite corporativa diz sobre a Axiom.
            </h2>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="group flex min-w-[80vw] snap-center flex-col rounded-xl border border-white/10 bg-[#090d15] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_4px_24px_-4px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_-5px_rgba(34,231,255,0.25)] sm:min-w-[65vw] md:min-w-0 md:p-7"
              >
                <span className="text-3xl leading-none text-[#22e7ff]/35">&quot;</span>
                <p className="-mt-2 flex-1 text-sm font-medium leading-relaxed text-white/70">
                  {item.quote}
                </p>
                <div className="mt-5 space-y-3 border-t border-white/10 pt-4 md:pt-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-mono-data text-[10px] uppercase tracking-wider text-white/45">
                      Antes
                    </span>
                    <span className="text-xs text-white/50">{item.before}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-mono-data text-[10px] uppercase tracking-wider text-[#22e7ff]">
                      Depois
                    </span>
                    <span className="text-xs font-medium text-white">{item.after}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="font-mono-data text-sm font-semibold text-[#22e7ff]">
                    {item.name}
                  </p>
                  <p className="text-xs text-white/45">{item.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-center md:mt-16 md:gap-4">
            {["CGMP Certified", "NSF Sport", "COA por Lote", "200+ Substâncias Testadas"].map(
              (badge) => (
                <div
                  key={badge}
                  className="rounded-lg border border-white/10 bg-[#090d15] px-3 py-2 md:px-5 md:py-2.5"
                >
                  <span className="font-mono-data text-[10px] text-white/55 md:text-xs">
                    {badge}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="cta" className="relative py-16 md:py-28" data-reveal>
        <div className="mx-auto mb-16 h-px w-[min(100%-2rem,1380px)] bg-[linear-gradient(90deg,transparent,rgba(34,231,255,0.2),transparent)] md:mb-28" />
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#22e7ff]/32 bg-[#090d15] p-6 sm:p-8 md:p-12 lg:p-20">
            <div className="pointer-events-none absolute -right-32 -top-32 hidden h-80 w-80 rounded-full bg-[#22e7ff]/[0.08] blur-[120px] md:block" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 hidden h-60 w-60 rounded-full bg-[#22e7ff]/[0.04] blur-[100px] md:block" />

            <div className="relative z-10 space-y-8 md:space-y-10">
              <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.2em] text-[#22e7ff]">
                Fechamento
              </p>
              <h2 className="max-w-2xl text-5xl font-bold leading-[1.02] tracking-[-0.05em] text-white md:text-6xl">
                Otimização completa e descomplicada.
              </h2>
              <p className="max-w-2xl text-lg text-white/62">
                Nós gerenciamos o seu protocolo cognitivo para que você foque apenas no que importa: executar e crescer. Pela Axiom Labs, você está conectado a especialistas, farmácias de alto padrão e recebe tudo no piloto automático.
              </p>

              <div className="max-w-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-xs text-white/45">Lote Atual</span>
                  <span className="font-mono-data text-xs text-[#22e7ff]">84% Alocado</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-[#13dff8] to-[#22e7ff]" />
                </div>
              </div>

              <div className="max-w-xl space-y-4 rounded-xl border border-white/10 bg-[#101622] p-5 md:space-y-5 md:p-7">
                <h3 className="text-lg font-semibold text-[#22e7ff]">O Plano NeuroDrive</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                  {closingBenefits.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckIcon className="h-3.5 w-3.5 shrink-0 text-[#13dff8]" />
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center md:text-left">
                <Link
                  href="/questionario"
                  className="inline-block w-full rounded-lg bg-[#13dff8] px-8 py-4 text-center text-base font-semibold text-[#021318] transition hover:brightness-110 md:w-auto md:px-10"
                >
                  Começar minha avaliação
                </Link>
                <p className="mt-3 text-xs text-white/42">
                  Mapeamento cognitivo rápido, assíncrono e concluído em cerca de 2 minutos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-[1380px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="NeuroDrive"
              width={160}
              height={42}
              className="h-auto w-[118px] opacity-90"
            />
            <p className="text-sm text-white/45">
              © 2026 NeuroDrive. Todos os direitos reservados.
            </p>
          </div>
          <a
            href="mailto:suporte@neurodrive.com.br"
            className="font-mono-data text-sm text-white/45 transition hover:text-[#22e7ff]"
          >
            suporte@neurodrive.com.br
          </a>
        </div>
      </footer>

      <MobileStickyCTA />
      <WhatsAppCTAButton />
    </main>
  );
}
