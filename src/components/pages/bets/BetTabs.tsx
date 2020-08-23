import { ReactElement, useMemo } from "react";
import { Tabs } from "antd";
import DashboardTab from "./Dashboard/Tab";
import BotCommands from "./BotCommands";
import CategoryTab from "./Categories/Tab";
import BetRoundsTab from "./BetRounds/Tab";
import ToplistTab from "./Toplist/Tab";
import Overlay from "./Overlay/Overlay";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";
import { useCurrentUser } from "../../../hooks/currentUser";
import { useBetSeasons } from "../../../modules/selector/BetSeason";

const BetTabs = ({t}: WithTranslation): ReactElement => {
	const user = useCurrentUser();
    const seasons = useBetSeasons();
    const inactiveBets = useMemo(() => !user || !user.useBets || !seasons || seasons.length === 0, [user, seasons]);

    return <Tabs defaultActiveKey="dashboard" animated={false} destroyInactiveTabPane>
        <Tabs.TabPane tab={t('tab-dashboard')} key="dashboard">
            <DashboardTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-seasons')} key="categories" disabled={inactiveBets}>
            <CategoryTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-rounds')} key="rounds" disabled={inactiveBets}>
            <BetRoundsTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-toplist')} key="toplist" disabled={inactiveBets}>
            <ToplistTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-bot')} key="commands" disabled={inactiveBets}>
            <BotCommands />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tab-overlay')} key="overlay" disabled={inactiveBets}>
            <Overlay />
        </Tabs.TabPane>
    </Tabs>
}

export default i18nInstance.withTranslation('betSystem')(BetTabs);