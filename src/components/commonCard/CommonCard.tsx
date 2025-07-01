import React from "react";
import { CommonCardProp } from "@/types/interfaces/interfaces";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function CommonCard({ cardName, tittle, children, img }: CommonCardProp) {
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
            height: 160,
            width: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          {cardName}
        </Typography>

        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            fontSize: '1.1rem',
          }}
        >
          {tittle}
        </Typography>

        <Box
          sx={{
            mt: 1,
            maxHeight: 120,
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '3px',
            },
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {children}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
