import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import dynamic from "next/dynamic";
import { Tabs } from "antd";
import PageHeader from "../components/PageHeader";
import Basic from '../components/pages/bot/basic';
import i18nInstance from "../i18n";
import { WithTranslation } from "next-i18next";

const Commands = dynamic(
    () => import('../components/pages/bot/commands'),
    { ssr: false }
);

const Timers = dynamic(
    () => import('../components/pages/bot/timer'),
    { ssr: false }
);

const Bot = ({t}: WithTranslation): ReactElement => {
    return <PageFrame title={'Bot'}>
        <PageHeader title={t('title')} 
                    description={t('title-sub')} />

        <Tabs defaultActiveKey="info" animated={false}>
            <Tabs.TabPane tab={t('tab-info')} key="info">
                <Basic />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('tab-commands')} key="commands">
                <Commands />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('tab-timer')} key="timer">
                <Timers />
            </Tabs.TabPane>
        </Tabs>
    </PageFrame>
}

Bot.getInitialProps = async () => ({
    namespacesRequired: ['bot', 'nav'],
});

export default i18nInstance.withTranslation('bot')(Bot);