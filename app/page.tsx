import Image from "next/image";
import Link from "next/link";

const destaques = [
  {
    titulo: "Farmácias credenciadas",
    texto: "Fórmulas manipuladas por parceiros autorizados e auditados.",
  },
  {
    titulo: "Entrega rápida",
    texto: "Envio gratuito com rastreio para acompanhar todo o pedido.",
  },
  {
    titulo: "Assinatura flexível",
    texto: "Pause, ajuste ou cancele quando quiser, sem burocracia.",
  },
  {
    titulo: "Suporte clínico",
    texto: "Equipe de especialistas para orientar uso e efeitos esperados.",
  },
];

const etapas = [
  {
    titulo: "Triagem inteligente",
    texto: "Você responde um questionário clínico inicial para mapear riscos e objetivos.",
  },
  {
    titulo: "Formulação personalizada",
    texto: "Com base no perfil, sugerimos combinação de ativos e posologia adequada.",
  },
  {
    titulo: "Acompanhamento contínuo",
    texto: "Monitoramos evolução, tolerância e possíveis ajustes de rotina.",
  },
];

const produtos = [
  {
    nome: "NeuroDrive Blend",
    descricao:
      "Combinação para foco, clareza mental e energia cognitiva ao longo do dia.",
  },
  {
    nome: "CalmMind PM",
    descricao:
      "Fórmula noturna para desacelerar, melhorar qualidade de sono e recuperação mental.",
  },
];

const depoimentos = [
  "Comecei o protocolo e senti mais constância no foco já na segunda semana.",
  "A triagem foi rápida e me passou confiança para iniciar com segurança.",
  "Gostei do acompanhamento; ajustaram a dose conforme minha rotina de trabalho.",
];

