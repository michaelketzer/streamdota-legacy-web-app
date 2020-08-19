import Page from "../components/pages/index/new/Page";
import Head from "next/head";

const Index = () => {
    
    return <>
        <Head>
            <title>StreamDota</title>
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
        </Head>
        <Page />
    </>;
}

Index.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default Index;