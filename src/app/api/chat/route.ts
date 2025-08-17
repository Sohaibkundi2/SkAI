import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Connect to the Gradio Space
    const client = await Client.connect("amd/gpt-oss-120b-chatbot");

    // Predict /chat
    const result = await client.predict("/chat", {
      message,
      system_prompt: "You are a helpful assistant. Only give the response, do not include any analysis.",
      temperature: 0.7,
    });

    return NextResponse.json({ reply: result.data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
