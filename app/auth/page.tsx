"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { signIn, useSession } from "next-auth/react";

function GoogleIcon() {
  return <span className="text-base">G</span>;
}

function AppleIcon() {
  return <span className="text-base">A</span>;
}

export default function AuthPage() {
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/conta");
  const { status } = useSession();
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [submetendo, setSubmetendo] = useState(false);

  const titulo = useMemo(
    () => (modo === "login" ? "Entrar na NeuroDrive" : "Criar conta"),
    [modo],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const fromSearch = searchParams.get("callbackUrl");
    const modeFromSearch = searchParams.get("mode");
    if (fromSearch) {
      setCallbackUrl(fromSearch);
    }
    if (modeFromSearch === "cadastro" || modeFromSearch === "login") {
      setModo(modeFromSearch);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
      router.refresh();
    }
  }, [callbackUrl, router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");

    if (modo === "cadastro" && !nome.trim()) {
      setMensagem("Informe seu nome para concluir o cadastro.");
      return;
    }

    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setSubmetendo(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        redirectTo: callbackUrl,
        mode: modo,
        name: nome,
        email,
        password: senha,
      });

      if (!result?.ok) {
        setMensagem(
          modo === "login"
            ? "Credenciais inválidas. Verifique e-mail e senha."
            : "Não foi possível criar sua conta. Tente outro e-mail.",
        );
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setMensagem("Não foi possível concluir a autenticação agora.");
    } finally {
      setSubmetendo(false);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    await signIn(provider, { redirectTo: callbackUrl });
  }

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020712] px-3 py-6 text-white sm:px-4">
        <div className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,#08111f_0%,#050b15_100%)] p-6 text-center shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <h1 className="text-xl font-bold sm:text-2xl">Validando sua sessão...</h1>
          <div className="mx-auto mt-5 h-2 w-full max-w-56 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#00d8ff]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020712] px-3 py-6 text-white sm:px-4">
      <div className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,#08111f_0%,#050b15_100%)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="mb-6">
          <Link href="/" className="text-sm text-white/65 hover:text-[#8cefff] hover:underline">
            Voltar para home
          </Link>
          <h1 className="mt-3 text-xl font-bold text-white sm:text-2xl">{titulo}</h1>
          <p className="mt-2 text-sm text-white/68">
            {modo === "login"
              ? "Acesse sua conta para continuar sua jornada."
              : "Crie sua conta para salvar seu protocolo e acessar sua área exclusiva."}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => void handleOAuth("google")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#00d8ff]/60"
          >
            <GoogleIcon />
            Continuar com Google
          </button>
          <button
            type="button"
            onClick={() => void handleOAuth("apple")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#00d8ff]/60"
          >
            <AppleIcon />
            Continuar com Apple
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3 text-xs text-white/50">
          <div className="h-px flex-1 bg-white/15" />
          ou
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === "cadastro" && (
            <label className="block text-sm font-medium text-white">
              Nome completo
              <input
                required
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-[#00d8ff] focus:ring-2 focus:ring-[#00d8ff]/35"
                placeholder="Seu nome"
              />
            </label>
          )}

          <label className="block text-sm font-medium text-white">
            E-mail
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-[#00d8ff] focus:ring-2 focus:ring-[#00d8ff]/35"
              placeholder="você@exemplo.com"
            />
          </label>

          <label className="block text-sm font-medium text-white">
            Senha
            <input
              required
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-[#00d8ff] focus:ring-2 focus:ring-[#00d8ff]/35"
              placeholder="********"
            />
          </label>

          {mensagem && (
            <p className="rounded-xl border border-[#ff8f7a]/30 bg-[#190c10] px-3 py-2 text-sm text-[#ffb0a1]">
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            disabled={submetendo}
            className="w-full rounded-xl bg-[#00d8ff] py-2.5 text-sm font-semibold text-[#04111c] shadow-[0_0_26px_rgba(0,216,255,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submetendo
              ? "Processando..."
              : modo === "login"
                ? "Entrar"
                : "Cadastrar e continuar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() =>
            setModo((atual) => (atual === "login" ? "cadastro" : "login"))
          }
          className="mt-5 text-sm text-white/65 hover:text-[#8cefff] hover:underline"
        >
          {modo === "login"
            ? "Não tem conta? Cadastre-se"
            : "Já tem conta? Entrar"}
        </button>
      </div>
    </main>
  );
}
