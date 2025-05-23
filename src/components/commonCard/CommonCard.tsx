import React from "react";
import { CommonCardProp } from "@/types/interfaces/interfaces";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function CommonCard({ cardName, tittle, children, img}: CommonCardProp) {
  return (
    <>
    <Card sx={{ backgroundColor: '#6667AB', color: 'white' }} className="shadow-lg rounded-2xl">
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {cardName}
            </Typography>

            {img ? 
            (
            <CardMedia
                component="img"
                image={img.image}
                alt={img.alt}
                sx={{
                    width: '200px',
                    height: '175px',    
                    objectFit: 'cover',   
                    borderRadius: 2,     
                }}
            />
            ) :
            (
                <>
                </>
            )}
            <br/>
            <hr/>

            <Typography variant="h5" component="div">
                {tittle}
            </Typography>
            
            <Typography variant="body2">
                {children}
            </Typography>
        </CardContent>
    </Card>
    </>
  );
}