"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
      {
        id: "deep_work",
        label: "🎯 Atingir estado de foco profundo (Deep Work) sem distrações.",
      },
      {
        id: "energia_constante",
        label: "⚡ Ter energia limpa e constante, sem o crash no meio da tarde.",
      },
      {
        id: "memoria_pressao",
        label: "🧠 Melhorar minha memória e velocidade de raciocínio sob pressão.",
      },
      {
        id: "sono_reparador",
        label: "🌙 Conseguir desligar a mente à noite e ter um sono realmente reparador.",
      },
    ],
  },
  {
    id: "foco_atual",
    titulo: "Como você descreveria sua capacidade atual de manter o foco em tarefas complexas?",
    multipla: false,
    opcoes: [
      { id: "excelente", label: "Excelente: Consigo focar, mas quero elevar meu limite." },
      {
        id: "inconstante",
        label:
          "Inconstante: Tenho picos de foco, mas me distraio facilmente com notificações ou pensamentos.",
      },
      {
        id: "baixa",
        label: "Baixa: Sinto uma névoa mental (brain fog) frequente e demoro a engrenar nas tarefas.",
      },
      { id: "dependente", label: "Dependente: Só consigo focar se tomar muito café ou estimulantes fortes." },
    ],
  },
  {
    id: "queda_energia",
    titulo: "Em qual momento do dia você sente maior queda de produtividade e energia?",
    multipla: false,
    opcoes: [
      { id: "manha", label: "Logo ao acordar (preciso de muito esforço/café para ligar)." },
      { id: "tarde", label: "No início da tarde (o famoso crash pós-almoço)." },
      {
        id: "noite",
        label: "No final do dia (chego em casa mentalmente esgotado, sem energia para a família).",
      },
      { id: "oscilando", label: "Minha energia oscila o tempo todo como uma montanha-russa." },
    ],
  },
  {
    id: "sono_mente",
    titulo: "Como sua mente se comporta quando você deita na cama para dormir?",
    multipla: false,
    opcoes: [
      {
        id: "acelerada",
        label: "Acelerada: Penso nos problemas do trabalho, e-mails e no que preciso fazer amanhã.",
      },
      {
        id: "exausta_alerta",
        label: "Exausta, mas alerta: Meu corpo está cansado, mas meu cérebro não desliga.",
      },
      {
        id: "acordo_cansado",
        label: "Apago rápido, mas acordo mal: Durmo logo, mas acordo no meio da noite ou levanto cansado.",
      },
      { id: "tranquila", label: "Tranquila: Durmo bem e acordo revigorado." },
    ],
  },
  {
    id: "experiencia_previa",
    titulo: "O que você já utiliza ou tentou utilizar para lidar com esses desafios?",
    descricao: "Você pode selecionar mais de uma opção.",
    multipla: true,
    opcoes: [
      { id: "cafe_excesso", label: "☕ Excesso de café ou energéticos (mais de 3 doses ao dia)." },
      {
        id: "tarja_preta",
        label:
          "💊 Medicamentos tarja preta para foco ou sono (ex: Venvanse, Ritalina, Zolpidem).",
      },
      {
        id: "suplementos_basicos",
        label: "🌿 Suplementos básicos (polivitamínicos, ômega 3 de farmácia comum).",
      },
      {
        id: "estilo_vida",
        label: "🧘‍♂️ Práticas de estilo de vida (meditação, higiene do sono, exercícios).",
      },
      { id: "nenhuma", label: "Nenhuma das alternativas. Estou buscando minha primeira solução real." },
    ],
  },
  {
    id: "rotina",
    titulo: "Como você descreveria a sua rotina atual de trabalho?",
    multipla: false,
    opcoes: [
      {
        id: "alta_pressao",
        label: "Alta Pressão: Tomo decisões críticas diariamente, lidero pessoas e tenho pouco tempo livre.",
      },
      {
        id: "criativa",
        label: "Criativa/Estratégica: Preciso de longos blocos de tempo pensando e criando soluções.",
      },
      {
        id: "operacional",
        label: "Operacional Intensa: Muitas reuniões, e-mails e tarefas simultâneas (multitarefa constante).",
      },
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
        "Você usa estimulantes para combater a névoa mental matinal, o que gera ansiedade à tarde e impede seu cérebro de desligar à noite. Isso destrói sua fase REM do sono, fazendo você acordar cansado novamente.",
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
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("questions");
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string[]>>({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mensagemLoading, setMensagemLoading] = useState(mensagensLoading[0]);
  const [persistindo, setPersistindo] = useState(false);
  const [erroPersistencia, setErroPersistencia] = useState("");

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

  async function continuarParaCadastro() {
    if (persistindo) return;

    setPersistindo(true);
    setErroPersistencia("");

    try {
      const response = await fetch("/api/questionario/submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadName: nome,
          leadEmail: email,
          respostas,
          resultado,
        }),
      });

      if (!response.ok) {
        setErroPersistencia("Nao foi possivel salvar seu resultado agora. Tente novamente.");
        return;
      }

      router.push("/auth?callbackUrl=%2Fconta");
    } catch {
      setErroPersistencia("Nao foi possivel salvar seu resultado agora. Tente novamente.");
    } finally {
      setPersistindo(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020712] px-3 py-6 text-white sm:px-4 sm:py-10">
      <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,#08111f_0%,#050b15_100%)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:p-8">
        <Link href="/" className="text-sm text-white/65 hover:text-[#8cefff] hover:underline">
          Voltar para home
        </Link>

        {(stage === "questions" || stage === "lead") && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-white/65">
              <span>Raio-X da Alta Performance</span>
              <span>{progresso}% concluido</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#00d8ff] shadow-[0_0_18px_rgba(0,216,255,0.45)] transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        )}

        {stage === "questions" && perguntaAtual && (
          <section key={`pergunta-${perguntaAtual.id}`} className="mt-7 animate-[fadeIn_.35s_ease] sm:mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#73e8ff]">
              Tela {indicePergunta + 1}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{perguntaAtual.titulo}</h1>
            {perguntaAtual.descricao && (
              <p className="mt-2 text-sm text-white/68">{perguntaAtual.descricao}</p>
            )}

            <div className="mt-6 space-y-3">
              {perguntaAtual.opcoes.map((opcao) => {
                const ativo = selecionadas.includes(opcao.id);
                return (
                  <button
                    key={opcao.id}
                    type="button"
                    onClick={() => toggleOpcao(opcao.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      ativo
                        ? "border-[#00d8ff] bg-[#071726] text-[#c9f8ff] shadow-[0_0_24px_rgba(0,216,255,0.14)]"
                        : "border-white/12 bg-white/[0.03] text-white/78 hover:border-[#00d8ff]/60 hover:bg-[#07111c]"
                    }`}
                  >
                    {opcao.label}
                  </button>
                );
              })}
            </div>

            {erro && <p className="mt-4 text-sm text-[#ff8f7a]">{erro}</p>}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={voltar}
                disabled={indicePergunta === 0}
                className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/78 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={avancarPergunta}
                className="w-full rounded-xl bg-[#00d8ff] px-6 py-2.5 text-sm font-semibold text-[#04111c] shadow-[0_0_26px_rgba(0,216,255,0.25)] transition hover:brightness-110 sm:w-auto"
              >
                Continuar
              </button>
            </div>
          </section>
        )}

        {stage === "lead" && (
          <section className="mt-8 animate-[fadeIn_.35s_ease]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#73e8ff]">
              Tela 7
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Estamos processando seu perfil
            </h1>
            <p className="mt-2 text-sm text-white/68">
              Para onde devemos enviar o seu Protocolo Personalizado e a análise dos seus resultados?
            </p>

            <form onSubmit={enviarLead} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-white">
                Seu Nome
                <input
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-[#00d8ff] focus:ring-2 focus:ring-[#00d8ff]/35"
                  placeholder="Nome completo"
                />
              </label>

              <label className="block text-sm font-medium text-white">
                Seu melhor E-mail
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-[#00d8ff] focus:ring-2 focus:ring-[#00d8ff]/35"
                  placeholder="voce@empresa.com"
                />
              </label>

              {erro && <p className="text-sm text-[#ff8f7a]">{erro}</p>}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={voltar}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/78 sm:w-auto"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#00d8ff] px-6 py-2.5 text-sm font-semibold text-[#04111c] shadow-[0_0_26px_rgba(0,216,255,0.25)] transition hover:brightness-110 sm:w-auto"
                >
                  Ver meu protocolo agora
                </button>
              </div>
            </form>
          </section>
        )}

        {stage === "loading" && (
          <section className="mt-8 animate-[fadeIn_.35s_ease] rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:mt-10 sm:p-8">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Aguarde um instante...</h2>
            <p className="mt-3 text-sm text-white/68">{mensagemLoading}</p>
            <div className="mx-auto mt-6 h-2 w-full max-w-56 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#00d8ff]" />
            </div>
          </section>
        )}

        {stage === "blocked" && (
          <section className="mt-8 animate-[fadeIn_.35s_ease] rounded-xl border border-[#ff8f7a]/30 bg-[#190c10] p-5 sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">{BLOQUEIO_CLINICO.titulo}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/72">{BLOQUEIO_CLINICO.texto}</p>
          </section>
        )}

        {stage === "result" && (
          <section className="mt-8 space-y-5 animate-[fadeIn_.35s_ease]">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm text-white/65">Ola, {nome}.</p>
              <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{resultado.diagnostico}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/72">{resultado.explicacao}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#07111d] p-5 shadow-sm sm:p-6">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Para o seu perfil de {resultado.perfil}, prescrevemos o Protocolo 24h.
              </h3>
              <div className="mt-5 space-y-4">
                <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">☀️ Passo 1: Morning Drive</h4>
                  <p className="mt-2 text-sm text-white/72">{resultado.passoManha}</p>
                </article>
                <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">🌙 Passo 2: Deep Recovery</h4>
                  <p className="mt-2 text-sm text-white/72">{resultado.passoNoite}</p>
                </article>
              </div>
            </div>

            <div className="rounded-xl border border-[#00d8ff]/25 bg-[linear-gradient(135deg,#07111d_0%,#0b1d31_100%)] p-5 text-white sm:p-6">
              <p className="text-sm text-[#b8f6ff]">Preco avulso estimado do protocolo: R$ 498/mes</p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Assinatura NeuroDrive: R$ 297/mes</h3>
              <p className="mt-2 text-sm text-white/72">
                Condição exclusiva para quem concluiu a avaliação.
              </p>
              <button
                type="button"
                onClick={() => void continuarParaCadastro()}
                disabled={persistindo}
                className="mt-5 w-full rounded-xl bg-[#00d8ff] px-6 py-2.5 text-sm font-semibold text-[#04111c] transition hover:brightness-110 sm:w-auto"
              >
                {persistindo ? "Salvando..." : "Quero iniciar meu protocolo"}
              </button>
              {erroPersistencia && (
                <p className="mt-3 text-sm text-[#ffb0a1]">{erroPersistencia}</p>
              )}
            </div>

            <p className="text-xs text-white/55">
              Relatório enviado para: <strong>{email}</strong>
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

