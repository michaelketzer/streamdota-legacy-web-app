import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";

const Configuration = dynamic(
    () => import('../components/pages/dotaOverlay/Configuration'),
    { ssr: false }
);

const OverlaySetup = dynamic(
    () => import('../components/pages/dotaOverlay/OverlaySetup'),
    { ssr: false }
);

export default function DotaOverlay(): ReactElement {

    return <PageFrame title={'Dota 2 Overlay'}>
        <Configuration />
        <div style={{margin: '50px 0'}} />
        <OverlaySetup />
    </PageFrame>
}