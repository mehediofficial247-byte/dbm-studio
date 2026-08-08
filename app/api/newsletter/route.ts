import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

const emailPattern = /^\S+@\S+\.\S+$/;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;

  if (typeof email !== "string" || !emailPattern.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const clean = email.trim().toLowerCase().slice(0, 254);

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: clean },
      update: {},
      create: { email: clean },
    });
  } catch (error) {
    console.error("Failed to save newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
