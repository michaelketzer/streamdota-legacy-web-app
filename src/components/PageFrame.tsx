import { ReactElement } from "react";
import Head from "next/head";
import Navigation from "./Navigation";
import dynamic from 'next/dynamic'

const TopBar = dynamic(
    () => import('./TopBar'),
    { ssr: false }
);

export default function PageFrame({children, title}): ReactElement {
    return <>
        <Head>
            <title>Griefco.de {title && ` - ${title}`}</title>
            <meta charSet="UTF-8" />
            <meta name="google" content="notranslate" />
            <meta httpEquiv="Content-Language" content="de" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        </Head>

        <div className={'layout'}>
            <div className={'headerBar'}>
                <TopBar />
            </div>
            <div className={'contentWrapper'}>
                <div className={'drawer'}>
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
                min-height: 100%;
                padding: 15px;
            }

            @media only screen and (max-width: 425px) {
            }
        `}</style>

        <style jsx global>{`
            html, * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            }
        `}</style>
    </>;
}