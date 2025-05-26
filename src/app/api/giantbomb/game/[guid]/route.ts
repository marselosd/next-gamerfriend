import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const guid = url.pathname.split('/').pop();

  if (!guid) {
    return NextResponse.json({ error: "GUID do jogo é obrigatório" }, { status: 400 });
  }

  const API_KEY = process.env.GIANT_BOMB_KEY;
  if (!API_KEY) {
    return NextResponse.json({ error: "Chave da API não configurada" }, { status: 500 });
  }

  const apiUrl = `https://www.giantbomb.com/api/game/${guid}/?api_key=${API_KEY}&format=json&field_list=id,guid,name,deck,description,image,original_release_date,platforms`;

  try {
    const response = await fetch(apiUrl, {
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
    return NextResponse.json({ error: `Erro interno ao buscar jogo: ${error}` });
  }
}
