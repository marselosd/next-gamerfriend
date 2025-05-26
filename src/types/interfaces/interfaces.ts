export interface CommonCardProp {
  cardName: string;
  tittle: string;
  children?: React.ReactNode;
  img?: CommonImageProp;
}

export interface CardProp extends CommonCardProp {
  id: string;
}

export interface CommonImageProp {
  image: string;
  alt: string;
}

export interface User {
  name: string | null;
  email: string | null;
  photo: string | null;
}

export interface GameData {
  guid: string;
  name: string;
  image?: {
    small_url?: string;
  };
  deck?: string;
  description?: string;
}

export interface GameResult {
  id: number | string;
  name: string;
  image?: {
    small_url?: string;
  };
  deck?: string;
  description?: string;
}

export interface GamesApiResponse {
  results: GameResult[];
}