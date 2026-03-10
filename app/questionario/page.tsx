"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Stage = "questions" | "lead" | "loading" | "result" | "blocked";

type Option = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  titulo: string;
  descricao?: string;
  multipla: boolean;
  opcoes: Option[];
};

type ResultadoPerfil = {
  diagnostico: string;
  explicacao: string;
  perfil: string;
  passoManha: string;
  passoNoite: string;
};

const perguntas: Question[] = [
  {
    id: "objetivo_principal",
    titulo: "Qual é o seu principal objetivo ao buscar otimização cognitiva hoje?",
    descricao: "Você pode selecionar mais de uma opção.",
    multipla: true,
    opcoes: [
      { id: "deep_work", label: "🎯 Entrar em foco profundo sem distrações." },
      { id: "energia_constante", label: "⚡ Ter energia limpa e constante sem crash." },
      { id: "memoria_pressao", label: "🧠 Melhorar memória e raciocínio sob pressão." },
      { id: "sono_reparador", label: "🌙 Desligar a mente e ter sono reparador." },
    ],
  },
  {
    id: "foco_atual",
    titulo: "Como você descreveria sua capacidade atual de foco em tarefas complexas?",
    multipla: false,
    opcoes: [
      { id: "excelente", label: "Excelente: foco consistente, mas quero elevar o limite." },
      { id: "inconstante", label: "Inconstante: picos de foco e distrações frequentes." },
      { id: "baixa", label: "Baixa: brain fog recorrente e dificuldade para engrenar." },
      { id: "dependente", label: "Dependente: só foco com muito café ou estimulantes." },
    ],
  },
  {
    id: "queda_energia",
    titulo: "Em qual momento do dia você sente maior queda de produtividade e energia?",
    multipla: false,
    opcoes: [
      { id: "manha", label: "Logo ao acordar, com dificuldade para ligar." },
      { id: "tarde", label: "No início da tarde, com crash pós-almoço." },
      { id: "noite", label: "No fim do dia, chegando mentalmente esgotado." },
      { id: "oscilando", label: "Minha energia oscila o dia inteiro." },
    ],
  },
  {
    id: "sono_mente",
    titulo: "Como sua mente se comporta ao deitar para dormir?",
    multipla: false,
    opcoes: [
      { id: "acelerada", label: "Acelerada, pensando em tarefas e problemas." },
      { id: "exausta_alerta", label: "Exausta, mas alerta: corpo cansado e mente ligada." },
      { id: "acordo_cansado", label: "Durmo rápido, mas acordo no meio da noite ou cansado." },
      { id: "tranquila", label: "Tranquila: durmo bem e acordo revigorado." },
    ],
  },
  {
    id: "experiencia_previa",
    titulo: "O que você já utiliza ou tentou para lidar com esses desafios?",
    descricao: "Você pode selecionar mais de uma opção.",
    multipla: true,
    opcoes: [
      { id: "cafe_excesso", label: "☕ Excesso de café/energéticos (3+ doses ao dia)." },
      {
        id: "tarja_preta",
        label:
          "💊 Medicamentos tarja preta para foco ou sono (ex: Venvanse, Ritalina, Zolpidem).",
      },
      { id: "suplementos_basicos", label: "🌿 Suplementos básicos (polivitamínico, ômega 3)." },
      { id: "estilo_vida", label: "🧘‍♂️ Práticas de estilo de vida (sono, treino, meditação)." },
      { id: "nenhuma", label: "Nenhuma alternativa, busco minha primeira solução real." },
    ],
  },
  {
    id: "rotina",
    titulo: "Como você descreveria sua rotina atual de trabalho?",
    multipla: false,
    opcoes: [
      { id: "alta_pressao", label: "Alta Pressão: decisões críticas, liderança e pouco tempo." },
      { id: "criativa", label: "Criativa/Estratégica: longos blocos de criação e raciocínio." },
      { id: "operacional", label: "Operacional Intensa: reuniões, e-mails e multitarefa." },
    ],
  },
];

const mensagensLoading = [
  "Analisando respostas...",
  "Cruzando dados com estudos clínicos...",
  "Modelando seu protocolo personalizado...",
];

