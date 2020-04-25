import { ReactElement } from "react";
import { Tabs } from "antd";
import Configuration from "./Configuration";
import SetupGsi from "./SetupGsi";
import Stats from "./Stats";
import OverlaySetup from "./OverlaySetup";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { User } from "../../../api/@types/User";
import { fetchCurrentUser } from "../../../api/user";


export default function DotaWLTabs(): ReactElement {
    const [user] = useAbortFetch<User>(fetchCurrentUser);
    
    return <Tabs defaultActiveKey="1" animated={false}>
        <Tabs.TabPane tab="Basis Konfiguration" key="1">
            <Configuration />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Dota GSI Konfiguration" key="2">
            <SetupGsi gsiAuth={user && user.gsiAuth} gsiConnected={user && user.gsiConnected} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Stats Einstellungen" key="3">
            <Stats />
        </Tabs.TabPane>

        {/*<Tabs.TabPane tab="Streamdota Bot Command" key="4">
            Bot Commands
        </Tabs.TabPane>*/}

        <Tabs.TabPane tab="Overlay Einstellungen" key="5">
            <OverlaySetup />
        </Tabs.TabPane>
    </Tabs>
}