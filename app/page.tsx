"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = ["Shop Now", "About NeuroDrive", "Science", "Reviews"];

type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type MarketingIconName =
  | "neuro"
  | "target"
  | "bolt"
  | "flow"
  | "flask"
  | "chart";

const trustBadges = [
  {
    titulo: "Foco profundo sem crash",
    texto: "Mais clareza mental nas horas críticas da sua rotina.",
    icon: "flask" as MarketingIconName,
  },
  {
    titulo: "Energia estável o dia inteiro",
    texto: "Sem pico curto de estimulante e sem queda brusca de desempenho.",
    icon: "flow" as MarketingIconName,
  },
  {
    titulo: "Sono reparador de verdade",
    texto: "Desligamento mental noturno com recuperação cognitiva real.",
    icon: "bolt" as MarketingIconName,
  },
  {
    titulo: "Suporte especializado",
    texto: "Acompanhamento contínuo com ajustes estratégicos.",
    icon: "chart" as MarketingIconName,
  },
];

const passos = [
  {
    titulo: "Passo 1: Avaliação em 2 minutos",
    texto:
      "Você responde perguntas objetivas sobre foco, energia e qualidade do sono.",
    icon: "target" as MarketingIconName,
  },
  {
    titulo: "Passo 2: Protocolo personalizado",
    texto:
      "Indicamos o stack ideal para sua rotina e seu nível de demanda mental.",
    icon: "flask" as MarketingIconName,
  },
  {
    titulo: "Passo 3: Ajustes contínuos",
    texto:
      "Você recebe acompanhamento para evoluir performance com consistência e segurança.",
    icon: "chart" as MarketingIconName,
  },
];

const protocolos = [
  {
    nome: "Morning Ritual",
    tag: "Ideal para foco profundo",
    descricao:
      "Ativação cognitiva matinal para clareza mental, execução rápida e energia sem oscilação.",
    cta: "Ver detalhes",
    icon: "bolt" as MarketingIconName,
  },
  {
    nome: "Deep Recovery",
    tag: "Ideal para recuperação noturna",
    descricao:
      "Desaceleração mental à noite para reduzir hiperalerta e melhorar recuperação neural.",
    cta: "Ver detalhes",
    icon: "flow" as MarketingIconName,
  },
  {
    nome: "NeuroDrive Blend",
    tag: "Solução completa 24h",
    descricao:
      "Combinação estratégica manhã + noite para quem busca alta performance com consistência.",
    cta: "Ver detalhes",
    destaque: true,
    icon: "neuro" as MarketingIconName,
  },
];

const depoimentos = [
  {
    texto:
      "A clareza mental que o Morning Ritual me deu mudou a forma como conduzo minhas reuniões de conselho. O brain fog simplesmente sumiu.",
    autor: "Roberto S., CEO",
  },
  {
    texto:
      "Sempre tive dificuldade para desligar o cérebro à noite por conta da ansiedade do negócio. O Deep Recovery resolveu minha insônia em poucos dias.",
    autor: "Fernando M., Founder",
  },
  {
    texto:
      "O diferencial da NeuroDrive é o rigor. Não é suplemento de prateleira, é protocolo prescrito que realmente entrega produtividade de alto nível.",
    autor: "Marcelo F., Diretor de Operacoes",
  },
];

const planoNeuroDrive = [
  "Avaliação clínica assíncrona.",
  "Fórmulas de alta potência entregues na sua porta.",
  "Frete gratuito para assinantes.",
  "Suporte contínuo com o time de especialistas.",
];

const heroSlides = [
  {
    eyebrow: "Para alta performance",
    titulo: "Mais foco, energia estável e recuperação mental no mesmo protocolo.",
    descricao:
      "Protocolos personalizados para quem precisa performar no limite sem viver no ciclo do cansaço.",
  },
  {
    eyebrow: "Personalização clínica",
    titulo: "Seu protocolo é desenhado com base na sua rotina e nos seus sintomas.",
    descricao:
      "Você responde uma avaliação rápida e recebe uma estratégia prática para manhã e noite.",
  },
  {
    eyebrow: "Execução consistente",
    titulo: "Mais resultado no trabalho, menos desgaste cognitivo no fim do dia.",
    descricao:
      "Clareza para decidir, energia para executar e suporte para sustentar evolução de performance.",
  },
];

