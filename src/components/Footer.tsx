'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getTranslations } from '@/locales'
import { Box, Typography } from '@mui/material'

export default function Footer() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { footer } = getTranslations(currentLanguage)

  return (
    <Box 
      component="footer"
      sx={{ 
        backgroundColor: '#4A4B83',
        color: 'white',
        py: 3,
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">
        {footer.text}
      </Typography>
    </Box>
  )
}