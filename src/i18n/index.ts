import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translations from '../../translations.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        translation: Object.fromEntries(
          Object.entries(translations).map(([key, value]) => [key, value.en])
        )
      },
      ru: { 
        translation: Object.fromEntries(
          Object.entries(translations).map(([key, value]) => [key, value.ru])
        )
      },
      ar: { 
        translation: Object.fromEntries(
          Object.entries(translations).map(([key, value]) => [key, value.ar])
        )
      }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
  });

export default i18n;