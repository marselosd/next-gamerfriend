'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getTranslations } from '@/locales'
import { Button, Container, Box, Typography } from '@mui/material'

export default function HeroSection() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { hero, auth } = getTranslations(currentLanguage)

  return (
    <Box 
      sx={{ 
        backgroundColor: '#6667AB', 
        color: 'white',
        py: 10,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          {hero.title}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {hero.subtitle}
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          size="large"
          sx={{ 
            mt: 3,
            backgroundColor: 'white',
            color: '#6667AB',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            }
          }}
        >
          {auth.createAccount}
        </Button>
      </Container>
    </Box>
  )
}