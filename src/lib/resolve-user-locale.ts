import type { Lang, Locale } from "@/types";

import {
    DEFAULT_LANG,
    SUPPORTED_LANGS,
    SUPPORTED_LOCALES,
} from "../constants/index";
import { geoService } from "./geo-service";

function isSupportedLang(lang: string): lang is Lang {
    return (SUPPORTED_LANGS as readonly string[]).includes(lang);
}

function isSupportedLocale(locale: string): locale is Locale {
    return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}


export function resolveUserLocale({
  urlLocale,
  cookieLang,
  browserLang,
  query,
}: {
  urlLocale?: string;
  cookieLang?: string;
  browserLang?: string;
  query: string;
}): Locale {
  const langFromUrl = urlLocale?.split("-")[0];
  const regionFromGeo = geoService.getCurrentRegion(query);
  const lang = langFromUrl || cookieLang || browserLang || DEFAULT_LANG;

  if (!isSupportedLang(lang)) return DEFAULT_LANG;

  // Если русский язык, всегда возвращаем с регионом из geoService
  if (lang === "ru") {
    const fullLocale = `${lang}-${regionFromGeo}`;
    if (isSupportedLocale(fullLocale)) return fullLocale;
    // fallback — если регион не поддерживается
    return lang;
  }

  // Для остальных — просто язык без региона, если поддерживается
  if (isSupportedLocale(lang)) return lang;

  return DEFAULT_LANG;
}
