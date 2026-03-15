"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = ["Shop Now", "About NeuroDrive", "Science", "Reviews"];

const trustBadges = [
  {
    titulo: "Formulas clinicas",
    texto: "Autorizadas pela Anvisa",
  },
  {
    titulo: "Entrega expressa",
    texto: "Discreta e rastreavel",
  },
  {
    titulo: "Assinatura flexivel",
    texto: "Pause quando quiser",
  },
  {
    titulo: "Suporte especializado",
    texto: "Acompanhamento continuo",
  },
];

const passos = [
  {
    titulo: "Passo 1: Mapeamento assincrono",
    texto:
      "Em menos de 2 minutos, voce responde a um questionario clinico sobre sua rotina, nivel de estresse e desgaste mental para uma avaliacao precisa do seu caso.",
  },
  {
    titulo: "Passo 2: O seu protocolo",
    texto:
      "Formulas manipuladas sob demanda por farmacias de excelencia, utilizando ativos de alta potencia para garantir o maximo de eficacia.",
  },
  {
    titulo: "Passo 3: Suporte e otimizacao",
    texto:
      "Acompanhamento especializado ilimitado. Nossa equipe ajusta seu protocolo conforme sua performance evolui, garantindo resultados de longo prazo.",
  },
];

const protocolos = [
  {
    nome: "Morning Ritual",
    descricao:
      "Otimize seu foco e energia matinal. Ingredientes clinicos para clareza mental profunda, poder de execucao e produtividade sem o crash da tarde.",
    cta: "Ver protocolo matinal",
  },
  {
    nome: "Deep Recovery",
    descricao:
      "Desligue sua mente a noite. Formulas focadas no relaxamento do sistema nervoso central, reducao do cortisol e inducao ao sono REM reparador.",
    cta: "Ver protocolo noturno",
  },
  {
    nome: "NeuroDrive Blend",
    descricao:
      "A solucao definitiva. O motor cognitivo para ligar o seu cerebro pela manha e a engenharia de recuperacao para reparar a maquina a noite.",
    cta: "Ver protocolo completo",
  },
];

const depoimentos = [
  {
    texto:
      "A clareza mental que o Morning Ritual me deu mudou a forma como conduzo minhas reunioes de conselho. O brain fog simplesmente sumiu.",
    autor: "Roberto S., CEO",
  },
  {
    texto:
      "Sempre tive dificuldade para desligar o cerebro a noite por conta da ansiedade do negocio. O Deep Recovery resolveu minha insonia em poucos dias.",
    autor: "Fernando M., Founder",
  },
  {
    texto:
      "O diferencial da NeuroDrive e o rigor. Nao e suplemento de prateleira, e protocolo prescrito que realmente entrega produtividade de alto nivel.",
    autor: "Marcelo F., Diretor de Operacoes",
  },
];

const planoNeuroDrive = [
  "Avaliacao clinica assincrona.",
  "Formulas de alta potencia entregues na sua porta.",
  "Frete gratuito para assinantes.",
  "Suporte continuo com o time de especialistas.",
];

const heroSlides = [
  {
    eyebrow: "Minimalista",
    titulo: "Performance cognitiva no nivel que voce exige.",
    descricao:
      "Protocolos nootropicos de grau clinico, prescritos para a sua rotina e entregues direto na sua porta.",
  },
  {
    eyebrow: "Alta performance",
    titulo: "Clareza mental, foco profundo e energia sem crash.",
    descricao:
      "Mapeamento rapido, formula personalizada e suporte continuo para otimizar a sua execucao.",
  },
  {
    eyebrow: "Precisao clinica",
    titulo: "Sua rotina merece um protocolo a altura da sua ambicao.",
    descricao:
      "Formulas de alta potencia, assinatura flexivel e entrega discreta com acompanhamento especializado.",
  },
];

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#020712] pb-24 text-[#f6fbff] md:pb-0">
      <div className="relative overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0 bg-black">
          <Image
            src="/imagem-central.png"
            alt="Background NeuroDrive"
            fill
            priority
            className="object-contain object-[60%_54%] sm:object-contain sm:object-center xl:object-[64%_52%]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_35%,rgba(0,0,0,0.2)_62%,rgba(0,0,0,0.06)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.56)_32%,rgba(0,0,0,0.14)_58%,rgba(0,0,0,0.04)_100%)] xl:bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.48)_28%,rgba(0,0,0,0.1)_54%,rgba(0,0,0,0.04)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.18)_20%,rgba(0,0,0,0.1)_72%,rgba(0,0,0,0.8)_100%)] md:bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.12)_22%,rgba(0,0,0,0.06)_74%,rgba(0,0,0,0.74)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />

        <header className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
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
            <button
              type="button"
              aria-label="Conta"
              className="rounded-full border border-white/25 p-2 transition hover:border-[#8dedff]/70 hover:text-[#8dedff]"
            >
              <UserIcon className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="relative z-10 mx-auto flex min-h-[560px] w-full max-w-[1440px] items-end px-4 pb-14 pt-8 sm:min-h-[620px] sm:px-6 sm:pb-16 md:min-h-[680px] lg:min-h-[760px] lg:px-8 lg:pb-20 xl:min-h-[820px] 2xl:max-w-[1560px] 2xl:px-12 2xl:min-h-[880px]">
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
                Iniciar Mapeamento Cognitivo
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
          </div>
        </section>
      </div>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {trustBadges.map((item) => (
            <article key={item.titulo} className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 backdrop-blur">
              <h3 className="text-sm font-semibold text-[#8aefff]">{item.titulo}</h3>
              <p className="mt-1 text-sm text-white/74">{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 md:pb-16 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#74def2]">Como funciona</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Engenharia mental em 3 passos simples.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {passos.map((passo) => (
            <article key={passo.titulo} className="rounded-2xl border border-white/15 bg-[#071021] p-6">
              <h3 className="text-lg font-semibold">{passo.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{passo.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 md:pb-16 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#74def2]">Protocolos</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Protocolos baseados em neurociencia, personalizados para voce.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {protocolos.map((protocolo) => (
            <article key={protocolo.nome} className="rounded-2xl border border-white/15 bg-[#071021] p-6">
              <h3 className="text-2xl font-semibold">{protocolo.nome}</h3>
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

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 md:pb-16 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
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

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8 2xl:max-w-[1560px] 2xl:px-12">
        <div className="rounded-3xl border border-[#00d6ff]/40 bg-gradient-to-r from-[#071021] via-[#0b1931] to-[#071021] p-6 sm:p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#7de6ff]">Fechamento</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Otimizacao completa e descomplicada.
          </h3>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/80">
            Nos gerenciamos o seu protocolo cognitivo para que voce foque apenas no que
            importa: executar e crescer. Pela NeuroDrive, voce esta conectado a especialistas,
            farmacias de alto padrao e recebe tudo no piloto automatico.
          </p>

          <div className="mt-8 rounded-2xl border border-white/15 bg-black/25 p-5 sm:p-6">
            <h4 className="text-xl font-semibold text-[#8cefff]">Plano NeuroDrive</h4>
            <ul className="mt-4 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              {planoNeuroDrive.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/questionario"
              className="mt-6 inline-flex rounded-full bg-[#00d6ff] px-6 py-3 text-sm font-semibold text-[#04111c] transition hover:brightness-110"
            >
              Comecar minha avaliacao
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
