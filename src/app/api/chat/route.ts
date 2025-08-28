// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

let conversationHistory: { role: "user" | "assistant"; content: string }[] = [];

export async function POST(req: Request) {
  try {
    const { message, reset } = await req.json();

    if (reset) conversationHistory = [];

    conversationHistory.push({ role: "user", content: message });

    const systemPrompt =
      "You are a savage but lovable, smart AI assistant built by Sohaib (github:github.com/sohaibkundi2). " +
      "You answer questions, but also throw in jokes, playful roasts, and sarcastic one-liners. " +
      "Keep it lighthearted, funny, positive, slightly chaotic — but never mean.";

    const client = await Client.connect("amd/gpt-oss-120b-chatbot");

    const result = await client.predict("/chat", [
      [systemPrompt, ...conversationHistory.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)].join("\n\n"),
      systemPrompt,
      0.7,
      "medium",
      false,
    ]);

    const data = result.data as string[];
    const rawOutput = data[0] ?? "";

    // Regex compatible with ES2018+
    const match = rawOutput.match(/\*\*💬 Response:\*\*\s*([\s\S]*)/);
    const cleanOutput = match ? match[1].trim() : rawOutput;

    conversationHistory.push({ role: "assistant", content: cleanOutput });

    return NextResponse.json({ output: cleanOutput });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Chat API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
