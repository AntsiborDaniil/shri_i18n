import { type FC, useState } from "react";
import { useLocation } from "react-router-dom";

import { LANG_COOKIE_NAME,SUPPORTED_LANGS } from "@/constants";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const langSelectRef = useClickOutside<HTMLDivElement>(() => setShowMenu(false));

    const currentPath = location.pathname.split('/');
    const currentLocale = currentPath[1] || '';
    const [currentLang] = currentLocale.split('-') as [Lang, string?];
    const isRTL = currentLang === "ar";

    const handleLanguageChange = (newLang: Lang) => {
        setShowMenu(false);
        
        // 1. Сохраняем язык в куки
        document.cookie = `${LANG_COOKIE_NAME}=${newLang}; path=/; max-age=31536000`;
        
        // 2. Формируем новый путь с сохранением региона
        const newLocale = currentLocale.includes('-') 
            ? `${newLang}-${currentLocale.split('-')[1]}`
            : newLang;
        
        // 3. Полный путь с сохранением query-параметров
        const newPath = `/${newLocale}${location.pathname.slice(currentLocale.length + 1)}${location.search}`;
        
        // 4. Принудительный редирект с полной перезагрузкой страницы
        window.location.href = newPath;
    };

    return (
        <div className={styles.langSelect} ref={langSelectRef}>
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
                        <li
                            key={lang}
                            className={styles.langSelectMenuItem}
                            onClick={() => handleLanguageChange(lang)}
                            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                        >
                            <span className={styles.langSelectMenuItemText}>
                                {LANG_LABEL[lang]}
                            </span>
                            {lang === currentLang && <DoneIcon />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};