import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const visa = createApi({
  reducerPath: "visa",
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_REACT_APP_ROOT}),

  endpoints: (builder) => ({
    createVisa: builder.mutation({
      query: (visaData) => {
        return {
          url: `/visa`,
          method: "POST",
          body: visaData,
        };
      },
    }),

    getAllVisa: builder.query({
      query: ({page, limit}) => `/visa?page=${page}&limit=${limit}`,

    }),

    getSingleVisa: builder.query({
      query: (id) => `/visa/${id}`,
    }),

    updateVisa: builder.mutation({
      query: (visaData) => {
        return {
          url: `/visa/${visaData._id}`,
          method: "PATCH",
          body: visaData,
        };
      },
    }),

    deleteVisa: builder.mutation({
      query: (id) => {
        return {
          url: `/visa/${id}`,
          method: "DELETE",
        };
      },
    }),

  }),
});


export const {
  useGetAllVisaQuery,
  useGetSingleVisaQuery,
  useCreateVisaMutation,
  useUpdateVisaMutation,
  useDeleteVisaMutation

} = visa;
