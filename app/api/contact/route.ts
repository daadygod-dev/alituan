// app/api/contact/route.ts
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const message = (formData.get("message") as string) || "(No message, file attached)";
  const file = formData.get("file") as File | null;

  const attachments = [];
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buffer });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Assistant <noreply@aitoolshq.space>",
      to: process.env.CONTACT_EMAIL!,
      subject: "New message from your portfolio chatbot",
      text: message,
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}