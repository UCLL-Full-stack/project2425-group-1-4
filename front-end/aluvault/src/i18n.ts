import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locale/en.json';
import uk from './locale/uk.json';

i18n.use(initReactI18next) // Integrate i18next with React
    .init({
        resources: {
            en: { translation: en }, // English translations
            uk: { translation: uk }, // Ukrainian translations
        },
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language if the translation is not found
        interpolation: {
            escapeValue: false, // React already does escaping
        },
        react: {
            useSuspense: false, // Disable Suspense for server-side rendering
        },
    });

export default i18n;
