import { cookies } from "next/headers";
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

  return (
    <main className="min-h-screen bg-[#020712] px-3 py-6 text-white sm:px-4">
      <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,#08111f_0%,#050b15_100%)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:p-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Área do usuário</h1>
        <p className="mt-2 text-sm text-white/70">
          Conta autenticada com sucesso. Aqui estão seus dados e o protocolo sugerido.
        </p>

        <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold">Dados da conta</h2>
          <p className="mt-2 text-sm text-white/80">
            <strong>Nome:</strong> {session.user.name ?? "Não informado"}
          </p>
          <p className="mt-1 text-sm text-white/80">
            <strong>E-mail:</strong> {session.user.email ?? "Não informado"}
          </p>
        </section>

        {submission ? (
          <>
            <section className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold">Seu diagnóstico</h2>
              <p className="mt-2 text-xl font-bold text-[#8cefff]">{submission.diagnostico}</p>
              <p className="mt-2 text-sm text-white/75">{submission.explicacao}</p>
            </section>

            <section className="mt-5 rounded-xl border border-white/10 bg-[#07111d] p-5">
              <h2 className="text-lg font-semibold">
                Protocolo sugerido para perfil {submission.perfil}
              </h2>
              <article className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-semibold">Passo 1: Morning Drive</h3>
                <p className="mt-1 text-sm text-white/75">{submission.passoManha}</p>
              </article>
              <article className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-semibold">Passo 2: Deep Recovery</h3>
                <p className="mt-1 text-sm text-white/75">{submission.passoNoite}</p>
              </article>
            </section>

            {entradasRespostas.length > 0 && (
              <section className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-lg font-semibold">Resumo das respostas</h2>
                <div className="mt-3 space-y-2">
                  {entradasRespostas.map(([chave, valor]) => (
                    <p key={chave} className="text-sm text-white/78">
                      <strong>{TITULOS_RESPOSTAS[chave] ?? chave}:</strong> {formatarValor(valor)}
                    </p>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="mt-5 rounded-xl border border-[#ff8f7a]/30 bg-[#190c10] p-5">
            <h2 className="text-lg font-semibold">Sem protocolo salvo</h2>
            <p className="mt-2 text-sm text-white/75">
              Ainda não encontramos um resultado vinculado à sua conta.
            </p>
          </section>
        )}

        <section className="mt-5 rounded-xl border border-[#00d8ff]/25 bg-[linear-gradient(135deg,#07111d_0%,#0b1d31_100%)] p-5">
          <h2 className="text-lg font-semibold">Pagamento (em breve)</h2>
          <p className="mt-2 text-sm text-white/75">
            Área reservada para assinatura, método de pagamento e gestão do plano.
          </p>
        </section>
      </div>
    </main>
  );
}
