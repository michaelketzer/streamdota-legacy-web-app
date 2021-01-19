import * as SentryBrowser from '@sentry/browser';
import { AppProps } from 'next/app';
import 'antd/dist/antd.min.css';
import 'react-typist/dist/Typist.css';
import { wrapper } from '../modules/Store';
import i18n from '../i18n'
import { FC } from 'react';

if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0 && process.browser) {
    SentryBrowser.init({dsn: process.env.SENTRY_DSN});
}

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(i18n.appWithTranslation(WrappedApp));
