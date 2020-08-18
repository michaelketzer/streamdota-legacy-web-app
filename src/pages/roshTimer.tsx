import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import PageHeader from "../components/PageHeader";
import OverlaySetup from "../components/pages/roshTimer/OverlaySetup";

export default function Live(): ReactElement {
    
    return <PageFrame title={'Live Feed'}>
        <PageHeader 
            title={'Roshan Timer'} 
            description={'Displays a simple timer listing when the aegis expires, the base roshan time is over and the variable time is over'} />

        <OverlaySetup />
    </PageFrame>
}