import type { FC, PropsWithChildren } from "react";
import { Link, useParams } from "react-router-dom";

import { BRAND_NAMES } from "@/constants";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";

import { LangSelect } from "../lang-select";
import styles from "./styles.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { locale = "en" } = useParams<{ locale?: string }>();
    const isRTL = locale.startsWith("ar");

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContent} dir={isRTL ? "rtl" : "ltr"}>
                    <Link className={styles.headerBrand} to="/">
                        <BrandLogoIcon />
                        <span className={styles.headerBrandText}>
                            {BRAND_NAMES["ru"]}
                        </span>
                    </Link>

                    <LangSelect />
                </div>
            </div>

            <div className={styles.contentContainer}>{children}</div>

            <div className={styles.footer} dir={isRTL ? "rtl" : "ltr"}>
                <div
                    className={styles.footerSocialLinks}
                    data-testid="social-icons"
                >
                    {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                        <a key={index} href="">
                            <Icon />
                        </a>
                    ))}
                </div>

                <span className={styles.footerText}>
                    © 2024-2025, ООО «
                    <a className={styles.textLink} href="">
                        {BRAND_NAMES["ru"]}
                    </a>
                    ». Все права защищены
                </span>
            </div>
        </>
    );
};