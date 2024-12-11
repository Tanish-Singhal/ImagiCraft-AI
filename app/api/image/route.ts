import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  function randomeNumberGenerator() {
    return Math.floor(Math.random() * 1000000);
  }

  const randomSeed = randomeNumberGenerator();

  const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    body.imagePrompt
  )}?seed=${randomSeed}&width=512&height=512&nologo=True`;

  await fetch(imageURL);

  return NextResponse.json({
    url: imageURL,
  });
}
