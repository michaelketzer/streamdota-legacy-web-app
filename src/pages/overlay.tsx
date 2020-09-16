import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";
import PageHeader from "../components/PageHeader";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../i18n";

const CasterOverlay = dynamic(
    () => import('../components/pages/overlay/CasterOverlay'),
    { ssr: false }
);

const Overlay = ({t}: WithTranslation): ReactElement => {

    return <PageFrame title={'Dota 2 Casting Overlay'}>
        <PageHeader 
            title={'Casting Overlay'} 
            description={'Brand and customize your dota casting overlay here'}
        />
        <CasterOverlay />
    </PageFrame>;
}

Overlay.getInitialProps = async () => ({
    namespacesRequired: ['dotaWL', 'bot', 'nav'],
});

export default i18nInstance.withTranslation('dotaWL')(Overlay);