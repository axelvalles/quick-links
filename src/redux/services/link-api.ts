import { type LinkEntity } from '@/types/entities'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const linkApi = createApi({
  reducerPath: 'linkApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/links'
  }),
  endpoints: (builder) => ({
    getLinks: builder.query<LinkEntity[], null>({
      query: () => '/'
    })
  })
})

export const { useGetLinksQuery } = linkApi
