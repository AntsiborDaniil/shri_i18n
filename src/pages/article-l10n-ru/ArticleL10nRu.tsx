import { type FC,useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Layout, Loader } from "@/components";

import styles from "./styles.module.css";

export const ArticleL10nRu: FC = () => {
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
                <h1>{t("articleL10nRu.title")}</h1>
                <p>
                    {t("articleL10nRu.text1", {
                        usersCount: "98 000 000",
                        percent: "78%",
                    })}
                </p>
                <p>
                    {t("articleL10nRu.text2", {
                        date: "1 сентября 2015 г.",
                    })}
                </p>
            </main>
        </Layout>
    );
};
