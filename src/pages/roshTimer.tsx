import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import PageHeader from "../components/PageHeader";
import OverlaySetup from "../components/pages/roshTimer/OverlaySetup";
import i18nInstance from "../i18n";
import { WithTranslation } from "next-i18next";

const RoshanTimer = ({t}: WithTranslation): ReactElement => {
    
    return <PageFrame title={'Roshan Timer'}>
        <PageHeader 
            title={t('roshanTimer-title')} 
            description={t('roshanTimer-title-sub')} />

        <OverlaySetup />
    </PageFrame>
}

RoshanTimer.getInitialProps = async () => ({
    namespacesRequired: ['roshTimer', 'dotaWL', 'nav'],
});

export default i18nInstance.withTranslation('roshTimer')(RoshanTimer);