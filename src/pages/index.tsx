import Page from "../components/pages/index/new/Page";
import Head from "next/head";

const Index = () => {
    
    return <>
        <Head>
            <title>StreamDota</title>
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
        <Page />
    </>;
}

Index.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default Index;