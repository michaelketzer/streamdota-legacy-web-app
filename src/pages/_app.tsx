import * as Sentry from '@sentry/browser';
import 'antd/dist/antd.min.css';

if(process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0 ) {
    Sentry.init({dsn: process.env.SENTRY_DSN});
}

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp