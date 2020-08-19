import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import PageHeader from "../components/PageHeader";
import OverlaySetup from "../components/pages/roshTimer/OverlaySetup";

export default function Live(): ReactElement {
    
    return <PageFrame title={'Live Feed'}>
        <PageHeader 
            title={'Roshan Countdown'} 
            description={'Zeigt einen einfachen timer wann Aegis ausläuft, die Basis Zeit abläuft und bis Roshan wiedergeboren wird'} />

        <OverlaySetup />
    </PageFrame>
}