function MarketingIcon({
  name,
  className,
}: {
  name: MarketingIconName;
  className?: string;
}) {
  if (name === "neuro") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3a4 4 0 0 0-4 4v1a3 3 0 0 0 0 6v1a4 4 0 0 0 4 4" />
        <path d="M15 3a4 4 0 0 1 4 4v1a3 3 0 0 1 0 6v1a4 4 0 0 1-4 4" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
      </svg>
    );
  }

  if (name === "flow") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M7 12h10M17 8l-4 4 4 4" />
      </svg>
    );
  }

  if (name === "flask") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 2v6l-5 9a3 3 0 0 0 3 5h8a3 3 0 0 0 3-5l-5-9V2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 3 2 4-5" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.2 16.2L21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M4 7H20M8 12H20M11 17H20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 19.2C6.6 15.9 9 14.6 12 14.6C15 14.6 17.4 15.9 18.5 19.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let ativo = true;

    async function carregarSessao() {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          if (ativo) setSessionUser(null);
          return;
        }

        const data = (await response.json()) as { user: SessionUser | null };

        if (ativo) {
          setSessionUser(data.user);
        }
      } catch {
        if (ativo) {
          setSessionUser(null);
        }
      } finally {
        if (ativo) {
          setIsSessionLoading(false);
        }
      }
    }

    void carregarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      setSessionUser(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#020712] pb-24 text-[#f6fbff] md:pb-0">
      <div className="relative overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0 bg-black">
          <Image
            src="/imagem-central.png"
            alt="Background NeuroDrive"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_35%,rgba(0,0,0,0.2)_62%,rgba(0,0,0,0.06)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.56)_32%,rgba(0,0,0,0.14)_58%,rgba(0,0,0,0.04)_100%)] xl:bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.48)_28%,rgba(0,0,0,0.1)_54%,rgba(0,0,0,0.04)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.18)_20%,rgba(0,0,0,0.1)_72%,rgba(0,0,0,0.8)_100%)] md:bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.12)_22%,rgba(0,0,0,0.06)_74%,rgba(0,0,0,0.74)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />

        <header className="relative z-10 flex w-full items-center justify-between px-4 py-5 sm:px-6 lg:px-8 2xl:px-12">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png?v=clean-20260315"
              alt="NeuroDrive"
              className="h-auto w-[138px] sm:w-[160px] xl:w-[178px]"
            />
          </Link>

          <details className="relative lg:hidden">
            <summary className="list-none rounded-full border border-white/35 bg-white/5 p-2.5 text-white">
              <MenuIcon className="h-5 w-5" />
            </summary>
            <nav className="absolute right-0 z-30 mt-2 min-w-44 rounded-xl border border-white/20 bg-[#070f1d]/95 p-3 shadow-xl">
              <ul className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link href="/" className="block rounded-md px-2 py-1.5 hover:bg-white/10">
                      {item}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/auth" className="block rounded-md px-2 py-1.5 hover:bg-white/10">
                    {sessionUser ? "Minha conta" : "Entrar"}
                  </Link>
                </li>
                {sessionUser && (
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-white/80 hover:bg-white/10"
                    >
                      Sair
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </details>

          <nav className="hidden items-center gap-4 text-xs text-white/90 lg:flex xl:gap-6 xl:text-sm">
            {navItems.map((item, index) => (
              <Link
                key={item}
                href="/"
                className={
                  index === 0
                    ? "rounded-full border border-[#8dedff]/75 bg-white/[0.04] px-3 py-1.5 font-medium text-[#b5f7ff] shadow-[0_0_18px_rgba(0,240,255,0.14)] xl:px-4"
                    : "transition hover:text-[#00f0f0]"
                }
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 text-white/85 lg:flex xl:gap-3">
            <button
              type="button"
              aria-label="Buscar"
              className="rounded-full border border-white/25 p-2 transition hover:border-[#8dedff]/70 hover:text-[#8dedff]"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
            {isSessionLoading ? (
              <div className="h-10 w-10 rounded-full border border-white/20 bg-white/[0.04]" />
            ) : sessionUser ? (
              <details className="relative">
                <summary className="list-none rounded-full border border-white/25 p-2 transition hover:border-[#8dedff]/70 hover:text-[#8dedff]">
                  <UserIcon className="h-4 w-4" />
                </summary>
                <div className="absolute right-0 z-30 mt-3 w-72 rounded-2xl border border-white/15 bg-[#07111d]/95 p-4 shadow-2xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8cefff]">
                    Sessão ativa
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">{sessionUser.name}</p>
                  <p className="mt-1 text-sm text-white/65">{sessionUser.email}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href="/auth"
                      className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[#8dedff]/60"
                    >
                      Minha conta
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-xl bg-[#00d8ff] px-4 py-2 text-sm font-semibold text-[#04111c] transition hover:brightness-110"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </details>
            ) : (
              <Link
                href="/auth"
                aria-label="Entrar"
                className="rounded-full border border-white/25 p-2 transition hover:border-[#8dedff]/70 hover:text-[#8dedff]"
              >
                <UserIcon className="h-4 w-4" />
              </Link>
            )}
          </div>
        </header>

        <section className="relative z-10 flex min-h-[620px] w-full items-start px-4 pb-12 pt-8 md:hidden">
          <div className="w-full">
            <div className="max-w-[18rem]">
              <p className="text-sm font-light tracking-wide text-white/80">
                {heroSlides[activeSlide].eyebrow}
              </p>
              <h1 className="mt-4 max-w-[8ch] text-[3rem] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
                {heroSlides[activeSlide].titulo}
              </h1>
              <p className="mt-4 max-w-[16rem] text-base leading-[1.25] text-white/82">
                {heroSlides[activeSlide].descricao}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/questionario"
                className="inline-flex rounded-full bg-[#00d8ff] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#04111c] shadow-[0_0_24px_rgba(0,216,255,0.3)]"
              >
                Descobrir meu protocolo ideal
              </Link>
            </div>
            <p className="mt-3 text-xs text-white/72">
              Avaliação personalizada, gratuita e concluída em cerca de 2 minutos.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.titulo}
                  type="button"
                  aria-label={`Ir para slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={
                    index === activeSlide
                      ? "h-2.5 w-7 rounded-full bg-[#00d8ff] shadow-[0_0_16px_rgba(0,216,255,0.65)]"
                      : "h-2.5 w-2.5 rounded-full bg-white/35 transition hover:bg-white/55"
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 hidden min-h-[560px] w-full items-start px-4 pb-14 pt-8 sm:min-h-[620px] sm:px-6 sm:pb-16 md:flex md:min-h-[680px] lg:min-h-[760px] lg:px-8 lg:pb-20 xl:min-h-[820px] 2xl:px-12 2xl:min-h-[880px]">
          <div className="max-w-[min(92vw,33rem)] sm:max-w-[26rem] md:max-w-[27rem] lg:max-w-[31rem] xl:max-w-[34rem]">
            <div className="grid min-h-[25rem] sm:min-h-[29rem] md:min-h-[35rem] lg:min-h-[31rem] xl:min-h-[27rem]">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.titulo}
                  className={`col-start-1 row-start-1 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                    index === activeSlide
                      ? "translate-y-0 scale-100 opacity-100 blur-0"
                      : "pointer-events-none translate-y-2 scale-[0.985] opacity-0 blur-[4px]"
                  }`}
                  aria-hidden={index !== activeSlide}
                >
                  <p className="text-base font-light text-white/78 sm:text-xl md:text-[1.45rem] xl:text-[2rem]">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-3 max-w-[11ch] text-[clamp(2.35rem,5.8vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:mt-4 xl:max-w-[10ch]">
                    {slide.titulo}
                  </h1>
                  <p className="mt-4 max-w-[26rem] text-sm leading-[1.4] text-white/88 sm:mt-5 sm:text-[0.98rem] md:max-w-[22rem] md:text-[0.95rem] lg:mt-6 lg:max-w-[25rem] lg:text-[1.05rem] lg:leading-[1.3] xl:max-w-[28rem] xl:text-[1.2rem] xl:leading-[1.22]">
                    {slide.descricao}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 lg:mt-7">
              <Link
                href="/questionario"
                className="inline-flex rounded-full border border-[#7aefff] bg-[#00d8ff] px-5 py-3 text-xs font-semibold text-[#02131f] shadow-[0_0_35px_rgba(0,222,255,0.25)] transition hover:brightness-110 sm:text-sm sm:px-6 lg:px-7"
              >
                Descobrir meu protocolo ideal
              </Link>

              <button
                type="button"
                onClick={() =>
                  setActiveSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)
                }
                aria-label="Slide anterior"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/80 transition hover:border-[#7aefff] hover:text-[#7aefff] lg:inline-flex xl:h-11 xl:w-11"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)}
                aria-label="Proximo slide"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/80 transition hover:border-[#7aefff] hover:text-[#7aefff] lg:inline-flex xl:h-11 xl:w-11"
              >
                {">"}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 sm:mt-6">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.titulo}
                  type="button"
                  aria-label={`Ir para slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={
                    index === activeSlide
                      ? "h-2.5 w-7 rounded-full bg-[#00d8ff] shadow-[0_0_16px_rgba(0,216,255,0.65)]"
                      : "h-2.5 w-2.5 rounded-full bg-white/35 transition hover:bg-white/55"
                  }
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-white/72">
              Avaliação personalizada, gratuita e concluída em cerca de 2 minutos.
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto px-4 py-8 md:hidden">
        <div className="rounded-[2rem] border border-white/10 bg-[#060b15] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <h2 className="max-w-[10ch] text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white">
            Benefícios-chave
          </h2>
          <p className="mt-3 text-sm text-white/72">
            Informações essenciais sobre performance, clareza mental e protocolos clínicos.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#090f1b] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#76e7ff]">
              Protocolo em foco
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              {heroSlides[activeSlide].eyebrow}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/72">
              {heroSlides[activeSlide].descricao}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/questionario"
                className="inline-flex rounded-xl bg-[#00d8ff] px-4 py-3 text-sm font-semibold text-[#04111c]"
              >
                Ver protocolo
              </Link>
              <Link
                href="/questionario"
                className="inline-flex rounded-xl border border-[#36dfff]/70 px-4 py-3 text-sm font-semibold text-white"
              >
                Iniciar avaliação
              </Link>
              <Link
                href="/questionario"
                className="inline-flex rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#04111c]"
              >
                Falar com especialista
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-2 w-1/2 rounded-full bg-[#00d8ff]" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm text-white/88">
              <p>#007AFF</p>
              <p>#00F0F0</p>
              <p>#021212</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {heroSlides.map((slide, index) => (
              <span
                key={slide.eyebrow}
                className={
                  index === activeSlide
                    ? "h-2.5 w-6 rounded-full bg-[#00d8ff]"
                    : "h-2.5 w-2.5 rounded-full bg-white/30"
                }
              />
            ))}
          </div>

          <h3 className="mt-7 text-2xl font-semibold text-white">Light benefits</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {trustBadges.slice(0, 2).map((item) => (
              <article
                key={item.titulo}
                className="rounded-[1.4rem] border border-white/10 bg-[#090f1b] p-4"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#36dfff]/45 bg-[radial-gradient(circle,rgba(0,229,255,0.34),rgba(0,229,255,0.08)_62%,transparent_78%)] text-[#9ef7ff] shadow-[0_0_22px_rgba(0,229,255,0.28)]">
                  <MarketingIcon name={item.icon} className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-semibold text-white">{item.titulo}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/68">{item.texto}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-7 text-2xl font-semibold text-white">Detalhes e jornada</h3>
          <div className="mt-4 space-y-3">
            {passos.map((passo, index) => (
              <article
                key={passo.titulo}
                className="rounded-[1.4rem] border border-white/10 bg-[#090f1b] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#76e7ff]">
                    Passo {index + 1}
                  </p>
                  <div className="rounded-full border border-[#36dfff]/45 bg-[radial-gradient(circle,rgba(0,229,255,0.24),transparent_72%)] p-2.5 text-[#9ef7ff] shadow-[0_0_16px_rgba(0,229,255,0.22)]">
                    <MarketingIcon name={passo.icon} className="h-5 w-5" />
                  </div>
                </div>
                <h4 className="mt-2 text-lg font-semibold text-white">{passo.titulo}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{passo.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-[1440px] px-4 py-10 sm:px-6 md:block lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {trustBadges.map((item) => (
            <article
              key={item.titulo}
              className="min-h-[120px] rounded-2xl border border-[#4ae9ff]/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_0_24px_rgba(0,229,255,0.08)] backdrop-blur"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full border border-[#35ddff]/45 bg-[radial-gradient(circle,rgba(0,229,255,0.24),transparent_70%)] p-2.5 text-[#9ef7ff] shadow-[0_0_14px_rgba(0,229,255,0.2)]">
                  <MarketingIcon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-[#b9f7ff]">{item.titulo}</h3>
              </div>
              <p className="mt-2 text-sm text-white/82">{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-[1440px] px-4 pb-8 sm:px-6 md:block lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <div className="grid gap-4 md:grid-cols-2">
          {depoimentos.slice(0, 2).map((depoimento) => (
            <article key={`teaser-${depoimento.autor}`} className="rounded-2xl border border-white/15 bg-[#071021]/85 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8cefff]">Prova social</p>
              <p className="mt-3 text-sm leading-relaxed text-white/82">&quot;{depoimento.texto}&quot;</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#8beeff]">
                {depoimento.autor}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-[1440px] px-4 pb-12 sm:px-6 md:block md:pb-16 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#74def2]">Como funciona</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Engenharia mental em 3 passos simples.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {passos.map((passo) => (
            <article key={passo.titulo} className="rounded-2xl border border-white/15 bg-[#071021] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-[#35ddff]/45 bg-[radial-gradient(circle,rgba(0,229,255,0.24),transparent_70%)] p-2.5 text-[#9ef7ff] shadow-[0_0_16px_rgba(0,229,255,0.22)]">
                  <MarketingIcon name={passo.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{passo.titulo}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{passo.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-[1440px] px-4 pb-12 sm:px-6 md:block md:pb-16 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#74def2]">Protocolos</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Protocolos baseados em neurociência, personalizados para você.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {protocolos.map((protocolo) => (
            <article
              key={protocolo.nome}
              className={
                protocolo.destaque
                  ? "rounded-2xl border border-[#45e8ff]/55 bg-[linear-gradient(180deg,#071021_0%,#0a1a30_100%)] p-6 shadow-[0_0_28px_rgba(0,229,255,0.14)]"
                  : "rounded-2xl border border-white/15 bg-[#071021] p-6"
              }
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8cefff]">
                {protocolo.tag}
              </p>
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-[#35ddff]/45 bg-[radial-gradient(circle,rgba(0,229,255,0.24),transparent_70%)] p-2.5 text-[#9ef7ff] shadow-[0_0_16px_rgba(0,229,255,0.22)]">
                  <MarketingIcon name={protocolo.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold">{protocolo.nome}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{protocolo.descricao}</p>
              <Link
                href="/questionario"
                className="mt-6 inline-flex rounded-full border border-[#00d6ff]/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#88ecff] transition hover:bg-[#00d6ff] hover:text-[#04111c]"
              >
                {protocolo.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-[1440px] px-4 pb-12 sm:px-6 md:block md:pb-16 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          O que a elite corporativa diz sobre a NeuroDrive.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {depoimentos.map((depoimento) => (
            <article key={depoimento.autor} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-sm leading-relaxed text-white/85">&quot;{depoimento.texto}&quot;</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#8beeff]">
                {depoimento.autor}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-[1440px] px-4 pb-16 sm:px-6 md:block lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <div className="rounded-3xl border border-[#00d6ff]/40 bg-gradient-to-r from-[#071021] via-[#0b1931] to-[#071021] p-6 sm:p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#7de6ff]">Fechamento</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Otimização completa e descomplicada.
          </h3>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/80">
            Você recebe um protocolo personalizado para foco, energia e recuperação, com conveniência total.
            A NeuroDrive conecta estratégia clínica, manipulação de alta qualidade e acompanhamento contínuo para
            sustentar sua performance no longo prazo.
          </p>

          <div className="mt-8 rounded-2xl border border-white/15 bg-black/25 p-5 sm:p-6">
            <h4 className="text-xl font-semibold text-[#8cefff]">Plano NeuroDrive</h4>
            <ul className="mt-4 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              {planoNeuroDrive.map((item, index) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="rounded-full border border-[#35ddff]/45 bg-[radial-gradient(circle,rgba(0,229,255,0.2),transparent_72%)] p-2 text-[#9ef7ff] shadow-[0_0_14px_rgba(0,229,255,0.2)]">
                    <MarketingIcon
                      name={index % 2 === 0 ? "target" : "chart"}
                      className="h-4.5 w-4.5"
                    />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/questionario"
              className="mt-6 inline-flex rounded-full bg-[#00d6ff] px-6 py-3 text-sm font-semibold text-[#04111c] transition hover:brightness-110"
            >
              Descobrir meu protocolo ideal
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 pb-24 pt-8 text-white/65 md:pb-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
          <p>Copyright 2026 NeuroDrive. Todos os direitos reservados.</p>
          <p>suporte@neurodrive.com.br</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#020913]/95 p-3 backdrop-blur md:hidden">
        <Link
          href="/questionario"
          className="flex w-full items-center justify-center rounded-full bg-[#00d6ff] px-5 py-3 text-sm font-semibold text-[#04111c]"
        >
          Iniciar Mapeamento
        </Link>
      </div>
    </main>
  );
}
