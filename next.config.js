require('dotenv').config();
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports = {
  target: 'serverless',
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    API_URL: process.env.API_URL,
    FRAMER_BASE_URL: process.env.FRAMER_BASE_URL,
  },
};
