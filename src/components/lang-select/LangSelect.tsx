import { type FC, useEffect,useState } from "react";
import { Link, useLocation, useNavigate,useParams } from "react-router-dom";

import { DEFAULT_LANG,SUPPORTED_LANGS, SUPPORTED_LOCALES } from "@/constants";
import { DoneIcon, EarthIcon } from "@/icons";
import { geoService } from "@/lib/geo-service";
import type { Lang, Locale } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

const LANG_COOKIE_NAME = "i18n-lang";

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { locale: urlLocale = "" } = useParams<{ locale?: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const langSelectRef = useClickOutside<HTMLDivElement>(() => setShowMenu(false));

    const [currentLang, currentRegion] = urlLocale.split("-") as [Lang, string?];
    const isRTL = currentLang === "ar";

    useEffect(() => {
        const browserLang = navigator.language.split("-")[0];
        const cookieLang = document.cookie
            .split("; ")
            .find(row => row.startsWith(`${LANG_COOKIE_NAME}=`))
            ?.split("=")[1];

        const resolvedLocale = resolveLocale({
            urlLocale,
            cookieLang,
            browserLang,
            query: location.search,
        });

        if (urlLocale !== resolvedLocale) {
            const newPath = location.pathname.replace(`/${urlLocale}`, `/${resolvedLocale}`);
            navigate(`${newPath}${location.search}`, { replace: true });
        }
    }, [urlLocale, location, navigate]);

    const buildNewPath = (newLang: Lang): string => {
        const newLocale = currentRegion ? `${newLang}-${currentRegion}` : newLang;
        const pathWithoutLocale = location.pathname.replace(`/${urlLocale}`, "");
        return `/${newLocale}${pathWithoutLocale}${location.search}`;
    };

    return (
        <div className={styles.langSelect} ref={langSelectRef} style={{ direction: 'ltr' }}>
            <button
                className={styles.langSelectButton}
                onClick={() => setShowMenu((s) => !s)}
                data-testid="lang-select-button"
            >
                <span className={styles.langSelectText}>
                    {LANG_LABEL[currentLang]}
                </span>
                <div style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>
                    <EarthIcon />
                </div>
            </button>

            {showMenu && (
                <ul 
                    className={styles.langSelectMenu} 
                    data-testid="lang-select-menu"
                    style={{
                        right: isRTL ? 'auto' : '0',
                        left: isRTL ? '0' : 'auto',
                        textAlign: isRTL ? 'right' : 'left'
                    }}
                >
                    {SUPPORTED_LANGS.map((lang) => (
                        <Link to={buildNewPath(lang)} key={lang}>
                            <li
                                className={styles.langSelectMenuItem}
                                onClick={() => {
                                    setShowMenu(false);
                                    document.cookie = `${LANG_COOKIE_NAME}=${lang}; path=/; max-age=31536000`;
                                }}
                                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                            >
                                <span className={styles.langSelectMenuItemText}>
                                    {LANG_LABEL[lang]}
                                </span>
                                {lang === currentLang && <DoneIcon />}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

function resolveLocale({
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
    if (urlLocale && SUPPORTED_LOCALES.includes(urlLocale as Locale)) {
        return urlLocale as Locale;
    }

    const langFromUrl = urlLocale?.split("-")[0];
    const lang = (
        langFromUrl || 
        cookieLang || 
        browserLang || 
        DEFAULT_LANG
    ) as Lang;

    const currentRegion = geoService.getCurrentRegion(query);
    
    const fullLocale = `${lang}-${currentRegion}` as Locale;

    if (SUPPORTED_LOCALES.includes(fullLocale)) {
        return fullLocale;
    }

    if (SUPPORTED_LOCALES.includes(lang)) {
        return lang;
    }

    return DEFAULT_LANG;
}