export interface CommonCardProp {
  cardName: string;
  tittle: string;
  children?: React.ReactNode;
  img: {
    image: string;
    alt: string;
  };
}

export interface CardProp extends CommonCardProp {
  id: number;
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

export interface GamePayload {
  titulo: string;
  anoLancamento: number;
  produtora: string;
  img: string;
  genero: string[];
  plataformas: string[];
  descricao: string;
}

export interface GamePayloadReturn extends GamePayload {
  id: number,
  avgRating: number;
  totalRating: number;
}

export interface GamePayloadUpdate extends GamePayload {
  avgRating: number;
  totalRating: number;
}

export interface ReviewPayload {
  idJogo: number;
  rating: number;
}

export interface ReviewPayloadReturn extends ReviewPayload {
  idUsuario: number;
}

export interface FavoritePayload {
  idJogo: number;
  favorito: boolean;
}