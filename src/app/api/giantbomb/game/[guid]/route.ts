import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { guid: string } }
) {
  const { guid } = params;
  const API_KEY = process.env.NEXT_PUBLIC_GIANT_BOMB_KEY;

  if (!guid) {
    return NextResponse.json({ error: "GUID do jogo é obrigatório" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "Chave da API não configurada" }, { status: 500 });
  }

  const url = `https://www.giantbomb.com/api/game/${guid}/?api_key=${API_KEY}&format=json&field_list=id,guid,name,deck,description,image,original_release_date,platforms`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Next.js App",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `Erro na API externa: ${text}` }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Erro interno ao buscar jogo ${error}` }, { status: 500 });
  }
}
