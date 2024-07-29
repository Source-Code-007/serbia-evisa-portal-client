import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const captcha = createApi({
  reducerPath: "captcha",
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_REACT_APP_ROOT}),

  endpoints: (builder) => ({
    createCaptcha: builder.mutation({
      query: (captchaData) => {
        return {
          url: `/captcha`,
          method: "POST",
          body: captchaData,
        };
      },
    }),

    getAllCaptcha: builder.query({
      query: () => "/captcha",
    }),

    getRandomCaptcha: builder.query({
      query: () => `/captcha/random`,
    }),

  }),
});


export const {
  useGetAllCaptchaQuery,
  useGetRandomCaptchaQuery,
  useCreateCaptchaMutation
} = captcha;
