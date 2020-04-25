import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";
import PageHeader from "../components/PageHeader";

const DotaWLTabs = dynamic(
    () => import('../components/pages/dotaOverlay/DotaWLTabs'),
    { ssr: false }
);

export default function DotaOverlay(): ReactElement {

    return <PageFrame title={'Dota 2 Overlay'}>
        <PageHeader 
            title={'Dota Win/Loss'} 
            description={'Mit “Dota Win/Loss” kannst du deine aktuellen Stats in Dota 2 auf deinem Livestream anzeigen'}
            previewSr={'/images/preview/dotaWL.png'}
        />

        <DotaWLTabs />
    </PageFrame>
}