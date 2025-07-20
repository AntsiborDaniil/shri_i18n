import { type FC,useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleCss: FC = () => {
    const { locale = "en" } = useParams<{ locale?: string }>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const changeLanguage = async () => {
            await i18n.changeLanguage(locale);
            setIsLoading(false);
        };

        changeLanguage();
    }, [locale, i18n]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Layout>
            <main className={styles.article} dir={i18n.dir()}>
                <h1>{t("articleCss.title")}</h1>
                <p>{t("articleCss.intro")}</p>
                <p dangerouslySetInnerHTML={{ __html: t("articleCss.diff") }} />

                <section className={styles.section}>
                    <h2>{t("articleCss.whyImportant.title")}</h2>
                    <p>{t("articleCss.whyImportant.text")}</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: t("articleCss.whyImportant.list"),
                        }}
                    />
                </section>

                <section className={styles.section}>
                    <h2>{t("articleCss.conclusion.title")}</h2>
                    <p>{t("articleCss.conclusion.text")}</p>
                </section>
            </main>
        </Layout>
    );
};
