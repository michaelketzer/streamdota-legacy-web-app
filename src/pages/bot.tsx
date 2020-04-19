import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";
import { Tabs } from "antd";
import PageHeader from "../components/PageHeader";
import Basic from '../components/pages/bot/basic';

const Commands = dynamic(
    () => import('../components/pages/bot/commands'),
    { ssr: false }
);

export default function Bot(): ReactElement {
    return <PageFrame title={'Bot'}>
        <PageHeader title={'StreamDota Bot'} 
                    description={'StreamDota Bot ist ein Chatbot welcher dir Unterhaltung, Informationen zum aktuellen Dota2 Spiel und Interaktionen mit dem Chat bietet.'} />

        <Tabs defaultActiveKey="info" animated={false}>
            <Tabs.TabPane tab="Info" key="info">
                <Basic />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Commands" key="commands">
                <Commands />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Timer" key="timer">
                Timer
            </Tabs.TabPane>
        </Tabs>
    </PageFrame>
}