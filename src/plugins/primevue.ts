import PrimeVue from "primevue/config";
import MyPreset from "./primeVuePreset.ts";


import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

export default {
  install(app: any) {
    app.use(PrimeVue, {
      theme: {
        preset: MyPreset,
        options: {
          prefix: "p",
          darkModeSelector: false,
          cssLayer: {
            name: "primevue",
            order: "theme, base, primevue",
          },
        },
      },
      ripple: true,
    });

    app.use(ToastService);
    app.use(ConfirmationService);


  },
};