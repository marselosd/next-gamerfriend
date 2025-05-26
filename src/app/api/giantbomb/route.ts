import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  const API_KEY = process.env.NEXT_PUBLIC_GIANT_BOMB_KEY;

  const offset = (page - 1) * 20;
   const url = `https://www.giantbomb.com/api/games/?api_key=${API_KEY}&format=json&offset=${offset}&limit=20&field_list=id,name,image${
    search ? `&filter=name:${search}` : ""
  }${sort ? `&sort=${sort}` : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'NextGamerFriend/1.0',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Erro da API externa:', text);
      return NextResponse.json({ error: 'Erro da API externa' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
