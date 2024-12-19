import { authOptions } from "@/app/utils/authOptions";
import prisma from "@/app/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  function randomeNumberGenerator() {
    return Math.floor(Math.random() * 1000000);
  }

  const randomSeed = randomeNumberGenerator();

  const imageURL = `${process.env.IMAGE_API_URL}/prompt/${encodeURIComponent(
    body.imagePrompt
  )}?seed=${randomSeed}&width=${body.width}&height=${body.height}&nologo=True&model=${body.model}&safe=${!body.nsfw}`;
  
  const response = await fetch(imageURL);

  const responseText = await response.text();
  if (responseText.includes("NSFW content detected")) {
    return NextResponse.json(
      { error: "NSFW content detected. Please enable NSFW toggle or modify your prompt." },
      { status: 400 }
    );
  }

  await prisma.post.create({
    data: {
      prompt: body.imagePrompt,
      url: imageURL,
      seed: randomSeed,
      userId: user.id,
    },
  });

  return NextResponse.json({
    url: imageURL,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(posts);
}
