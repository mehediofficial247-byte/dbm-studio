import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Very small in-memory rate limiter: 5 submissions per IP per 10 minutes.
// Fine for a single-instance deploy; swap for Upstash/Redis if you scale
// to multiple serverless regions where memory isn't shared.
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
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, budget, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !emailPattern.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
  }

  // Basic sanitization: strip control characters and cap length.
  const clean = (value: string, maxLength: number) =>
    value.replace(/[\x00-\x1F\x7F]/g, "").trim().slice(0, maxLength);

  try {
    await prisma.contactMessage.create({
      data: {
        name: clean(name, 200),
        email: clean(email, 254),
        budget: typeof budget === "string" ? clean(budget, 50) : null,
        message: clean(message, 5000),
      },
    });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email hello@dbmstudio.dev directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
