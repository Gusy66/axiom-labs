import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare, hash } from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";

const providers: NextAuthConfig["providers"] = [
  Credentials({
    name: "Credenciais",
    credentials: {
      mode: { label: "Mode", type: "text" },
      name: { label: "Nome", type: "text" },
      email: { label: "E-mail", type: "email" },
      password: { label: "Senha", type: "password" },
    },
    async authorize(credentials) {
      const mode = credentials.mode === "cadastro" ? "cadastro" : "login";
      const name = String(credentials.name ?? "").trim();
      const email = String(credentials.email ?? "").trim().toLowerCase();
      const password = String(credentials.password ?? "");

      if (!email || !password) return null;

      if (mode === "cadastro") {
        if (!name || password.length < 8) return null;

        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser?.passwordHash) {
          return null;
        }

        const passwordHash = await hash(password, 12);

        if (existingUser) {
          const updated = await db.user.update({
            where: { id: existingUser.id },
            data: {
              name: existingUser.name ?? name,
              passwordHash,
            },
          });

          return {
            id: updated.id,
            name: updated.name ?? "Usuario",
            email: updated.email ?? email,
          };
        }

        const created = await db.user.create({
          data: {
            name,
            email,
            passwordHash,
          },
        });

        return {
          id: created.id,
          name: created.name ?? name,
          email: created.email ?? email,
        };
      }

      const user = await db.user.findUnique({ where: { email } });

      if (!user?.passwordHash) return null;

      const validPassword = await compare(password, user.passwordHash);
      if (!validPassword) return null;

      return {
        id: user.id,
        name: user.name ?? "Usuario",
        email: user.email ?? email,
      };
    },
  }),
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(Google);
}

if (process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET) {
  providers.push(Apple);
}

export const authConfig = {
  adapter: PrismaAdapter(db),
  trustHost: true,
  providers,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      const userId = user?.id ?? String(token.id ?? "");

      if (session.user) {
        session.user.id = userId;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