const conteudos = [
  "Como avaliar se um nootrópico é adequado para você",
  "Cafeína e nootrópicos: quando a combinação não é ideal",
  "Foco e produtividade sem exagerar nos estimulantes",
  "Sinais de que sua rotina precisa de ajuste, não só suplemento",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f4f2] text-[#022b34]">
      <header className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-8 py-5 md:px-16 lg:px-20">
        <div className="text-2xl font-bold tracking-tight">Axiom Labs</div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:opacity-75">
            Tratamentos
          </Link>
          <Link href="/" className="hover:opacity-75">
            Blog
          </Link>
          <Link href="/" className="hover:opacity-75">
            Quem Somos
          </Link>
          <Link
            href="/auth"
            className="rounded-full border border-[#022b34]/20 px-4 py-2 transition hover:bg-[#022b34] hover:text-white"
          >
            Entrar
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-8 pb-16 pt-2 md:grid-cols-[1fr_1.12fr] md:px-16 lg:px-20">
        <div className="space-y-6">
          <h1 className="max-w-xl text-6xl font-bold leading-[1.02] tracking-tight">
            Saúde cognitiva do jeito que você precisa.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#234b53]">
            Sem filas e sem burocracia. Apenas suplementação nootrópica com
            abordagem baseada em ciência, entregue na sua porta e com triagem
            para maior segurança.
          </p>
          <Link
            href="/questionario"
            className="inline-flex rounded-lg bg-[#fb8d7f] px-10 py-3 text-sm font-semibold text-[#032a33] transition hover:brightness-95"
          >
            Começar agora
          </Link>
        </div>

        <div className="relative h-[520px] w-full overflow-hidden bg-[#e5e3df]">
          <Image
            src="/hero-manual.png"
            alt="Homem sorrindo representando bem-estar e confiança."
            fill
            className="object-cover object-right"
            priority
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1600px] gap-4 px-8 pb-18 md:grid-cols-4 md:px-16 lg:px-20">
        {destaques.map((item) => (
          <article key={item.titulo} className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold">{item.titulo}</h3>
            <p className="mt-2 text-sm text-[#3b5f66]">{item.texto}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-8 pb-16 md:px-16 lg:px-20">
        <h2 className="text-4xl font-bold tracking-tight">
          O jeito mais prático de cuidar da performance mental
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {etapas.map((etapa) => (
            <article key={etapa.titulo} className="rounded-2xl bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-semibold">{etapa.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3b5f66]">
                {etapa.texto}
              </p>
              <div className="mt-6 h-24 rounded-xl bg-[#eef2f2]" />
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-8 pb-16 md:px-16 lg:px-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3b5f66]">
          Tratamentos
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight">
          Protocolos baseados em evidência e objetivos reais
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {produtos.map((produto) => (
            <article key={produto.nome} className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="h-36 rounded-xl bg-[#e8eceb]" />
              <h3 className="mt-6 text-3xl font-bold">{produto.nome}</h3>
              <p className="mt-3 text-sm text-[#3b5f66]">{produto.descricao}</p>
              <Link
                href="/questionario"
                className="mt-6 inline-flex rounded-lg border border-[#022b34]/25 px-6 py-2 text-sm font-semibold transition hover:bg-[#022b34] hover:text-white"
              >
                Ver protocolo
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-8 pb-14 md:px-16 lg:px-20">
        <div className="rounded-xl border border-[#022b34]/10 bg-white px-6 py-5 text-sm text-[#32565d]">
          Aprovado por especialistas em saúde integrativa e farmacologia clínica.
        </div>
      </section>

      <section className="bg-[#ececeb] py-14">
        <div className="mx-auto w-full max-w-[1600px] px-8 md:px-16 lg:px-20">
          <h2 className="text-4xl font-bold tracking-tight">O que nossos clientes dizem</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {depoimentos.map((texto) => (
              <article key={texto} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm leading-relaxed text-[#32565d]">{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-8 pb-16 pt-16 md:px-16 lg:px-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3b5f66]">
          Sobre a Axiom Labs
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight">
          Cuidado completo e descomplicado
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#3b5f66]">
          Conectamos você a uma jornada integrada com triagem clínica, indicação
          responsável e suporte contínuo para evolução segura no uso de nootrópicos.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="h-44 rounded-xl bg-[#dce5e3]" />
            <h3 className="mt-4 text-2xl font-semibold">Plano Performance</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#32565d]">
              <li>Triagem inicial com análise de contraindicação</li>
              <li>Fórmula manipulada sob demanda</li>
              <li>Revisão periódica com suporte especializado</li>
            </ul>
            <Link
              href="/questionario"
              className="mt-6 inline-flex rounded-lg bg-[#fb8d7f] px-6 py-2.5 text-sm font-semibold text-[#032a33] transition hover:brightness-95"
            >
              Começar avaliação
            </Link>
          </article>
          <div className="grid gap-4">
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Consulta avulsa</h3>
              <p className="mt-2 text-sm text-[#3b5f66]">
                Opção para receber apenas avaliação clínica e orientação inicial.
              </p>
            </article>
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Farmácia parceira</h3>
              <p className="mt-2 text-sm text-[#3b5f66]">
                Se já possui prescrição, pode solicitar manipulação com envio direto.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-8 pb-16 md:px-16 lg:px-20">
        <h2 className="max-w-4xl text-4xl font-bold tracking-tight">
          Conteúdo prático sobre foco, energia e saúde cognitiva
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {conteudos.map((titulo) => (
            <article key={titulo} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="h-40 bg-[#dfe6e4]" />
              <div className="p-4">
                <h3 className="text-lg font-semibold leading-snug">{titulo}</h3>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#3b5f66]">
                  Equipe Axiom
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-8 pb-16 md:px-16 lg:px-20">
        <div className="rounded-2xl bg-[#ececea] p-8 md:p-10">
          <h3 className="text-3xl font-bold">Conheça as farmácias credenciadas</h3>
          <p className="mt-3 max-w-4xl text-sm text-[#3b5f66]">
            A Axiom Labs não é farmácia. Todos os produtos são manipulados por
            parceiros credenciados em conformidade com as normas sanitárias vigentes.
          </p>
          <div className="mt-5 space-y-3 text-sm text-[#32565d]">
            <p>Laboratório Mente Viva - CNPJ 12.345.678/0001-99</p>
            <p>Fórmula Prime Manipulação - CNPJ 98.765.432/0001-11</p>
            <p>Instituto Neurofarm - CNPJ 11.223.344/0001-55</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#013843] text-[#def4ef]">
        <div className="mx-auto grid w-full max-w-[1600px] gap-8 px-8 py-12 md:grid-cols-4 md:px-16 lg:px-20">
          <div>
            <h3 className="text-lg font-semibold">Ficou alguma dúvida?</h3>
            <p className="mt-2 text-sm text-[#9cc2bc]">
              Acesse nossa central de ajuda e fale com o time de suporte.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#9cc2bc]">
              Tratamentos
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>NeuroDrive Blend</li>
              <li>CalmMind PM</li>
              <li>Planos personalizados</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#9cc2bc]">
              Axiom Labs
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Home</li>
              <li>Quem Somos</li>
              <li>Perguntas Frequentes</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#9cc2bc]">
              Contato
            </h4>
            <p className="mt-3 text-sm">suporte@axiomlabs.com.br</p>
            <p className="mt-2 text-sm">Seg a Sex, das 9h às 18h</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1600px] border-t border-[#1b5761] px-8 py-6 text-xs text-[#9cc2bc] md:px-16 lg:px-20">
          Copyright 2026 Axiom Labs. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}
