import { type FC, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { LANG_COOKIE_NAME } from "./constants/lang-cookie-name";
import { resolveUserLocale } from "./lib/resolve-user-locale";
import {
  ArticleAr,
  ArticleCss,
  ArticleEn,
  ArticleI18nKz,
  ArticleL10nRu,
  ArticleRtlIcons,
  ArticleUiBy,
  Home,
} from "./pages";
import { DirectionProvider } from "./providers/DirectionProvider";

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const LocaleRedirect: FC = () => {
  const { pathname, search } = useLocation();
  
  // Получаем язык из куки
  const cookieLang = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LANG_COOKIE_NAME}=`))
    ?.split("=")[1];

  // Определяем локаль пользователя
  const locale = resolveUserLocale({
    urlLocale: pathname.split("/")[1],
    cookieLang,
    browserLang: navigator.language.split("-")[0],
    query: search,
  });

  // Если путь уже начинается с правильной локали - не делаем редирект
  if (pathname.startsWith(`/${locale}`)) {
    return null;
  }

  // Формируем новый путь с локалью
  const newPath = pathname === "/" 
    ? `/${locale}`
    : `/${locale}${pathname}`;

  return <Navigate to={`${newPath}${search}`} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <DirectionProvider>
        <ScrollToTop />
        <Routes>
          {/* Основные маршруты с локалью */}
          <Route path="/:locale">
            <Route index element={<Home />} />
            <Route path="article">
              <Route path="rtl-icons" element={<ArticleRtlIcons />} />
              <Route path="css" element={<ArticleCss />} />
              <Route path="l10n-ru" element={<ArticleL10nRu />} />
              <Route path="ui-by" element={<ArticleUiBy />} />
              <Route path="i18n-kz" element={<ArticleI18nKz />} />
              <Route path="en" element={<ArticleEn />} />
              <Route path="ar" element={<ArticleAr />} />
            </Route>
            
            {/* Редирект для несуществующих путей */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          
          {/* Редирект для всех остальных случаев */}
          <Route path="*" element={<LocaleRedirect />} />
        </Routes>
      </DirectionProvider>
    </BrowserRouter>
  );
}

export default App;