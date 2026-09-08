// app/api/chat/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const resumeContext = fs.readFileSync(
  path.join(process.cwd(), "lib/resume-context.md"),
  "utf-8"
);

const SYSTEM_PROMPT = `You are an assistant answering questions about Samuel Umuhoza as a developer, on his personal portfolio site. You're having a casual conversation with a visitor — not writing a report.

Rules:
- Answer only what was asked. Do not summarize the entire resume unless explicitly asked for a full overview.
- Keep answers short — 1 to 3 sentences for most questions.
- Write in plain conversational text. No markdown — no **, no ###, no bullet points.
- Speak about Samuel in third person, like a friendly assistant describing someone.
- If something isn't covered below, say you don't have that information — never invent details.

RESUME:
${resumeContext}`;

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question || typeof question !== "string") {
    return new Response("Missing question", { status: 400 });
  }

  try {
    const streamResult = await ai.models.generateContentStream({
      model: "gemini-3.6-flash",
      contents: question,
      config: { systemInstruction: SYSTEM_PROMPT },
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult) {
            if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
          }
        } catch (err) {
          console.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Sorry, I couldn't process that right now.", { status: 500 });
  }
}