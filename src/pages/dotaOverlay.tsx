import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";

const Configuration = dynamic(
    () => import('../components/pages/dotaOverlay/Configuration'),
    { ssr: false }
);

export default function DotaOverlay(): ReactElement {

    return <PageFrame title={'Dota 2 Overlay'}>
        <Configuration />
    </PageFrame>
}