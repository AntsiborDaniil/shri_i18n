// eslint-disable-next-line simple-import-sort/imports
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

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { locale = "en" } = useParams(); // берем текущую локаль из URL
    const location = useLocation();
    const langSelectRef = useClickOutside<HTMLDivElement>(() => setShowMenu(false));

    const currentLang = locale.split("-")[0] as Lang;

    const buildNewPath = (newLang: Lang): string => {
        const region = locale.split("-")[1];
        const newLocale = region ? `${newLang}-${region}` : newLang;
        const pathWithoutLocale = location.pathname.replace(`/${locale}`, "");
        return `/${newLocale}${pathWithoutLocale}${location.search}`;
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
                <EarthIcon />
            </button>

            {showMenu && (
                <ul className={styles.langSelectMenu} data-testid="lang-select-menu">
                    {SUPPORTED_LANGS.map((lang) => (
                        <Link to={buildNewPath(lang)} key={lang}>
                            <li
                                className={styles.langSelectMenuItem}
                                onClick={() => setShowMenu(false)}
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