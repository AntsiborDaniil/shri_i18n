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
    // Get browser language from navigator
    const browserLang = navigator.language.split('-')[0];
    // Get cookie lang (simplified - in a real app you'd use a cookie library)
    const cookieLang = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${LANG_COOKIE_NAME}=`))
        ?.split('=')[1];
    
    // Resolve the user's locale
    const locale = resolveUserLocale({
        cookieLang,
        browserLang,
        query: search,
    });

    // Remove leading slash if present
    const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    
    // If the path already starts with a supported locale, don't redirect
    if (cleanPath.split('/')[0] === locale) {
        return <Navigate to={pathname + search} />;
    }

    // Redirect to the same path but with the resolved locale
    return <Navigate to={`/${locale}/${cleanPath}` + search} replace />;
};

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                {/* Handle root path by redirecting to localized version */}
                <Route path="/" element={<LocaleRedirect />} />
                
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
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;