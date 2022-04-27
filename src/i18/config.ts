import i18n from 'i18next';
import pwEn from './en/pwEn.json'
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    pwEn
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['pwEn'],
  interpolation: {
    escapeValue: false, 
  },
  resources,
});