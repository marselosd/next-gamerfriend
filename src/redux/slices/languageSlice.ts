import { createSlice } from '@reduxjs/toolkit'
import { Language } from '@/locales'

interface LanguageState {
  currentLanguage: Language
}

const initialState: LanguageState = {
  currentLanguage: 'en',
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: { payload: Language }) => {
      state.currentLanguage = action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer