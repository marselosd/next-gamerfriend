import React from "react";
import { CommonCardProp } from "@/types/interfaces/interfaces";
import { Card, CardMedia} from "@mui/material";

export default function CommonCard({ img,}: CommonCardProp) {
  return (
    <Card
      sx={{
        backgroundColor: '#6667AB',
        color: 'white',
        width: 280,
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: 4,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {img && (
        <CardMedia
          component="img"
          image={img.image}
          alt={img.alt}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      )}
    </Card>
  );
}