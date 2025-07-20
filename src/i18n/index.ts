import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translations from '../../translations.json'; // Прямой импорт

// Тип для структуры переводов
type TranslationData = {
  [key: string]: {
    en: string;
    ru: string;
    ar: string;
  };
};

// Преобразуем структуру под i18next
const resources = {
  en: {
    translation: Object.keys(translations).reduce((acc, key) => {
      acc[key] = (translations as TranslationData)[key].en;
      return acc;
    }, {} as Record<string, string>)
  },
  ru: {
    translation: Object.keys(translations).reduce((acc, key) => {
      acc[key] = (translations as TranslationData)[key].ru;
      return acc;
    }, {} as Record<string, string>)
  },
  ar: {
    translation: Object.keys(translations).reduce((acc, key) => {
      acc[key] = (translations as TranslationData)[key].ar;
      return acc;
    }, {} as Record<string, string>)
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    }
  });

export default i18n;