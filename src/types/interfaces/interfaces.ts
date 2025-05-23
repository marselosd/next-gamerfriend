export interface CommonCardProp {
    cardName: string;
    tittle: string;
    children?: React.ReactNode;
    img?: CommonImageProp;
    id?: string;
}

export interface CommonImageProp {
    image: string;
    alt: string;
}