'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setLanguage } from '@/redux/slices/languageSlice'
import { getTranslations, availableLanguages } from '@/locales'
import { AppBar, Toolbar, Typography, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material'

export default function Header() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const dispatch = useDispatch()
  const { header, auth } = getTranslations(currentLanguage)

  const handleLanguageChange = (event: SelectChangeEvent) => {
    dispatch(setLanguage(event.target.value as 'en' | 'pt' | 'es'))
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#6667AB' }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div">
          {header.title}
        </Typography>
        <div className="flex items-center gap-4">
          <Button color="inherit" variant="outlined">
            {auth.createAccount}
          </Button>
          <Select
            value={currentLanguage}
            onChange={handleLanguageChange}
            sx={{ 
              color: 'white', 
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '.MuiSvgIcon-root': {
                color: 'white',
              }
            }}
            size="small"
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#6667AB',
                  color: 'white'
                }
              }
            }}
          >
            {availableLanguages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Toolbar>
    </AppBar>
  )
}