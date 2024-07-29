import { configureStore } from "@reduxjs/toolkit";
import { captcha } from "./api/captcha/captchaApi";
import { securityCode } from "./api/securityCode/securityCodeApi";
import { visa } from "./api/visa/visaApi";


export const store = configureStore({
  reducer: {

    [captcha.reducerPath]: captcha.reducer,
    [securityCode.reducerPath]: securityCode.reducer,
    [visa.reducerPath]: visa.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()

      .concat(captcha.middleware)
      .concat(securityCode.middleware)
      .concat(visa.middleware)


});

export default store;
