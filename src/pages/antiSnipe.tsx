import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import PageHeader from "../components/PageHeader";
import i18nInstance from "../i18n";
import { WithTranslation } from "next-i18next";
import OverlaySetup from "../components/pages/antiSnipe/OverlaySetup";

const AntiSnipe = ({t}: WithTranslation): ReactElement => {
    
    return <PageFrame title={'Anti-Snipe Overlay'}>
        <PageHeader 
            title={t('antiSnipe-title')} 
            description={t('antiSnipe-title-sub')} />

        <OverlaySetup />
    </PageFrame>
}

AntiSnipe.getInitialProps = async () => ({
    namespacesRequired: ['antiSnipe', 'nav'],
});

export default i18nInstance.withTranslation('antiSnipe')(AntiSnipe);