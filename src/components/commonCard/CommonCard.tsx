import React from "react";
import { CommonCardProp } from "@/types/interfaces/interfaces";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function CommonCard({ cardName, tittle, children, img }: CommonCardProp) {
    return (
        <Card
            sx={{
                backgroundColor: '#6667AB',
                color: 'white',
                width: 250,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: 3,
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
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingBottom: '16px !important',
                }}
            >
                <Typography sx={{ color: 'white', fontSize: 14, mb: 1 }}>
                    {cardName}
                </Typography>

                <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    {tittle}
                </Typography>

                <Box
                    sx={{
                        mt: 1,
                        overflowY: 'auto',
                        maxHeight: 120,
                        pr: 1,
                    }}
                >
                    <Typography variant="body2">
                        {children}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