const BLOQUEIO_CLINICO = {
  titulo: "Triagem encerrada por critério clínico",
  texto:
    "Identificamos uso de medicação que exige avaliação médica individual antes de qualquer sugestão automatizada de nootrópicos. Por segurança, este fluxo foi encerrado.",
};

function calcularResultado(respostas: Record<string, string[]>): ResultadoPerfil {
  const foco = respostas.foco_atual?.[0];
  const energia = respostas.queda_energia?.[0];
  const sono = respostas.sono_mente?.[0];
  const rotina = respostas.rotina?.[0];
  const experiencia = respostas.experiencia_previa ?? [];

  const cicloFalsoAlerta =
    experiencia.includes("cafe_excesso") &&
    (sono === "acelerada" || sono === "exausta_alerta");

  const perfil =
    rotina === "alta_pressao"
      ? "Alta Pressão"
      : rotina === "criativa"
        ? "Criativa/Estratégica"
        : "Operacional Intensa";

  if (cicloFalsoAlerta) {
    return {
      diagnostico: "Ciclo do Falso Alerta",
      explicacao:
        "Você usa estímulos para combater a névoa mental e manter rendimento, mas isso aumenta hiperalerta à noite, prejudica recuperação e reinicia o cansaço no dia seguinte.",
      perfil,
      passoManha:
        "Morning Drive (Alfa GPC + Fosfatidilserina): suporte para ativação mental estável e foco sem dependência progressiva de estimulantes.",
      passoNoite:
        "Deep Recovery (Magnésio + Inositol): estratégia para desacelerar a mente, melhorar início do sono e aumentar recuperação cognitiva.",
    };
  }

  if (foco === "baixa" || foco === "dependente" || energia === "manha") {
    return {
      diagnostico: "Déficit de Ativação Cognitiva",
      explicacao:
        "Seu padrão sugere baixa prontidão mental no começo do dia e queda de desempenho sob carga, com risco de compensação excessiva por cafeína.",
      perfil,
      passoManha:
        "Morning Drive (colina + adaptógenos): melhora clareza mental, memória de trabalho e constância de foco nas primeiras horas.",
      passoNoite:
        "Deep Recovery (magnésio + suporte ao GABA): otimiza desligamento cerebral para acordar com mais energia disponível.",
    };
  }

  if (sono === "tranquila") {
    return {
      diagnostico: "Perfil de Alta Performance com Ajuste Fino",
      explicacao:
        "Você já possui base de sono funcional e boa resiliência mental. O foco é ampliar desempenho diurno e proteger energia ao longo do dia.",
      perfil,
      passoManha:
        "Morning Drive otimizado: foco profundo, tomada de decisão e estabilidade cognitiva em ciclos longos de trabalho.",
      passoNoite:
        "Night stack leve: manutenção de recuperação neural sem sedação desnecessária.",
    };
  }

  return {
    diagnostico: "Sobrecarga Cognitiva Progressiva",
    explicacao:
      "Seu padrão combina queda de energia com sinais de desgaste mental acumulado, impactando foco, produtividade e recuperação noturna.",
    perfil,
    passoManha:
      "Morning Drive balanceado: suporte para foco consistente e energia mental sem picos abruptos.",
    passoNoite:
      "Deep Recovery completo: redução de hiperatividade mental noturna e melhoria da qualidade de descanso.",
  };
}

