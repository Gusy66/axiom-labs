"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

type Usuario = {
  nome: string;
  email: string;
  senha: string;
};

function obterUsuarios(): Usuario[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("axiom_users") ?? "[]") as Usuario[];
}

function salvarUsuarios(usuarios: Usuario[]) {
  localStorage.setItem("axiom_users", JSON.stringify(usuarios));
}

export default function AuthPage() {
  const router = useRouter();
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const titulo = useMemo(
    () => (modo === "login" ? "Entrar na Axiom Labs" : "Criar conta"),
    [modo],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const usuarios = obterUsuarios();
    const usuario = usuarios.find((item) => item.email === email.toLowerCase());

    if (modo === "login") {
      if (!usuario) {
        setMensagem(
          "Conta não encontrada. Redirecionamos você para o cadastro agora.",
        );
        setModo("cadastro");
        return;
      }

      if (usuario.senha !== senha) {
        setMensagem("Senha incorreta. Tente novamente.");
        return;
      }

      localStorage.setItem(
        "axiom_session",
        JSON.stringify({ nome: usuario.nome, email: usuario.email }),
      );
      router.push("/");
      return;
    }

    if (usuario) {
      setMensagem("Este e-mail já está cadastrado. Faça login.");
      setModo("login");
      return;
    }

    if (!nome.trim()) {
      setMensagem("Informe seu nome para concluir o cadastro.");
      return;
    }

    const novoUsuario = { nome: nome.trim(), email: email.toLowerCase(), senha };
    salvarUsuarios([...usuarios, novoUsuario]);
    localStorage.setItem(
      "axiom_session",
      JSON.stringify({ nome: novoUsuario.nome, email: novoUsuario.email }),
    );
    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f4f2] px-3 py-6 sm:px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6">
          <Link href="/" className="text-sm text-[#3b5f66] hover:underline">
            Voltar para home
          </Link>
          <h1 className="mt-3 text-xl font-bold text-[#032a33] sm:text-2xl">{titulo}</h1>
          <p className="mt-2 text-sm text-[#3b5f66]">
            {modo === "login"
              ? "Acesse sua conta para continuar sua jornada."
              : "Crie sua conta para começar sua avaliação nootrópica."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === "cadastro" && (
            <label className="block text-sm font-medium text-[#032a33]">
              Nome completo
              <input
                required
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                className="mt-1 w-full rounded-lg border border-[#032a33]/15 px-3 py-2 outline-none focus:ring-2 focus:ring-[#fb8d7f]"
                placeholder="Seu nome"
              />
            </label>
          )}

          <label className="block text-sm font-medium text-[#032a33]">
            E-mail
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#032a33]/15 px-3 py-2 outline-none focus:ring-2 focus:ring-[#fb8d7f]"
              placeholder="voce@exemplo.com"
            />
          </label>

          <label className="block text-sm font-medium text-[#032a33]">
            Senha
            <input
              required
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#032a33]/15 px-3 py-2 outline-none focus:ring-2 focus:ring-[#fb8d7f]"
              placeholder="********"
            />
          </label>

          {mensagem && (
            <p className="rounded-lg bg-[#fff6f4] px-3 py-2 text-sm text-[#8f3f36]">
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#fb8d7f] py-2.5 text-sm font-semibold text-[#032a33] transition hover:brightness-95"
          >
            {modo === "login" ? "Entrar" : "Cadastrar e continuar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() =>
            setModo((atual) => (atual === "login" ? "cadastro" : "login"))
          }
          className="mt-5 text-sm text-[#32565d] hover:underline"
        >
          {modo === "login"
            ? "Não tem conta? Cadastre-se"
            : "Já tem conta? Entrar"}
        </button>
      </div>
    </main>
  );
}
