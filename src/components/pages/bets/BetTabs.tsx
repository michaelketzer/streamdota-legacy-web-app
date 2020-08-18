import { ReactElement } from "react";
import { Tabs } from "antd";
import DashboardTab from "./Dashboard/Tab";
import BotCommands from "./BotCommands";
import CategoryTab from "./Categories/Tab";
import BetRoundsTab from "./BetRounds/Tab";
import ToplistTab from "./Toplist/Tab";
import Overlay from "./Overlay/Overlay";

export default function BetTabs(): ReactElement {
    return <Tabs defaultActiveKey="dashboard" animated={false} destroyInactiveTabPane>
        <Tabs.TabPane tab="Dashboard" key="dashboard">
            <DashboardTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Kategorien" key="categories">
            <CategoryTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Runden" key="rounds">
            <BetRoundsTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Toplist" key="toplist">
            <ToplistTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="StreamDota Bot Command" key="commands">
            <BotCommands />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Overlay Einstellungen" key="overlay">
            <Overlay />
        </Tabs.TabPane>
    </Tabs>
}