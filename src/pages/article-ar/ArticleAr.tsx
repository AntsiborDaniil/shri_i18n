import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Layout, Loader } from "@/components";

import styles from "./styles.module.css";

export const ArticleAr: FC = () => {
    const { locale = "en" } = useParams<{ locale: string }>();
    const { t, i18n, ready } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        i18n.changeLanguage(locale).then(() => {
            setIsLoading(false);
        });
    }, [locale, i18n]);

    if (!ready || isLoading) {
        return <Loader />;
    }

    return (
        <Layout>
            <main className={styles.article}>
                <h1>{t("articleAr.title")}</h1>
                <p>{t("articleAr.text")}</p>
            </main>
        </Layout>
    );
};
