import { UserSearchBarPayload, UserFullPayload, GamePayloadReturn } from "@/types/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apigamefriends.onrender.com/", 
    prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  }),
  endpoints: (builder) => ({
    getUsuarioByName: builder.query<UserSearchBarPayload[], {search?: string; page: number; size: number;}>({
      query: ({ page = 0 , size=5, search=''}) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        params.set('page', String(page));
        params.set('size', String(size));
        return `usuario/search?${params.toString()}`;
      },
    }),
    getUsuarioById: builder.query<UserFullPayload , {id: number}>({
      query: ({id}) => `usuario/search/${id}`,
    }),
    getFavoritosUsuario: builder.query<GamePayloadReturn[], {id: number}>({
        query: ({id}) => `usuario/favoritos/${id}`,
    })
  }),
});

export const {
   useGetUsuarioByNameQuery,
   useGetUsuarioByIdQuery,
   useGetFavoritosUsuarioQuery,
   } = userApi;