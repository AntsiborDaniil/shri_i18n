import { type FC, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { SUPPORTED_LANGS } from "@/constants";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

interface IconWrapperProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const IconWrapper: FC<IconWrapperProps> = ({ style, children }) => (
    <div style={style}>{children}</div>
);

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { locale = "en" } = useParams<{ locale?: string }>();
    const location = useLocation();
    const langSelectRef = useClickOutside<HTMLDivElement>(() => setShowMenu(false));

    const currentLang = locale.split("-")[0] as Lang;
    const isRTL = locale.startsWith("ar");

    const buildNewPath = (newLang: Lang): string => {
        const region = locale.split("-")[1];
        const newLocale = region ? `${newLang}-${region}` : newLang;
        const pathWithoutLocale = location.pathname.replace(`/${locale}`, "");
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
                <IconWrapper style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>
                    <EarthIcon />
                </IconWrapper>
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
                                onClick={() => setShowMenu(false)}
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