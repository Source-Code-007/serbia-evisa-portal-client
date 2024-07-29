import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const securityCode = createApi({
  reducerPath: "securityCode",
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_REACT_APP_ROOT}),

  endpoints: (builder) => ({
    createSecurityCode: builder.mutation({
      query: (securityCodeData) => {
        return {
          url: `/securityCode`,
          method: "POST",
          body: securityCodeData,
        };
      },
    }),

    getAllSecurityCode: builder.query({
      query: () => "/securityCode",
    }),
  }),
});


export const {
  useGetAllSecurityCodeQuery,
  useCreateSecurityCodeMutation,
} = securityCode;
