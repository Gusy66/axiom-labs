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
    <main className="min-h-screen bg-[#020712] px-3 py-6 text-white sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-6xl">
        <section className="relative overflow-hidden rounded-[1.9rem] border border-[#00d8ff]/25 bg-[linear-gradient(135deg,#07111d_0%,#081a2f_52%,#050c16_100%)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#00d8ff]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-52 w-52 rounded-full bg-[#00d8ff]/8 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8cefff]">Painel do cliente</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-4xl">
              Olá, {primeiraParteNome}. Seu plano NeuroDrive está pronto.
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">
              Esta é sua área exclusiva com protocolo, recomendações, progresso e próximos passos para manter alta performance com consistência.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/questionario"
                className="rounded-xl bg-[#00d8ff] px-5 py-2.5 text-sm font-semibold text-[#04111c] transition hover:brightness-110"
              >
                Refazer avaliação
              </Link>
              <div className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
                Status da conta: Ativa
              </div>
              {dataPlano && (
                <div className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
                  Plano gerado em {dataPlano}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr,0.75fr]">
          <div className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-[#07111d] p-5 sm:p-6">
              <h2 className="text-lg font-semibold sm:text-xl">Dados da conta</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/55">Nome</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {session.user.name ?? "Não informado"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/55">E-mail</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {session.user.email ?? "Não informado"}
                  </p>
                </div>
              </div>
            </section>

            {submission ? (
              <>
                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8cefff]">Diagnóstico</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#b8f6ff]">{submission.diagnostico}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{submission.explicacao}</p>
                  <div className="mt-4 inline-flex rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75">
                    Perfil identificado: {submission.perfil}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#07111d] p-5 sm:p-6">
                  <h2 className="text-lg font-semibold sm:text-xl">Protocolo 24h recomendado</h2>
                  <div className="mt-4 space-y-3">
                    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#8cefff]">Manhã</p>
                      <h3 className="mt-1 font-semibold">Morning Drive</h3>
                      <p className="mt-2 text-sm text-white/75">{submission.passoManha}</p>
                    </article>
                    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#8cefff]">Noite</p>
                      <h3 className="mt-1 font-semibold">Deep Recovery</h3>
                      <p className="mt-2 text-sm text-white/75">{submission.passoNoite}</p>
                    </article>
                  </div>
                </section>

                {entradasRespostas.length > 0 && (
                  <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                    <h2 className="text-lg font-semibold sm:text-xl">Resumo da avaliação</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {entradasRespostas.map(([chave, valor]) => (
                        <div
                          key={chave}
                          className="rounded-xl border border-white/10 bg-[#08111f] p-3.5"
                        >
                          <p className="text-xs uppercase tracking-wider text-white/50">
                            {TITULOS_RESPOSTAS[chave] ?? chave}
                          </p>
                          <p className="mt-1 text-sm text-white/85">{formatarValor(valor)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <section className="rounded-2xl border border-[#ff8f7a]/30 bg-[#190c10] p-5 sm:p-6">
                <h2 className="text-lg font-semibold">Sem protocolo salvo</h2>
                <p className="mt-2 text-sm text-white/75">
                  Ainda não encontramos um resultado vinculado à sua conta. Faça sua avaliação para liberar recomendações personalizadas.
                </p>
                <Link
                  href="/questionario"
                  className="mt-4 inline-flex rounded-xl bg-[#00d8ff] px-4 py-2 text-sm font-semibold text-[#04111c] transition hover:brightness-110"
                >
                  Iniciar questionário
                </Link>
              </section>
            )}
          </div>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold">Progresso semanal</h2>
              <p className="mt-2 text-sm text-white/70">
                Métricas simuladas para acompanhar aderência e evolução do protocolo.
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { titulo: "Constância do protocolo", valor: 82 },
                  { titulo: "Qualidade de foco", valor: 76 },
                  { titulo: "Recuperação noturna", valor: 69 },
                ].map((item) => (
                  <div key={item.titulo}>
                    <div className="mb-1 flex items-center justify-between text-xs text-white/65">
                      <span>{item.titulo}</span>
                      <span>{item.valor}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#00d8ff] shadow-[0_0_16px_rgba(0,216,255,0.4)]"
                        style={{ width: `${item.valor}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#07111d] p-5">
              <h2 className="text-lg font-semibold">Próximas ações</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• Revisar protocolo em 7 dias com nosso time clínico.</li>
                <li>• Ajustar dose da manhã conforme resposta de foco.</li>
                <li>• Registrar horário de sono por 5 noites consecutivas.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-[#00d8ff]/25 bg-[linear-gradient(135deg,#07111d_0%,#0b1d31_100%)] p-5">
              <h2 className="text-lg font-semibold">Área premium (em breve)</h2>
              <p className="mt-2 text-sm text-white/75">
                Histórico de pedidos, assinatura mensal, suporte prioritário e novos módulos de otimização.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
