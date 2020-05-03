import { ReactElement } from "react";
import { Tabs } from "antd";
import Dashboard from "./Dashboard";
import BotCommands from "./BotCommands";
import CategoryTab from "./Categories/Tab";
import BetRoundsTab from "./BetRounds/Tab";

export default function BetTabs(): ReactElement {
    return <Tabs defaultActiveKey="dashboard" animated={false} destroyInactiveTabPane>
        <Tabs.TabPane tab="Dashboard" key="dashboard">
            <Dashboard />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Kategorien" key="categories">
            <CategoryTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Runden" key="rounds">
            <BetRoundsTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Streamdota Bot Commands" key="commands">
            <BotCommands />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Overlay Einstellungen" key="overlay">
            Overlay Einstellungen
        </Tabs.TabPane>
    </Tabs>
}