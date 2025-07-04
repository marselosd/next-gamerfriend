import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FavoritePayload, GamePayloadReturn } from "@/types/interfaces/interfaces";

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://apigamefriends.onrender.com/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation<FavoritePayload, FavoritePayload>({
      query: (toggle) => ({
        url: 'jogos/favoritos',
        method: 'PUT',
        body: toggle,
      }),
    }),
    getFavorites: builder.query<GamePayloadReturn[], void>({
      query: () => `usuarios/favoritos`,
    }),
    getFavorite: builder.query<FavoritePayload, {id: number}> ({
        query: ({id}) => `jogos/favoritos/${id}`,
    })
  }),
});

export const {
  useToggleFavoriteMutation,
  useGetFavoritesQuery,
  useGetFavoriteQuery,
} = favoriteApi;
