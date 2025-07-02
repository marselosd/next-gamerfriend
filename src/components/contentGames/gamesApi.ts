import { GamePayload, GamePayloadReturn, GamePayloadUpdate, ReviewPayloadReturn, ReviewPayload, FavoritePayload } from "@/types/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gamerFriendApi = createApi({
  reducerPath: 'gamerfriendApi',
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
    getGames: builder.query<GamePayloadReturn[], { page: number; size: number; filter?: string; search?: string}>({
      query: ({ page = 0 , size=21, filter='',search=''}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('size', String(size));
        if (filter) params.set('filter', filter);
        if (search) params.set('search', search);
        return `jogos?${params.toString()}`;
      },
    }),
    getGame: builder.query<GamePayloadReturn , {id: number}>({
      query: ({id}) => `jogos/${id}`,
    }),
    addGame: builder.mutation<GamePayloadReturn, GamePayload> ({
      query: (newGame) => ({
        url: 'jogos',
        method: 'POST',
        body: newGame,
      }),
    }),
    updateGame: builder.mutation<GamePayloadReturn, {id: number; data: GamePayloadUpdate}> ({
      query: ({id, data}) => ({
        url: `jogos/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteGame: builder.mutation<void, number> ({
      query: (id) => ({
        url: `jogos/${id}`,
        method: 'DELETE',
      }),
    }),
    createReview: builder.mutation<ReviewPayloadReturn, ReviewPayload> ({
      query: (newReview) => ({
        url: 'jogos/review',
        method: 'POST',
        body: newReview,
      }),
    }),
    updateReview: builder.mutation<ReviewPayloadReturn, ReviewPayload> ({
      query: (updateReview) => ({
        url: 'jogos/review',
        method: 'PUT',
        body: updateReview,
      }),
    }),
    toggleFavorite: builder.mutation<FavoritePayload, FavoritePayload> ({
      query: (toggle) => ({
        url: 'jogos/favoritos',
        method: 'PUT',
        body: toggle,
      }),
    }),
    getFavorites: builder.query<GamePayloadReturn[], void >({
      query: () => {
        return `usuarios/favoritos`;
      },  
    }),
  }),
});

export const {
   useGetGamesQuery,
   useGetGameQuery,
   useAddGameMutation,
   useUpdateGameMutation,
   useDeleteGameMutation,
   useCreateReviewMutation,
   useUpdateReviewMutation,
   useToggleFavoriteMutation,
   useGetFavoritesQuery
   } = gamerFriendApi;