import { type FC, type ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getTextDirection } from '../constants/lang-direction';

export const DirectionProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { locale = 'en' } = useParams<{ locale?: string }>();
    const direction = getTextDirection(locale);

    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = locale.split('-')[0];
        document.documentElement.style.setProperty('--direction', direction);
    }, [direction, locale]);

    return <div dir={direction}>{children}</div>;
};