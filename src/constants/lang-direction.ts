import type { Lang } from "@/types";

export type TextDirection = 'ltr' | 'rtl';

export const LANG_DIRECTION: Record<Lang, TextDirection> = {
    ru: "ltr",
    en: "ltr",
    ar: "rtl",
};

export function getTextDirection(locale: string): TextDirection {
    const lang = locale.split('-')[0] as Lang;
    return LANG_DIRECTION[lang] || 'ltr';
}