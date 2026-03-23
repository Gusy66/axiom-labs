import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { QUIZ_SESSION_COOKIE } from "@/lib/questionnaire";

const TITULOS_RESPOSTAS: Record<string, string> = {
  objetivo_principal: "Objetivo principal",
  foco_atual: "Foco e concentração",
  queda_energia: "Produtividade e energia",
  sono_mente: "Desligamento e sono",
  experiencia_previa: "Experiência prévia",
  rotina: "Rotina e estilo de vida",
};

function formatarValor(valor: unknown): string {
  if (Array.isArray(valor)) {
    return valor.join(", ");
  }

  return String(valor ?? "-");
}

const PROGRESSO_SEMANAL = [
  { titulo: "Constância do protocolo", valor: 82 },
  { titulo: "Qualidade de foco", valor: 76 },
  { titulo: "Recuperação noturna", valor: 69 },
];

const PROXIMAS_ACOES = [
  "Revisar protocolo em 7 dias com nosso time clínico.",
  "Ajustar dose da manhã conforme resposta de foco.",
  "Registrar horário de sono por 5 noites consecutivas.",
];

export default async function ContaPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth?callbackUrl=%2Fconta");
  }

  const cookieStore = await cookies();
  const quizSessionId = cookieStore.get(QUIZ_SESSION_COOKIE)?.value;

  if (quizSessionId) {
    await db.questionnaireSubmission.updateMany({
      where: {
        userId: null,
        sessionId: quizSessionId,
      },
      data: {
        userId: session.user.id,
      },
    });
  }

  const submission = await db.questionnaireSubmission.findFirst({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const respostas = (submission?.respostas as Record<string, unknown> | null) ?? null;
  const entradasRespostas = respostas ? Object.entries(respostas) : [];
  const nomeExibicao =
    session.user.name?.trim() ||
    submission?.leadName?.trim() ||
    session.user.email?.split("@")[0] ||
    "Cliente NeuroDrive";
  const dataPlano = submission
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(submission.createdAt)
    : null;
  const primeiraParteNome = nomeExibicao.split(" ")[0] || nomeExibicao;
  return (
    <main className="min-h-screen bg-[#06080d] text-white">
      <div className="w-full px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8 xl:px-10 2xl:px-12">
        <div className="mb-5 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/58 transition hover:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3.5 w-3.5 fill-none stroke-current"
            >
              <path d="M10 3 5 8l5 5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar
          </Link>
        </div>

        <section className="mb-5 rounded-[18px] border border-white/8 bg-[#111319] px-6 py-7 shadow-[0_10px_34px_rgba(0,0,0,0.28)] sm:px-8 sm:py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#19d6ee]">
            Painel do cliente
          </p>
          <h1 className="mt-4 max-w-[640px] text-[2.55rem] font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-[3.6rem]">
            Olá, {primeiraParteNome}. Seu plano NeuroDrive está pronto.
          </h1>
          <p className="mt-5 max-w-[690px] text-[15px] leading-[1.8] text-white/50 sm:text-[17px]">
            Esta é sua área exclusiva com protocolo, recomendações, progresso e próximos passos para manter alta performance com consistência.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/questionario"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#14d8ef] px-6 text-sm font-semibold text-[#041018] transition hover:brightness-110"
            >
              Refazer avaliação
            </Link>
            <div className="inline-flex h-12 items-center rounded-full border border-white/8 bg-[#121720] px-5 text-sm text-white/42">
              Status da conta: Ativa
            </div>
            {dataPlano && (
              <div className="inline-flex h-12 items-center rounded-full border border-white/8 bg-[#121720] px-5 text-sm text-white/42">
                Plano gerado em {dataPlano}
              </div>
            )}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.42fr)_minmax(320px,0.78fr)]">
          <div className="space-y-5">
            <section className="rounded-[18px] border border-white/8 bg-[#111319] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)]">
              <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.15rem]">
                Dados da conta
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[16px] border border-white/7 bg-[#181c22] px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/36">Nome</p>
                  <p className="mt-3 text-[1.05rem] font-medium text-white">
                    {session.user.name ?? submission?.leadName ?? "Não informado"}
                  </p>
                </div>
                <div className="rounded-[16px] border border-white/7 bg-[#181c22] px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/36">E-mail</p>
                  <p className="mt-3 break-all text-[1.05rem] font-medium text-white">
                    {session.user.email ?? submission?.leadEmail ?? "Não informado"}
                  </p>
                </div>
              </div>
            </section>

            {submission ? (
              <>
                <section className="rounded-[18px] border border-white/8 bg-[#111319] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)] sm:p-7">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#19d6ee]">
                        Diagnóstico
                      </p>
                      <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.3rem]">
                        {submission.diagnostico}
                      </h2>
                      <p className="mt-4 text-[15px] leading-[1.9] text-white/54">{submission.explicacao}</p>
                    </div>

                    <div className="inline-flex rounded-full border border-white/8 bg-[#121720] px-4 py-2 text-sm text-white/46">
                      Perfil identificado: {submission.perfil}
                    </div>
                  </div>
                </section>

                <section className="rounded-[18px] border border-white/8 bg-[#111319] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)] sm:p-7">
                  <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.15rem]">
                    Protocolo 24h recomendado
                  </h2>
                  <p className="mt-2 text-sm text-white/44">Rotina sugerida para manhã e noite.</p>

                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    <article className="rounded-[16px] border border-white/7 bg-[#181c22] p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#19d6ee]">
                        Manhã
                      </p>
                      <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.03em] text-white">
                        Morning Drive
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/56">{submission.passoManha}</p>
                    </article>

                    <article className="rounded-[16px] border border-white/7 bg-[#181c22] p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#19d6ee]">
                        Noite
                      </p>
                      <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.03em] text-white">
                        Deep Recovery
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/56">{submission.passoNoite}</p>
                    </article>
                  </div>
                </section>

                {entradasRespostas.length > 0 && (
                  <section className="rounded-[18px] border border-white/8 bg-[#111319] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)] sm:p-7">
                    <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.15rem]">
                      Resumo da avaliação
                    </h2>
                    <p className="mt-2 text-sm text-white/44">
                      Respostas que deram origem ao seu plano personalizado.
                    </p>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {entradasRespostas.map(([chave, valor]) => (
                        <div key={chave} className="rounded-[16px] border border-white/7 bg-[#181c22] p-4">
                          <p className="text-[10px] uppercase tracking-[0.32em] text-white/36">
                            {TITULOS_RESPOSTAS[chave] ?? chave}
                          </p>
                          <p className="mt-3 text-[15px] leading-7 text-white/82">{formatarValor(valor)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <section className="rounded-[18px] border border-[#ff8f7a]/18 bg-[#160f13] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)] sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#ffb3a5]">
                  Plano pendente
                </p>
                <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.04em] text-white">
                  Sem protocolo salvo
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-[1.9] text-white/56">
                  Ainda não encontramos um resultado vinculado à sua conta. Faça sua avaliação para liberar recomendações personalizadas.
                </p>
                <Link
                  href="/questionario"
                  className="mt-6 inline-flex h-12 items-center rounded-full bg-[#14d8ef] px-5 text-sm font-semibold text-[#041018] transition hover:brightness-110"
                >
                  Iniciar questionário
                </Link>
              </section>
            )}
          </div>

          <aside className="space-y-5">
            <section className="rounded-[18px] border border-white/8 bg-[#111319] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)]">
              <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.15rem]">
                Progresso semanal
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/44">
                Métricas simuladas para acompanhar aderência e evolução do protocolo.
              </p>

              <div className="mt-6 space-y-5">
                {PROGRESSO_SEMANAL.map((item) => (
                  <div key={item.titulo}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-[15px] text-white/92">
                      <span>{item.titulo}</span>
                      <span className="font-medium text-[#12d8ef]">{item.valor}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#232832]">
                      <div
                        className="h-full rounded-full bg-[#12d8ef]"
                        style={{ width: `${item.valor}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[18px] border border-white/8 bg-[#111319] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)]">
              <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.15rem]">
                Próximas ações
              </h2>
              <ul className="mt-5 space-y-4">
                {PROXIMAS_ACOES.map((acao) => (
                  <li key={acao} className="flex items-start gap-3 text-[15px] leading-8 text-white/56">
                    <span className="mt-3 inline-block h-1.5 w-1.5 rounded-full bg-[#7f8898]" />
                    <span>{acao}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="overflow-hidden rounded-[18px] border border-white/8 bg-[#111319] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.28)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#19d6ee]">
                Expansão
              </p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.15rem]">
                Área premium (em breve)
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/56">
                Histórico de pedidos, assinatura mensal, suporte prioritário e novos módulos de otimização.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
