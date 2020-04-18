import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";
import { Tabs } from "antd";
import PageHeader from "../components/PageHeader";

const Configuration = dynamic(
    () => import('../components/pages/dotaOverlay/Configuration'),
    { ssr: false }
);

const OverlaySetup = dynamic(
    () => import('../components/pages/dotaOverlay/OverlaySetup'),
    { ssr: false }
);


const Stats = dynamic(
    () => import('../components/pages/dotaOverlay/Stats'),
    { ssr: false }
);

export default function DotaOverlay(): ReactElement {

    return <PageFrame title={'Dota 2 Overlay'}>

        <PageHeader title={'Dota Win/Loss'} 
                    description={'Mit “Dota Win/Loss” kannst du deine aktuellen Stats in Dota 2 auf deinem Livestream anzeigen'} />


        <Tabs defaultActiveKey="1" animated={false}>
            <Tabs.TabPane tab="Konfiguration" key="1">
                <Configuration />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Stats Setup" key="2">
                <Stats />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Overlay Setup" key="3">
                <OverlaySetup />
            </Tabs.TabPane>
        </Tabs>
    </PageFrame>
}