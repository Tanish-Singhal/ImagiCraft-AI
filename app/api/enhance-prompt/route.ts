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
    "As an AI expert in image generation,your task is to improve the clarity and detail of the provided prompt while preserving the core idea. Enhance the description to ensure the generated image is visually rich and captivating. Keep the revised prompt concise and under 100 words, focusing on clear details that would guide the image creation effectively without overcomplicating the request."
  );

  const promptToEnhance = encodeURIComponent(basePrompt);

  try {
    const response = await fetch(
      `${process.env.TEXT_API_URL}/${promptToEnhance}?model=openai&json=true&system=${systemPrompt}`,
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
      .replace(/\*\*[^*]+\*\*/g, '')
      .replace(/^\s+|\s+$/g, '')
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
