import * as Sentry from '@sentry/browser';
import { Store } from 'redux';
import App, { AppInitialProps } from 'next/app';
import 'antd/dist/antd.min.css';
import 'react-typist/dist/Typist.css';
import { State, wrapper } from '../modules/Store';
import i18n from '../i18n'
import { Integrations } from '@sentry/apm';

if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
        	new Integrations.Tracing(),
        ],
        tracesSampleRate: 0.5,
    });
}

class MyApp extends App<AppInitialProps & { store: Store<State> }> {
	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}

export default wrapper.withRedux(i18n.appWithTranslation(MyApp));
