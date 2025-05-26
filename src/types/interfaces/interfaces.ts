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