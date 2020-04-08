import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";

const Basic = dynamic(
    () => import('../components/pages/bot/basic'),
    { ssr: false }
);
const Commands = dynamic(
    () => import('../components/pages/bot/commands'),
    { ssr: false }
);

export default function Bot(): ReactElement {
    return <PageFrame title={'Bot'}>
        <h1>Channel Bot</h1>
        <Basic />

        <br />
        <br />
        <br />

        <h1>Statische Commands</h1>
        <Commands />
    </PageFrame>
}