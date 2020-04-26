import { ReactElement } from "react";
import { Tabs } from "antd";
import Dashboard from "./Dashboard";
import BotCommands from "./BotCommands";

export default function BetTabs(): ReactElement {
    return <Tabs defaultActiveKey="dashboard" animated={false}>
        <Tabs.TabPane tab="Dashboard" key="dashboard">
            <Dashboard />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Kategorien" key="categories">
            Kategorien
        </Tabs.TabPane>
        <Tabs.TabPane tab="Runden" key="rounds">
            Runden
        </Tabs.TabPane>
        <Tabs.TabPane tab="Streamdota Bot Commands" key="commands">
            <BotCommands />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Overlay Einstellungen" key="overlay">
            Overlay Einstellungen
        </Tabs.TabPane>
    </Tabs>
}