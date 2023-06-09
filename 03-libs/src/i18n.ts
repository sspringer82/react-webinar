import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
    backend: { loadPath: '/locales/{{lng}}.json' },
  });

export default i18n;
