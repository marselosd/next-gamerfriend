export interface CommonCardProp {
  cardName: string;
  tittle: string;
  children?: React.ReactNode;
  img: {
    image: string;
    alt: string;
  };
  avgRating: number;
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
  roles: string[] | null;
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
  idJogo: number,
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

export interface UserSearchBarPayload {
  idUsuario: number;
  login: string;
}

export interface UserFullPayload extends UserSearchBarPayload {
  email: string;
  roles: string[];
}