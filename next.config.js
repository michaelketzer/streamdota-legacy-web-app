require('dotenv').config();

module.exports = {
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL,
    FRAMER_BASE_URL: process.env.FRAMER_BASE_URL,
  },
};
