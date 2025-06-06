import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import languageReducer from './slices/languageSlice'
import favoritesReducer from '@/components/commonFavorite/FavoritesSlice';
import shareReducer from "@/components/commonShare/ShareSlice";
import windowReducer from "@/components/commonCard/WindowSlice";
import { giantBombApi } from '@/components/gamesContent/gamesApi';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    favorites: favoritesReducer,
    share: shareReducer,
    window: windowReducer,
    [giantBombApi.reducerPath]: giantBombApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(giantBombApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch