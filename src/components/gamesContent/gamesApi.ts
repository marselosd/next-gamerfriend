import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const giantBombApi = createApi({
  reducerPath: 'giantbombApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/', 
  }),
  endpoints: (builder) => ({
    getGames: builder.query<any, { page?: number; sort?: string; search?: string}>({
      query: ({ page = 1 , sort='', search=''}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        return `giantbomb?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetGamesQuery } = giantBombApi;