import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";
import PageHeader from "../components/PageHeader";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../i18n";
import { wrapper } from "../modules/Store";

const DotaWLTabs = dynamic(
    () => import('../components/pages/dotaOverlay/DotaWLTabs'),
    { ssr: false }
);

const DotaOverlay = ({t}: WithTranslation): ReactElement => {

    return <PageFrame title={'Dota 2 Overlay'}>
        <PageHeader 
            title={t('title')} 
            description={t('title-sub')}
            previewSr={'/images/preview/dotaWL.png'}
        />

        <DotaWLTabs />
    </PageFrame>
}

DotaOverlay.getInitialProps = async () => ({
    namespacesRequired: ['dotaWL', 'bot', 'nav'],
});

export default wrapper.withRedux(i18nInstance.withTranslation('dotaWL')(DotaOverlay));