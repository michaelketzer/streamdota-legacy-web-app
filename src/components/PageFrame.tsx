import { ReactElement } from "react";
import Head from "next/head";
import Navigation from "./Navigation";
import dynamic from 'next/dynamic'

const UserInfo = dynamic(
    () => import('./UserInfo'),
    { ssr: false }
);

export default function PageFrame({children, title}): ReactElement {
    return <>
        <Head>
            <title>StreamDota {title && ` - ${title}`}</title>
            <meta charSet="UTF-8" />
            <meta name="google" content="notranslate" />
            <meta httpEquiv="Content-Language" content="de" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

            <meta property="og:site_name" content="StreamDota - Your toolbox for streaming dota"/>
            <meta property="og:title" content={'Dota bot, overlays, stats & more'}/>
            <meta property="og:description" content={'Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more...'}/>
            <meta property="og:image" content={'/shared/share.png'}/>
            <meta property="og:url" content="https://streamdota.com/"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="description" content="Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more..."/>

            <link rel="apple-touch-icon" sizes="180x180" href="/shared/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/shared/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/shared/favicon-16x16.png" />
            <link rel="manifest" href="/shared/site.webmanifest" />
            <link rel="mask-icon" href="/shared/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/shared/favicon.ico" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-config" content="/shared/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
        </Head>

        <div className={'layout'}>
            <div className={'contentWrapper'}>
                <div className={'drawer'}>
                    <UserInfo />
                    <Navigation />
                </div>
                <div className={'main'}>
                    <div className={'pageContent'}>
                        {children}
                    </div>
                </div>
            </div>
        </div>


        <style jsx>{`
            .layout {
                display: flex;
                flex-direction: column;
                align-items: stretch;
                height: 100vh;
            }

            .headerBar {
                height: 60px;
                flex-shrink: 0;
                background-color: #2B333B;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.3);
            }

            .contentWrapper {
                flex: 1;
                display: flex;
                align-items: stretch;
            }

            .drawer {
                width: 240px;
                flex-shrink: 0;
                border-right: 1px solid #D4D4D5;
            }

            .main {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                background-color: #E5E5E5;
                padding: 40px;
                overflow-y: scroll;
                max-height: 100%;
            }
            
            .pageContent {
                background-color: #FFF;
                padding: 40px;
            }
        `}</style>

        <style jsx global>{`
            html, * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            }

            body {
                color: #3B4044;
            }

            .ant-tabs-tabpane {
                outline: none;
            }
        `}</style>
    </>;
}