export default function QuestionarioPage() {
  const [stage, setStage] = useState<Stage>("questions");
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string[]>>({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mensagemLoading, setMensagemLoading] = useState(mensagensLoading[0]);

  const perguntaAtual = perguntas[indicePergunta];
  const selecionadas = respostas[perguntaAtual?.id] ?? [];
  const progresso =
    stage === "lead" || stage === "loading" || stage === "result"
      ? 100
      : Math.round(((indicePergunta + 1) / (perguntas.length + 1)) * 100);
  const resultado = useMemo(() => calcularResultado(respostas), [respostas]);

  useEffect(() => {
    if (stage !== "loading") return;

    let indice = 0;
    const interval = setInterval(() => {
      indice = (indice + 1) % mensagensLoading.length;
      setMensagemLoading(mensagensLoading[indice]);
    }, 1200);

    const timeout = setTimeout(() => {
      setStage("result");
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [stage]);

  function toggleOpcao(opcaoId: string) {
    if (!perguntaAtual) return;

    setErro("");
    setRespostas((atual) => {
      const atuais = atual[perguntaAtual.id] ?? [];
      if (!perguntaAtual.multipla) {
        return { ...atual, [perguntaAtual.id]: [opcaoId] };
      }

      const existe = atuais.includes(opcaoId);
      const atualizado = existe
        ? atuais.filter((id) => id !== opcaoId)
        : [...atuais, opcaoId].filter((id) => id !== "nenhuma");

      if (opcaoId === "nenhuma") {
        return { ...atual, [perguntaAtual.id]: ["nenhuma"] };
      }

      return { ...atual, [perguntaAtual.id]: atualizado };
    });
  }

  function avancarPergunta() {
    if (!perguntaAtual) return;

    if (selecionadas.length === 0) {
      setErro("Selecione ao menos uma opção para continuar.");
      return;
    }

    const respostaCritica =
      perguntaAtual.id === "experiencia_previa" && selecionadas.includes("tarja_preta");
    if (respostaCritica) {
      setStage("blocked");
      return;
    }

    if (indicePergunta === perguntas.length - 1) {
      setStage("lead");
      return;
    }

    setIndicePergunta((atual) => atual + 1);
  }

  function voltar() {
    setErro("");
    if (stage === "lead") {
      setStage("questions");
      setIndicePergunta(perguntas.length - 1);
      return;
    }

    if (stage === "questions" && indicePergunta > 0) {
      setIndicePergunta((atual) => atual - 1);
    }
  }

  function enviarLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!nome.trim()) {
      setErro("Informe seu nome para ver seu protocolo.");
      return;
    }
    if (!email.trim()) {
      setErro("Informe seu melhor e-mail.");
      return;
    }

    setStage("loading");
  }

  return (
    <main className="min-h-screen bg-[#f4f4f2] px-3 py-6 sm:px-4 sm:py-10">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <Link href="/" className="text-sm text-[#3b5f66] hover:underline">
          Voltar para home
        </Link>

        {(stage === "questions" || stage === "lead") && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#3b5f66]">
              <span>Raio-X da Alta Performance</span>
              <span>{progresso}% concluído</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-[#e8eceb]">
              <div
                className="h-full rounded-full bg-[#fb8d7f] transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        )}

        {stage === "questions" && perguntaAtual && (
          <section key={`pergunta-${perguntaAtual.id}`} className="mt-7 animate-[fadeIn_.35s_ease] sm:mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3b5f66]">
              Tela {indicePergunta + 1}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-[#032a33] sm:text-3xl">{perguntaAtual.titulo}</h1>
            {perguntaAtual.descricao && (
              <p className="mt-2 text-sm text-[#3b5f66]">{perguntaAtual.descricao}</p>
            )}

            <div className="mt-6 space-y-3">
              {perguntaAtual.opcoes.map((opcao) => {
                const ativo = selecionadas.includes(opcao.id);
                return (
                  <button
                    key={opcao.id}
                    type="button"
                    onClick={() => toggleOpcao(opcao.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                      ativo
                        ? "border-[#fb8d7f] bg-[#fff6f4] text-[#8f3f36]"
                        : "border-[#032a33]/20 text-[#32565d] hover:border-[#fb8d7f]"
                    }`}
                  >
                    {opcao.label}
                  </button>
                );
              })}
            </div>

            {erro && <p className="mt-4 text-sm text-[#b5473a]">{erro}</p>}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={voltar}
                disabled={indicePergunta === 0}
                className="w-full rounded-lg border border-[#032a33]/20 px-4 py-2 text-sm font-semibold text-[#32565d] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={avancarPergunta}
                className="w-full rounded-lg bg-[#fb8d7f] px-6 py-2.5 text-sm font-semibold text-[#032a33] transition hover:brightness-95 sm:w-auto"
              >
                Continuar
              </button>
            </div>
          </section>
        )}

        {stage === "lead" && (
          <section className="mt-8 animate-[fadeIn_.35s_ease]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3b5f66]">
              Tela 7
            </p>
            <h1 className="mt-2 text-2xl font-bold text-[#032a33] sm:text-3xl">
              Estamos processando seu perfil
            </h1>
            <p className="mt-2 text-sm text-[#3b5f66]">
              Para onde enviamos seu protocolo personalizado com análise completa?
            </p>

            <form onSubmit={enviarLead} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-[#032a33]">
                Seu Nome
                <input
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#032a33]/15 px-3 py-2 outline-none focus:ring-2 focus:ring-[#fb8d7f]"
                  placeholder="Nome completo"
                />
              </label>

              <label className="block text-sm font-medium text-[#032a33]">
                Seu melhor E-mail
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="mt-1 w-full rounded-lg border border-[#032a33]/15 px-3 py-2 outline-none focus:ring-2 focus:ring-[#fb8d7f]"
                  placeholder="voce@empresa.com"
                />
              </label>

              {erro && <p className="text-sm text-[#b5473a]">{erro}</p>}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={voltar}
                  className="w-full rounded-lg border border-[#032a33]/20 px-4 py-2 text-sm font-semibold text-[#32565d] sm:w-auto"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#fb8d7f] px-6 py-2.5 text-sm font-semibold text-[#032a33] transition hover:brightness-95 sm:w-auto"
                >
                  Ver meu protocolo agora
                </button>
              </div>
            </form>
          </section>
        )}

        {stage === "loading" && (
          <section className="mt-8 rounded-2xl border border-[#032a33]/10 bg-[#f7f8f7] p-6 text-center animate-[fadeIn_.35s_ease] sm:mt-10 sm:p-8">
            <h2 className="text-xl font-bold text-[#032a33] sm:text-2xl">Aguarde um instante...</h2>
            <p className="mt-3 text-sm text-[#3b5f66]">{mensagemLoading}</p>
            <div className="mx-auto mt-6 h-2 w-full max-w-56 overflow-hidden rounded-full bg-[#dfe6e4]">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#fb8d7f]" />
            </div>
          </section>
        )}

        {stage === "blocked" && (
          <section className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 animate-[fadeIn_.35s_ease] sm:p-6">
            <h2 className="text-xl font-bold text-[#032a33] sm:text-2xl">{BLOQUEIO_CLINICO.titulo}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#3b5f66]">{BLOQUEIO_CLINICO.texto}</p>
          </section>
        )}

        {stage === "result" && (
          <section className="mt-8 space-y-5 animate-[fadeIn_.35s_ease]">
            <div className="rounded-xl border border-[#032a33]/10 bg-[#f7faf9] p-5 sm:p-6">
              <p className="text-sm text-[#3b5f66]">Olá, {nome}.</p>
              <h2 className="mt-1 text-2xl font-bold text-[#032a33] sm:text-3xl">{resultado.diagnostico}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#32565d]">{resultado.explicacao}</p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-xl font-bold text-[#032a33] sm:text-2xl">
                Protocolo 24h para perfil {resultado.perfil}
              </h3>
              <div className="mt-5 space-y-4">
                <article className="rounded-xl border border-[#032a33]/10 p-4">
                  <h4 className="font-semibold text-[#032a33]">☀️ Passo 1: Morning Drive</h4>
                  <p className="mt-2 text-sm text-[#32565d]">{resultado.passoManha}</p>
                </article>
                <article className="rounded-xl border border-[#032a33]/10 p-4">
                  <h4 className="font-semibold text-[#032a33]">🌙 Passo 2: Deep Recovery</h4>
                  <p className="mt-2 text-sm text-[#32565d]">{resultado.passoNoite}</p>
                </article>
              </div>
            </div>

            <div className="rounded-xl bg-[#032a33] p-5 text-white sm:p-6">
              <p className="text-sm text-[#b8d5d9]">Preço avulso estimado do protocolo: R$ 498/mês</p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Assinatura Axiom: R$ 297/mês</h3>
              <p className="mt-2 text-sm text-[#b8d5d9]">
                Condição exclusiva para quem concluiu a avaliação.
              </p>
              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-[#fb8d7f] px-6 py-2.5 text-sm font-semibold text-[#032a33] transition hover:brightness-95 sm:w-auto"
              >
                Quero iniciar meu protocolo
              </button>
            </div>

            <p className="text-xs text-[#5d7a80]">
              Relatório enviado para: <strong>{email}</strong>
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
