import React from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";

interface TripleInfoCardProps {
  cardName: string;
  tittle: string;
  subTitle?: string;
  info1: string;
  info2: string;
  info3: string;
  highlight?: string;
}

export default function TripleInfoCard({
  cardName,
  tittle,
  subTitle,
  info1,
  info2,
  info3,
  highlight,
}: TripleInfoCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: "#6667AB",
        color: "white",
        width: { xs: "100%", sm: 320 },
        minHeight: 400,
        borderRadius: 4,
        boxShadow: 6,
        px: 4,
        py: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="overline"
          sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}
        >
          {cardName.toUpperCase()}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {tittle}
        </Typography>

        {subTitle && (
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}
          >
            {subTitle}
          </Typography>
        )}

        <Stack spacing={2}>
          <Typography variant="body1">{info1}</Typography>
          <Typography variant="body1">{info2}</Typography>
          <Typography variant="body1">{info3}</Typography>
        </Stack>

        {highlight && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 3,
              color: "#FFD700",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {highlight}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
