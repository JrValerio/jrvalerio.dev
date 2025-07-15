import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationPT from "../public/locales/pt/common.json";
import translationEN from "../public/locales/en/common.json";
import translationES from "../public/locales/es/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { common: translationPT },
      en: { common: translationEN },
      es: { common: translationES },
    },
    lng: "pt",
    fallbackLng: "pt",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
