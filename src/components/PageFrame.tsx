import { ReactElement } from "react";
import Head from "next/head";

export default function PageFrame({children, title}): ReactElement {
    return <>
        <Head>
            <title>Griefco.de {title && ` - ${title}`}</title>
            <meta charSet="UTF-8" />
            <meta name="google" content="notranslate" />
            <meta httpEquiv="Content-Language" content="de" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        </Head>

        <div className={'page'}>
            <div className={'pageWrapper'}>
                <div>
                    {children}
                </div>
            </div>
        </div>


        <style jsx>{`
            .page {
                min-height: calc(100vh - 268px);
                display: flex;
                flex-direction: column;
                align-items: stretch;
            }

            .pageWrapper {
                max-width: 1175px;
                margin: 0 auto;
                padding: 20px 40px 40px 40px;
                flex-grow: 1;
                width: 100%;
            }

            @media only screen and (max-width: 425px) { 
                .pageWrapper {
                    padding: 20px 15px 40px 15px;
                } 
            }
        `}</style>
    </>;
}