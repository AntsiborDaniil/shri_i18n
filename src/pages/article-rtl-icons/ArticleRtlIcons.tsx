import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom"; // Добавляем импорт useParams

import { Layout } from "@/components";
import { 
  ClockIcon, GamepadIcon, MagnifierIcon, 
  MessageIcon, PaperNoteIcon, WindowIcon 
} from "@/icons";

import styles from "./styles.module.css";

export const ArticleRtlIcons: FC = () => {
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
        <h1 dangerouslySetInnerHTML={{ __html: t("articleRtlIcons.title") }} />

        <p>{t("articleRtlIcons.intro")}</p>

        <section className={styles.section}>
          <h2>{t("articleRtlIcons.whyImportant.title")}</h2>
          <p>{t("articleRtlIcons.whyImportant.text")}</p>
        </section>

        <section className={styles.section}>
          <h2>{t("articleRtlIcons.flipIcons.title")}</h2>
          <p>{t("articleRtlIcons.flipIcons.text")}</p>
          <div className={styles.icons} data-testid="rtl-icons">
            <PaperNoteIcon />
            <MessageIcon />
            <WindowIcon />
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t("articleRtlIcons.dontFlipIcons.title")}</h2>
          <p>{t("articleRtlIcons.dontFlipIcons.text")}</p>
          <div className={styles.icons} data-testid="not-rtl-icons">
            <GamepadIcon />
            <MagnifierIcon />
            <ClockIcon />
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t("articleRtlIcons.conclusion.title")}</h2>
          <p>{t("articleRtlIcons.conclusion.text1")}</p>
          <p dangerouslySetInnerHTML={{ __html: t("articleRtlIcons.conclusion.text2") }} />
        </section>
      </main>
    </Layout>
  );
};