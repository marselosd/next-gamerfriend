import { NextRequest, NextResponse } from "next/server";

const db: Record<string, string[]> = {};

export async function POST(req: NextRequest) {
  const { userId, itemId } = await req.json();

  if (!userId) return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });

  db[userId] = db[userId] || [];

  if (db[userId].includes(itemId)) {
    db[userId] = db[userId].filter(id => id !== itemId);
  } else {
    db[userId].push(itemId);
  }

  return NextResponse.json({ favorites: db[userId] });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "ID de usuário não fornecido" }, { status: 400 });

  const favorites = db[userId] || [];
  return NextResponse.json({ favorites });
}
