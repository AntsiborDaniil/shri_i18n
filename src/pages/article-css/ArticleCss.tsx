import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Layout, Loader } from "@/components";

import styles from "./styles.module.css";

export const ArticleCss: FC = () => {
    const { locale = "en" } = useParams<{ locale?: string }>();
    const { t, i18n, ready } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Меняем язык только если он отличается от текущего
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [locale, i18n]);

    // Показываем Loader если переводы не готовы или идет смена языка
    if (!ready || isLoading) {
        return <Loader />;
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