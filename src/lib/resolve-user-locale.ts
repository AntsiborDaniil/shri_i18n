import { DEFAULT_LANG, SUPPORTED_LANGS, SUPPORTED_LOCALES } from "@/constants";
import type { Lang, Locale } from "@/types";

import { geoService } from "./geo-service";

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
    // 1. Если URL содержит поддерживаемую локаль - используем ее
    if (urlLocale && isSupportedLocale(urlLocale)) {
        return urlLocale;
    }

    // 2. Определяем язык (URL -> куки -> браузер -> по умолчанию)
    const lang = getPreferredLang(urlLocale, cookieLang, browserLang);
    
    // 3. Определяем регион
    const region = geoService.getCurrentRegion(query);
    const fullLocale = `${lang}-${region}`;

    // 4. Проверяем поддерживается ли локаль с регионом
    if (isSupportedLocale(fullLocale)) {
        return fullLocale;
    }

    // 5. Проверяем поддерживается ли язык без региона
    if (isSupportedLocale(lang)) {
        return lang;
    }

    // 6. Возвращаем локаль по умолчанию
    return DEFAULT_LANG;
}

function getPreferredLang(
    urlLang?: string,
    cookieLang?: string,
    browserLang?: string
): Lang {
    const lang = urlLang?.split("-")[0] || cookieLang || browserLang || DEFAULT_LANG;
    return isSupportedLang(lang) ? lang : DEFAULT_LANG;
}

function isSupportedLang(lang: string): lang is Lang {
    return (SUPPORTED_LANGS as readonly string[]).includes(lang);
}

function isSupportedLocale(locale: string): locale is Locale {
    return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}