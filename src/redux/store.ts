import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import languageReducer from './slices/languageSlice'
import favoritesReducer from '@/components/commonFavorite/FavoritesSlice';
import shareReducer from "@/components/commonShare/ShareSlice";
import windowReducer from "@/components/commonCard/WindowSlice";
import { gamerFriendApi } from '@/components/contentGames/gamesApi';
import { favoriteApi } from '@/components/contentGames/favoriteApi';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    favorites: favoritesReducer,
    share: shareReducer,
    window: windowReducer,
    [gamerFriendApi.reducerPath]: gamerFriendApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamerFriendApi.middleware, favoriteApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch