import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt, parseAIResponse } from "@/lib/ai";
import { PostFormData } from "@/lib/types";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const body: PostFormData = await req.json();

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001", // Tani i szybki
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages: [{ role: "user", content: buildUserPrompt(body) }],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    const post = parseAIResponse(rawText);

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate post" },
      { status: 500 }
    );
  }
}
