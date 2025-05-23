import { CommonCardProp } from "@/types/interfaces/interfaces";
import { Card, CardContent, Typography } from "@mui/material";

export default function CommonCard({ cardName, tittle, children}: CommonCardProp) {
  return (
    <>
    <Card sx={{ backgroundColor: '#6667AB', color: 'white' }} className="shadow-lg rounded-2xl">
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {cardName}
            </Typography>

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