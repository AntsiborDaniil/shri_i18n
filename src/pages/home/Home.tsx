import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import articleAr from "@/assets/article-ar.jpg";
import articleCss from "@/assets/article-css.jpg";
import articleEn from "@/assets/article-en.jpg";
import articleI18nKz from "@/assets/article-i18n-kz.jpg";
import articleL10nRu from "@/assets/article-l10n-ru.jpg";
import articleRtlIcons from "@/assets/article-rtl-icons.jpg";
import articleUiBy from "@/assets/article-ui-by.jpg";
import { Layout, Loader } from "@/components";
import type { Locale } from "@/types";

import styles from "./styles.module.css";

const ARTICLES = [
  {
    key: "rtl",
    imageUrl: articleRtlIcons,
    articleLink: "article/rtl-icons",
  },
  {
    key: "css",
    imageUrl: articleCss,
    articleLink: "article/css",
  },
];

const getRegionArticleByLocale = (locale: Locale) => {
  switch (locale) {
    case "ru":
    case "ru-RU":
      return {
        key: "ru",
        imageUrl: articleL10nRu,
        articleLink: "article/l10n-ru",
      };
    case "ru-BY":
      return {
        key: "by",
        imageUrl: articleUiBy,
        articleLink: "article/ui-by",
      };
    case "ru-KZ":
      return {
        key: "kz",
        imageUrl: articleI18nKz,
        articleLink: "article/i18n-kz",
      };
    case "ar":
      return {
        key: "ar",
        imageUrl: articleAr,
        articleLink: "article/ar",
      };
    case "en":
    default:
      return {
        key: "en",
        imageUrl: articleEn,
        articleLink: "article/en",
      };
  }
};

export const Home: FC = () => {
  const { locale = "en" } = useParams<{ locale: Locale }>();
  const { t, i18n, ready } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    i18n.changeLanguage(locale).finally(() => setIsLoading(false));
  }, [locale, i18n]);

    if (!ready || isLoading) {
        return <Loader />;
    }

  const regionArticle = getRegionArticleByLocale(locale);
  const isRTL = i18n.dir() === "rtl";

  // Функция для получения перевода статьи
  const getArticleTranslation = (articleKey: string, field: 'title' | 'description') => {
    const translation = t(`homePage.${articleKey}Article.${field}`);
    // Если перевод не найден, возвращаем ключ как есть (для отладки)
    return translation.startsWith('homePage.') ? articleKey : translation;
  };

  // Функция для отображения количества статей
  const renderArticlesCount = () => {
    const count = ARTICLES.length;
    if (locale.startsWith('ru')) {
      return `Всего ${count} ${count === 1 ? 'статья' : count < 5 ? 'статьи' : 'статей'}`;
    } else if (locale.startsWith('ar')) {
      return `إجمالي ${count} مقال`;
    }
    return `Total ${count} articles`;
  };

  return (
    <Layout>
      <main className={styles.content} dir={i18n.dir()}>
        <section
          className={styles.hero}
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          <h1 className={styles.heroTitle}>
            {t("homePage.hero.title")}
          </h1>

          <div
            className={styles.heroDetails}
            style={{ justifyContent: isRTL ? "flex-end" : "flex-start" }}
          >
            <span className={styles.heroDetailsItem}>
              {t("homePage.hero.conference", { year: 2025 })}
            </span>
          </div>

          <a className={styles.heroRegister}>
            {t("homePage.hero.register")}
          </a>
        </section>

        <section className={styles.regionArticle}>
          <h2
            className={styles.regionArticleTitle}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t("homePage.regionArticle.title")}
          </h2>

          <Link
            className={styles.articleCard}
            to={regionArticle.articleLink}
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <div
              className={styles.cardContent}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              <h3 className={styles.cardTitle}>
                {getArticleTranslation(regionArticle.key, 'title')}
              </h3>
              <p className={styles.cardDescription}>
                {getArticleTranslation(regionArticle.key, 'description')}
              </p>
              <span className={styles.cardRead}>
                {t("homePage.article.read")}
              </span>
            </div>
            <img className={styles.cardImage} src={regionArticle.imageUrl} />
          </Link>
        </section>

        <section className={styles.articles}>
          <h2
            className={styles.articlesTitle}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t("homePage.articles.title")}
          </h2>

          {ARTICLES.length > 0 && (
            <p
              className={styles.articlesDescription}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {renderArticlesCount()}
            </p>
          )}

          <div className={styles.articlesList}>
            {ARTICLES.map(({ key, imageUrl, articleLink }, index) => (
              <Link
                key={index}
                className={styles.articleCard}
                to={articleLink}
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <div
                  className={styles.cardContent}
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  <h3 className={styles.cardTitle}>
                    {getArticleTranslation(key, 'title')}
                  </h3>
                  <p className={styles.cardDescription}>
                    {getArticleTranslation(key, 'description')}
                  </p>
                  <span className={styles.cardRead}>
                    {t("homePage.article.read")}
                  </span>
                </div>
                <img className={styles.cardImage} src={imageUrl} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};