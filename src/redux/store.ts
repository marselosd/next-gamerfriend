import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import favoritesReducer from '@/components/commonFavorite/FavoritesSlice';
import shareReducer from "@/components/commonShare/ShareSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    favorites: favoritesReducer,
    share: shareReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch