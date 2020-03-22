import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";

const FetchingConfiguration = dynamic(
    () => import('../components/pages/dotaOverlay/FetchingConfiguration'),
    { ssr: false }
);


export default function DotaOverlay(): ReactElement {

    return <PageFrame title={'Dashboard'}>
        <FetchingConfiguration />
    </PageFrame>
}