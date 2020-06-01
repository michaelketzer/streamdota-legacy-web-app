import * as Sentry from '@sentry/browser';
import { Store } from 'redux';
import App, { AppInitialProps } from 'next/app';
import 'antd/dist/antd.min.css';
import { State, wrapper } from '../modules/Store';

if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0) {
	Sentry.init({ dsn: process.env.SENTRY_DSN });
}

class MyApp extends App<AppInitialProps & { store: Store<State> }> {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}

export default wrapper.withRedux(MyApp);
