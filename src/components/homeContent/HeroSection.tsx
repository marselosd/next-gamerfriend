'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getTranslations } from '@/locales'
import { Container, Box, Typography } from '@mui/material'

export default function HeroSection() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { hero } = getTranslations(currentLanguage)

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
      </Container>
    </Box>
  )
}