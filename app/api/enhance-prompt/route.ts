import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/utils/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  const body = await request.json();
  const basePrompt = body.prompt;

  const systemPrompt = encodeURIComponent(
    "You are an AI expert at enhancing image generation prompts. Enhance the given prompt by keeping the core idea but make it more detailed and visually rich."
  );

  const promptToEnhance = encodeURIComponent(basePrompt);

  try {
    const response = await fetch(
      `https://text.pollinations.ai/${promptToEnhance}?model=openai&json=true&system=${systemPrompt}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      }
    );

    const text = await response.text();

    if (!text) {
      throw new Error("No prompt received from API");
    }

    const cleanedPrompt = text
      .replace(/"/g, '')
      .replace(/^["']|["']$/g, '')
      .trim();

    return NextResponse.json({ enhancedPrompt: cleanedPrompt });
  } catch (err) {
    console.error('Prompt enhancement failed:', err);
    return NextResponse.json(
      { error: "Unable to enhance prompt at this time" },
      { status: 500 }
    );
  }
}
