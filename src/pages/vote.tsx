import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import PageHeader from "../components/PageHeader";
import dynamic from "next/dynamic";
import i18nInstance from "../i18n";
import { WithTranslation } from "next-i18next";

const BetTabs = dynamic(
    () => import('../components/pages/bets/BetTabs'),
    { ssr: false }
);

const Vote = ({t}: WithTranslation): ReactElement => {
    return <PageFrame title={t('bet-title')}>
        <PageHeader title={t('bet-title')} 
                    description={t('bet-title-sub')} />

        <BetTabs />
    </PageFrame>
}

Vote.getInitialProps = async () => ({
    namespacesRequired: ['betSystem', 'doatWL', 'bot', 'nav'],
});

export default i18nInstance.withTranslation('betSystem')(Vote);