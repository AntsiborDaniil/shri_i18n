// eslint-disable-next-line simple-import-sort/imports
import { type FC, useEffect } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

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
import { resolveUserLocale } from "./lib/resolve-user-locale";
import { LANG_COOKIE_NAME } from "./constants/lang-cookie-name";

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const LocaleRedirect: FC = () => {
    const { pathname, search } = useLocation();
    const browserLang = navigator.language.split("-")[0];
    const cookieLang = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LANG_COOKIE_NAME}=`))
        ?.split("=")[1];


    const locale = resolveUserLocale({
        cookieLang,
        browserLang,
        query: search,
    });

    const cleanPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

    if (cleanPath.split("/")[0] === locale) {
        return <Navigate to={pathname + search} />;
    }

    return <Navigate to={`/${locale}/${cleanPath}` + search} replace />;
};

function App() {
    return (
        <BrowserRouter>
            <DirectionProvider>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<LocaleRedirect />} />

                    <Route path="/:locale">
                        <Route index element={<Home />} />
                        <Route path="article">
                            <Route
                                path="rtl-icons"
                                element={<ArticleRtlIcons />}
                            />
                            <Route path="css" element={<ArticleCss />} />
                            <Route path="l10n-ru" element={<ArticleL10nRu />} />
                            <Route path="ui-by" element={<ArticleUiBy />} />
                            <Route path="i18n-kz" element={<ArticleI18nKz />} />
                            <Route path="en" element={<ArticleEn />} />
                            <Route path="ar" element={<ArticleAr />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </DirectionProvider>
        </BrowserRouter>
    );
}

export default App;
