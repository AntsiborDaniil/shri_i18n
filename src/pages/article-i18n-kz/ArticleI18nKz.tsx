import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Layout, Loader } from "@/components";

import styles from "./styles.module.css";

export const ArticleI18nKz: FC = () => {
    const { locale = "en" } = useParams<{ locale?: string }>();
    const { t, i18n, ready } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const changeLanguage = async () => {
            await i18n.changeLanguage(locale);
            setIsLoading(false);
        };

        changeLanguage();
    }, [locale, i18n]);

    if (!ready || isLoading) {
        return <Loader />;
    }

    return (
        <Layout>
            <main className={styles.article} dir={i18n.dir()}>
                <h1>{t("articleI18nKz.title")}</h1>
                <p>{t("articleI18nKz.text")}</p>
            </main>
        </Layout>
    );
};
