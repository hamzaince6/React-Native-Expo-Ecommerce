import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './translations/en';
import es from './translations/es';

interface I18nContextType {
  t: (key: string, options?: Record<string, any>) => string;
  locale: string;
  setLocale: (locale: string) => void;
}

const translations = {
  en,
  es,
};

const i18n = new I18n(translations);

const I18nContext = createContext<I18nContextType>({
  t: (key) => key,
  locale: 'en',
  setLocale: () => {},
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale.split('-')[0] || 'en');

  useEffect(() => {
    i18n.locale = locale;
    i18n.enableFallback = true;
  }, [locale]);

  const t = (key: string, options?: Record<string, any>) => {
    return i18n.t(key, options);
  };

  return (
    <I18nContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}; 