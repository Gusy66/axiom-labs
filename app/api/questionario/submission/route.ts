import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  QUIZ_SESSION_COOKIE,
  QUIZ_SESSION_MAX_AGE_SECONDS,
} from "@/lib/questionnaire";

type SubmissionPayload = {
  leadName?: string;
  leadEmail?: string;
  respostas?: Record<string, string[]>;
  resultado?: {
    diagnostico: string;
    explicacao: string;
    perfil: string;
    passoManha: string;
    passoNoite: string;
  };
};

export async function POST(request: Request) {
  try {
    const session = await auth();
    const cookieStore = await cookies();
    const existingSessionId = cookieStore.get(QUIZ_SESSION_COOKIE)?.value;
    const quizSessionId = existingSessionId || crypto.randomUUID();

    const body = (await request.json()) as SubmissionPayload;

    if (!body.respostas || !body.resultado) {
      return NextResponse.json(
        { error: "Dados do questionario incompletos." },
        { status: 400 },
      );
    }

    const submission = await db.questionnaireSubmission.create({
      data: {
        userId: session?.user?.id,
        sessionId: quizSessionId,
        leadName: body.leadName?.trim() || null,
        leadEmail: body.leadEmail?.trim().toLowerCase() || null,
        respostas: body.respostas,
        diagnostico: body.resultado.diagnostico,
        explicacao: body.resultado.explicacao,
        perfil: body.resultado.perfil,
        passoManha: body.resultado.passoManha,
        passoNoite: body.resultado.passoNoite,
      },
      select: {
        id: true,
      },
    });

    const response = NextResponse.json({ id: submission.id });

    response.cookies.set({
      name: QUIZ_SESSION_COOKIE,
      value: quizSessionId,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: QUIZ_SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("questionario_submission_error", error);

    return NextResponse.json(
      { error: "Não foi possível salvar seu resultado agora." },
      { status: 500 },
    );
  }
}
