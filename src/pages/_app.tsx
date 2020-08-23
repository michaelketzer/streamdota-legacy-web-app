import * as Sentry from '@sentry/browser';
import { AppProps } from 'next/app';
import 'antd/dist/antd.min.css';
import 'react-typist/dist/Typist.css';
import i18n from '../i18n'
import { Integrations } from '@sentry/apm';
import { FC } from 'react';

if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
        	new Integrations.Tracing(),
        ],
        tracesSampleRate: 0.5,
    });
}

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default i18n.appWithTranslation(WrappedApp);
