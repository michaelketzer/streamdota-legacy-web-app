import { ReactElement } from "react";
import { Tabs } from "antd";
import DashboardTab from "./Dashboard/Tab";
import BotCommands from "./BotCommands";
import CategoryTab from "./Categories/Tab";
import BetRoundsTab from "./BetRounds/Tab";
import ToplistTab from "./Toplist/Tab";
import Overlay from "./Overlay/Overlay";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";

const BetTabs = ({t}: WithTranslation): ReactElement => {
    return <Tabs defaultActiveKey="dashboard" animated={false} destroyInactiveTabPane>
        <Tabs.TabPane tab={t('tab-dashboard')} key="dashboard">
            <DashboardTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-seasons')} key="categories">
            <CategoryTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-rounds')} key="rounds">
            <BetRoundsTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-toplist')} key="toplist">
            <ToplistTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-bot')} key="commands">
            <BotCommands />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-overlay')} key="overlay">
            <Overlay />
        </Tabs.TabPane>
    </Tabs>
}

export default i18nInstance.withTranslation('betSystem')(BetTabs);