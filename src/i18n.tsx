import NextI18Next, {Trans} from 'next-i18next';

const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

const i18nInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de', 'en'],
  fallbackLng: {
    'de': ['en']
  },
  localeSubpaths,
  localePath: path.resolve('./public/static/locales')
});

export default i18nInstance;

export type TransFN = (token: string) => string;