import { ReactElement } from "react";
import { Tabs, Typography } from "antd";
import Dashboard from "./Dashboard";
import BotCommands from "./BotCommands";
import CurrentCategory from "./Categories/CurrentCategory";
import CategoryList from "./Categories/CategoryList";

export default function BetTabs(): ReactElement {
    return <Tabs defaultActiveKey="dashboard" animated={false}>
        <Tabs.TabPane tab="Dashboard" key="dashboard">
            <Dashboard />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Kategorien" key="categories">
            <Typography.Paragraph>Kategorien ist gleichzusetzen mit einer “Season”. Wettrunden werden immer für eine aktuell ausgewählte Kategorie  gestartet. Du kannst hier alle Kategorien verwalten.</Typography.Paragraph>
            <CurrentCategory />
            <CategoryList />
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