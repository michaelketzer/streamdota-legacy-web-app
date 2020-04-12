import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";
import { Tabs } from "antd";

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

        <Tabs defaultActiveKey="1" animated={false}>
            <Tabs.TabPane tab="Konfiguration" key="1">
                <h1>StreamDota Bot</h1>
                <Basic />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Statische Commands" key="2">
                <h1>Statische Commands</h1>
                <Commands />
            </Tabs.TabPane>
        </Tabs>
    </PageFrame>
}